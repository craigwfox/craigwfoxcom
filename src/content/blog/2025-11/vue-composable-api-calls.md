---
tags:
  - post
categories:
  - js
  - vue
postSlug: vue-composable-api-calls
pubDate: 2025-11-12
added: Nov 12 2025
title: Vue api calls in composables
description: Some tips on how to call an api from multiple components only once.
image: images/twitter/
ogImage: images/twitter/
ogImageAlt: ""
---
A few years ago my company had a vendor develop a web application for us. after handing the Vue codebase over to us, I noticed that frequently the same api call would be made multiple times per page. The root cause of the issue was the way that api calls were being made in the  composable. Compostables do share state, but things like functions are called each time the composable is loaded. This means that if you place a fetch request in it without any kind of check for it being in progress you end up with multiple matching requests happening.

To address this issue we can make some relatively minor changes to add a promise and store that promise in the composable state.

*Note:* I'm going to assume you already know what a composable is and the basics of them. If you want  more in depth info on compostables the [Vue docs](https://vuejs.org/guide/reusability/composables.html#composables) explain it all quite well.
## The composable code we started with

This is an example of the the kind of composable I started with.

```js
import { ref } from "vue";

const data = ref(null);
const error = ref(null);

export async function fetchData() {
	fetch("https://api.restful-api.dev/objects")
		.then((res) => res.json())
		.then((json) => {
			data.value = json;
			resolve(data.value);
		})
		.catch((err) => {
			error.value = err;
			reject(error.value);
		});
}

```

While this does work the way it's setup means that the data/error are held in the composable state, but the api call will be triggered each time the composable is referenced in different components. 

For some api calls this would probably not be an issue, but in the case of the application the data behind the api calls only updates ever few days.  This means that realistically that call should only be made once per session, but for this article I'm going to avoid getting into how to store that data.

## The solution
The solution was to add a promise that can be returned to show that it's in progress.
### 1. Add the request ref

First let's add the `request` ref so we can store the state of the promise. 

```js
const request = ref(null) // new ref for a promise request
const data = ref(null)
const error = ref(null)
```

*Note:* This should work `let request = null`, but I've ran into some odd issues so sticking with using vue state has been more consistent.
### 2.  Return the new promise

Now we need to modify the `fetchData` function to do a few things:
1. Create a new promise and set `request` ref's value to be that new promise.
2. Return the `request` ref at instead of directly returning the results.
3. We also need to reset the `request` to null after the fetch has completely it's success and failure states.

```js
export async function fetchData() {

  request.value = new Promise((resolve, reject) => {
    fetch('https://api.restful-api.dev/objects')
      .then((res) => res.json())
      .then((json) => {
        data.value = json
        resolve(data.value)
      })
      .catch((err) => {
        error.value = err
        reject(error.value)
      }).finally(() => {
	      request.value = null
      })
  })

  return request.value
}
```

### 3. Check is the request is in progress

Now that we have the promise being returned, we need to check if the request is in progress or not.

```js
...
export async function fetchData() {
  if (request.value) return request.value
...
```

### 4. The end result

This is what we are left with at the end. It ends up being very similar to the original code, so you can end up with a big performance increase and reduction in api calls to your servers for very little effort.

```js
import { ref } from 'vue'

const request = ref(null)
const data = ref(null)
const error = ref(null)
  
export async function fetchData() {
  if (request.value) return request.value

  request.value = new Promise((resolve, reject) => {
    fetch('https://api.restful-api.dev/objects')
      .then((res) => res.json())
      .then((json) => {
        data.value = json
        resolve(data.value)
      })
      .catch((err) => {
        error.value = err
        reject(error.value)
      })
  })

  return request.value
}
```

## Note about composable state

Keep in mind that the state of the composable isn't refresh proof. That means if you refresh these api calls will be made again. For some data that's probably preferred, but 90% of the data that I am using this for in my work doesn't change during a session. For those cases I would suggest either storing the data in local/session storage. A common method for that would be [Pinia](https://pinia.vuejs.org/) and  [pinia-plugin-persistedstate](https://www.npmjs.com/package/pinia-plugin-persistedstate).