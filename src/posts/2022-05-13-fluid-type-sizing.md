---
tags: post
permalink: "/posts/fluid-type-and-sizing/"
date: 2022-05-13
title: "Fluid type and sizing in CSS"
categories: []
description: A guide to using clamp(), min(), and max() to create fluid type and sizing in CSS.
image: ""
ogImage: ""
ogImageAlt: "A guide to using clamp(), min(), and max() to create fluid type and sizing in CSS."
---

# Fluid type and sizing using clamp(), min(), max()

Fluid type and sizing started gaining traction in the front end community over the last couple of years. It has allowed us to simplify a lot of our responsive code and in many cases remove media queries all together. In this article I will be talking about how clamp(), min(), and max() work and some of the more popular ways that they are used.

<div class="series-block">

## 2022 new CSS hotness series

This is article is a part of a series I'm going to be doing talking about some of the cool new things that have come to CSS in the last couple of years.

1. [Fluid type and sizing using clamp(), min(), max()](/posts/fluid-type-and-sizing/) _(You are here)_
2. where(), is(), has()
3. :focus-visible
4. aspect-ratio
5. Container Queries

</div>

## min() and max()

The min() and max() functions take multiple comma-separated values (most of the time I find myself only using two). These values can be any combination of numbers/unit types. Most commonly you will run into people using a mix of viewport units, percentages, and rems.

### min()

The min() function compares all of the values passed through it and then determines which is the smallest. For example if you have the div below:

```css
div {
  width: min(80%, 1000px);
}
```

On mobile the 80% will be the smallest unit. As you expand the browser and the div eventually reaches 1000px wide the div will then stop expanding because 1000px becomes the new smallest unit.

You can also do math inside of min() without the need of calc() (also in max() and clamp()).

```css
div {
  width: min(80% - 2rem, 1000px);
}
```

You might be asking, "Why would I do this instead of just using a width and max-width?" Well there are a few upsides of this method, since it's one line we can use a custom property which makes it easier to share the values between elements, but also you can override the custom property in a media query.

```css
div {
  --min-value: 50rem, 80%;

  width: min(var(--min-value));
}

@media (min-width: 768px) {
  --min-value: 70rem, 80%;
}
```

I think the bigger advantage though is that the min() function (and max()) can take more than two values. For example you can add in a value for ch units so that it will scale between the static and fluid values, but also never go over a certain number of characters. This can be nice in making sure that it will scale nicely, but also preserve a better reading experience.

```css
div {
  width: min(80% - 2rem, 120ch, 1000px);
}
```

### max()

max() has all the same abilities as min(), but it checks for which unit is the largest instead of the smallest. For example if you have `max(800px, 80%)` as the width of a div and view that on a mobile device the div will expand off over the page (unless the div also has a max-wdith of 100% to prevent that).

```css
div {
  width: max(800px, 80%);
}
```

## clamp()

The clamp() function, unlike min() and max(), requires three values. You set a minimum, preferred, and maximum value. In most cases how this will be used is by setting a static value for the minimum and maximum values and then a fluid unit for the preferred value. The smallest screen size will use the minimum value and then scale up to the maximum value based off of the preferred value. This means that you can use a smaller preferred value to make it scale to the max slower or a higher value to scale to the max sooner.

```css
h1 {
  font-size: clamp(1rem, 2vw + 0.6rem, 3rem);
}
```

In the example above I have added `+ 0.6rem` to help it to scale a more linearly and to also help prevent zooming issues. There is a bunch of math to figure out what this number would be for scale but I use this [handy calculator](https://royalfig.github.io/fluid-typography-calculator/).

## Uses

### Fluid type

One of the most popular uses for clamp, min, and max is to create fluid typography using these functions instead of having to write multiple media queries to cover each viewport size. The clamp example above is a very common fluid type example.

Here is an example of all three being used for fluid type and how they differ.

<iframe height="480" style="width: 100%;" scrolling="no" title="Min, max, and clamp example on Codepen" src="https://codepen.io/craigwfox/embed/VwQjVyJ?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/craigwfox/pen/VwQjVyJ">
  min and max example</a> by Craig Fox (<a href="https://codepen.io/craigwfox">@craigwfox</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### Margin and padding

Margin and padding is something else I find myself using clamp for quite often. Similar to fluid type you can had fluid padding which help reduce media queries.

```css
.container {
  padding: 2rem clamp(1.5rem, 1rem + 2vw, 2.5rem);
}
```

## Final bits

These CSS functions along with grid and flexbox have allowed me to reduce or eliminate all together many media queries on the sites I build.

You might also checkout my article about [Responsive / fluid width videos](https://craigwfox.com/posts/responsive-video-embeds/).
