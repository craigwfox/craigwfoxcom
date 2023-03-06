---
tags: post
permalink: "/posts/2022-03/theme-toggle-web-component/"
pubDate: 2022-03-10
title: "A web component to toggle themes"
categories: []
description: A simple web component to toggle the site themes and modes.
image: "img/rss/2022-03-web-component-toggle.webp"
ogImage: "img/twitter/2022-03-web-component-toggle.webp"
ogImageAlt: "A web component to toggle site themes / modes"
---

# A web component to toggle themes

I've been doing some learning about web components and as practice decided to make a simple one that could be used to toggle themes or other accessibility features.

## Setting up the custom HTML element

### The base element

The base of a custom element can be as simple as just a tag. For example this one will be a custom HTML element with a few attributes and an image inside.

To get this going we will make a custom element called `theme-switcher`. The name for custom elements should be two words hyphenated and should try to describe what that element is doing.

```html
<theme-switcher></theme-switcher>
```

### The attributes

We will use a few attributes on our custom element to pass along what options we want in our web component. The first three of these attributes will be controlling most of the heavy lifting.

#### Modes

Modes is a comma delineated list of the different themes that we will be swapping in this example.

#### Current

The current attribute acts as both the default attribute for the component and will change when the custom element is clicked.

#### dataAttr

The dataAttr is what data attribute we want to be added to the body tag of the page. This is how we will use CSS to change the theme.

These three attribute combined will change the body attribute and change the aria-label.

Here is our progress so far.

```html
<theme-switcher
  modes="light, dark"
  dataAttr="data-theme"
  current="dark"
></theme-switcher>
```

### Accessibility

Before we move onto the JS we need a couple of accessibility attribute.

#### aria-label

First we have out initial aria-label that describes what this element is going to change when clicked. This will also update when the button is clicked to show what has changed.

#### aria-live=polite

This won't change when the element is clicked, but it will tell the screen reader to announce the changes to the aria-label.

### The full custom element code

This is the full button in action. I've also added an svg image, but this could also be an image of your choice, text, or maybe you could make the whole button a custom shape with CSS.

```html
<theme-switcher
  modes="light, dark"
  dataAttr="data-theme"
  current="dark"
  aria-label="Change to light mode"
  aria-live="polite"
>
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ffffff"
    stroke-width="2"
    stroke-linecap="square"
    stroke-linejoin="round"
  >
    <circle cx="12" cy="12" r="5" />
    <path
      d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
    />
  </svg>
</theme-switcher>
```

<p class="post-note">Be aware that adding text with while using an aria-label on the base component will probably result in assistive technology either ignoring the inner text or reading both the aria-label and the inner text.</p>

## The JS

### The base JS for defining the custom element

To get started we will need to define the web component. To do that we will use a class constructor that will be named the same as the custom element, but instead of hyphenation it will be camel case. Inside of the of the class we will add a constructor function and inside of the super.

```js
class ThemeSwitcher {
  constructor() {
    super()
  }
}
```

Next will define the element. The first argument will be the custom elements name matching the HTML. The second argument will be the name of the class we added above.

```js
class ThemeSwitcher {
  constructor() {
    super()
  }
}

customElements.define("theme-switcher", ThemeSwitcher)
```

Additionally in this example I want to extend the HTMLButtonElement. This means that the custom element will inherit the same styles and functionality of a normal HTML button. This prevents us from having to do additional CSS and JS to make things like focusing work properly.

```js
class ThemeSwitcher extends HTMLButtonElement {
  constructor() {
    super()
  }
}
customElements.define("theme-switcher", ThemeSwitcher, { extends: "button" })
```

<p class="post-note">This isn't supported in Safari on iOS or MacOS so you will either need to fallback, install a polyfill, or not extend the element.</p>

### Getting the data from the attributes

The first part of getting the data from the attributes is to decide which of these attributes are static and which are dynamic.

#### Dynamic attributes

To get the dynamic attribute we will need to to use the `observedAttributes` function.

```js
static get observedAttributes() {
  return ["current"];
}
```

Now that you are observing those attributes you can get and set that value by adding `get current ()` and `set current()`. Now then you access and update the current attribute in the web component JS it will update the attribute on the custom element.

```js
class ThemeSwitcher extends HTMLButtonElement {
  constructor() {
    ...
  }

  static get observedAttributes() {
    return ["current"];
  }

  get current() {
    return this.getAttribute("current");
  }

  set current(val) {
    return this.setAttribute("current", val);
  }
}

customElements.define(...);
```

Now we can grab those static attributes (dataAttr and modes). Will look a bit more like traditional JS. In this case `this` will be referring to the custom element. These will be available to the entire class not just things inside the constructor.

The dataAttr is pretty straight forward we are just grabbing a string of what is inside it. For the modes we will grab the two modes and then split them and trim up and extra spacing.

```js
class ThemeSwitcher extends HTMLButtonElement {
  constructor() {
    super();

    // Getting the static attributes (dataAttr and modes)
    this.dataAttr = this.getAttribute("dataAttr");

    this.mode1 = this.getAttribute("modes")
      .split(",")
      .map((index) => index.trim())[0];

    this.mode2 = this.getAttribute("modes")
      .split(",")
      .map((index) => index.trim())[1];
  }
  ...
}
```

The end result of getting all the attributes should end up looking something like this.

```js
class ThemeSwitcher extends HTMLButtonElement {
  constructor() {
    super()

    // Getting the static attributes (dataAttr and modes)
    this.dataAttr = this.getAttribute("dataAttr")

    this.mode1 = this.getAttribute("modes")
      .split(",")
      .map(index => index.trim())[0]

    this.mode2 = this.getAttribute("modes")
      .split(",")
      .map(index => index.trim())[1]
  }

  static get observedAttributes() {
    return ["current"]
  }

  get current() {
    return this.getAttribute("current")
  }

  set current(val) {
    return this.setAttribute("current", val)
  }
}
customElements.define("theme-switcher", ThemeSwitcher, { extends: "button" })
```

### a11y updates

Here we will setup a function to swap the aria-label on the `<theme-switcher>` element. This will be used later when we setup the swap function.

```js
class ThemeSwitcher extends HTMLButtonElement {
  constructor() {
  ...
  }
  ariaLabel(state) {
    this.setAttribute("aria-label", `${state} mode`);
  }
}
```

### Body attribute swap

We need to get the body element of the page using `document.querySelector`.

Then we will also check to see if a matching data attribute has already been added to the theme and if so sets the current to match that.

```js
class ThemeSwitcher extends HTMLButtonElement {
  constructor() {
    ...
    // Dom elements
    this.body = document.querySelector("body");

    // checks if a default has been set on the body
    if (this.body.getAttribute(this.dataAttr)) {
      this.current = this.body.getAttribute(this.dataAttr);
    }
    ...
  }
  ...
}
```

### Setting up the swapping functions and event listener

Ok, now it's time to add the the function to change attributes and listen for clicks.

First up is adding swap function. Here is where we:

- Change toggle current attribute
- Call the ariaLabel function to change the aria-label attribute
- Add / update the body element's data attribute

```js
class ThemeSwitcher extends HTMLButtonElement {
  constructor() {
    ...
  }
  ...
  swap() {
    if (this.current === this.mode1) {
      this.current = this.mode2;
      this.ariaLabel(this.mode1);
      this.body.setAttribute(this.dataAttr, `${this.mode2}`);
    } else {
      this.current = this.mode1;
      this.ariaLabel(this.mode2);
      this.body.setAttribute(this.dataAttr, `${this.mode1}`);
    }
  }
  ...
}
```

Now that we have the swap function we need to bind it and the ariaLabel function we made in a previous step so that they are accessible to the reset of the web component.

```js
class ThemeSwitcher extends HTMLButtonElement {
  constructor() {
    super();

    // Bindings
    this.swap = this.swap.bind(this);
    this.ariaLabel = this.ariaLabel.bind(this);
  }
  ...
}
```

And finally now that we have the bindings set we can add the event listener to trigger the swap function.

```js
class ThemeSwitcher extends HTMLButtonElement {
  constructor() {
    ...
    this.addEventListener("click", this.swap);
  }
  ...
}
```

### Final JS for the theme switcher

After all that we will end with this JS below.

```js
class ThemeSwitcher extends HTMLButtonElement {
  constructor() {
    super()

    // Bindings
    this.swap = this.swap.bind(this)
    this.ariaLabel = this.ariaLabel.bind(this)

    // Get static attributes
    this.dataAttr = this.getAttribute("dataAttr")
    this.mode1 = this.getAttribute("modes")
      .split(",")
      .map(index => index.trim())[0]
    this.mode2 = this.getAttribute("modes")
      .split(",")
      .map(index => index.trim())[1]

    // Grab dom elements
    this.body = document.querySelector("body")

    // Check for a default theme setting on the body
    if (this.body.getAttribute(this.dataAttr)) {
      this.current = this.body.getAttribute(this.dataAttr)
    }

    // sets the click listener to fire the swap function
    this.addEventListener("click", this.swap)
  }

  // Swaps the attribute
  ariaLabel(state) {
    this.setAttribute("aria-label", `${state} mode`)
  }

  // Fires all the attribute swapping
  swap() {
    if (this.current === this.mode1) {
      this.current = this.mode2
      this.ariaLabel(this.mode1)
      this.body.setAttribute(this.dataAttr, `${this.mode2}`)
    } else {
      this.current = this.mode1
      this.ariaLabel(this.mode2)
      this.body.setAttribute(this.dataAttr, `${this.mode1}`)
    }
  }

  // Observe current
  static get observedAttributes() {
    return ["current"]
  }

  // Get current
  get current() {
    return this.getAttribute("current")
  }

  // Set current
  set current(val) {
    return this.setAttribute("current", val)
  }
}
customElements.define("theme-switcher", ThemeSwitcher, { extends: "button" })
```

## Live demo

Here is a live working demo on CodePen.

<iframe height="300" style="width: 100%;" scrolling="no" title="Theme switcher web component" src="https://codepen.io/craigwfox/embed/abVPWjj?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/craigwfox/pen/abVPWjj">
  Theme switcher web component</a> by Craig Fox (<a href="https://codepen.io/craigwfox">@craigwfox</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## Taking it further

With some more time we could probably take this web component a bit further. It should probably write something to local storage to carry user selections between pages and sessions. You could also change it to support more than a two modes.

## Support

Overall [support is fairly good](https://caniuse.com/custom-elementsv1). The big issue is that customizing built-in elements isn't supported in iOS / MacOS Safari, which means the example in this post won't actually work in Safari. The work around for the time being would be to add the additional CSS and JS to make the element work like a button yourself instead of extending the `HTMLButtonElement`.

## Use it on your own site

Feel free to reuse the code in this port or find it on [github](https://github.com/craigwfox/simple-theme-switcher) and [npm](https://www.npmjs.com/package/simple-theme-switcher).
