---
tags: post
permalink: "/posts/2023-01/css-auto-grid-columns/"
pubDate: 2023-01-18
title: "Using CSS Grid auto-fit/auto-fill to create dynamic columns"
description: A way to use CSS grid to create auto flowing columns and layers that let's us remove the need for many media queries, resulting in cleaner and more maintainable stylesheets.
categories: [css, css-grid, grid-layout]
image: "img/twitter/2023-01-18-css-auto-columns.png"
ogImage: "img/twitter/2023-01-18-css-auto-columns.png"
ogImageAlt: "Auto flowing columns using CSS grid"
---

# Using CSS Grid auto-fit/auto-fill to create dynamic columns

I'm sure that many are familiar with using the [Flexbox Albatross](https://heydonworks.com/article/the-flexbox-holy-albatross/) to achieve wrapping columns on smaller screens without needing write a media query. Jonathan Snook has actually modified this and created a [grid version](https://codepen.io/snookca/pen/PoYVLRW) version of this.

What I'm wanting to setup is an auto filling grid that doesn't require media queries and can support having some of it's elements be full width.

<div class="post-image post-image--lg post-image--bright">
{% image "./src/images/posts/2023-01/css-auto-columns/single-to-columns-example.png", "Example of going from a single column to multiple columns and rows", "800px" %}
</div>

## HTML Setup

For the HTML you will need a parent for the grid and then your child columns inside of it. You can then add classes for the modifiers you would like, for this example I am using a full width option and an 2x option.

```html
<div class="grid">
  <div class="col col--full">...</div>
  <div class="col">...</div>
  <div class="col">...</div>
  <div class="col">...</div>
  <div class="col">...</div>
</div>
```

## CSS Setup

### Base grid setup

First we will setup the base grid for the parent wrapper. For this we will use the repeat() function and set the repeat count to [auto-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/repeat#auto-fit), I am using auto-fit because I want the columns to grow to fill the available space, if you don't want them to grow to fill the space then use auto-fill.

Then we will set the tracks, or sizing, using the minmax function. The first size will be 15rem, which will be the minimum size we want the column to be. The second value will be 1fr, which will make all the columns be equal widths.

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
}
```

### Column sizing

Now we style the full width modifier class to start at column **1** and end at **-1**. In this case negative one means that it ends at the last column, which is helpful in cases like this where the last column will be variable / unknown.

```css
.col--full {
  grid-column: 1 / -1;
}
```

## Example

Here's the code in action. You can make any column be full width, by adding the `col--full` class.

```html
<p
  class="codepen"
  data-height="300"
  data-default-tab="html,result"
  data-slug-hash="KKeWywO"
  data-user="craigwfox"
  data-token="c9543b36266207cf5425a72285e821f1"
  style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;"
>
  <span
    >See the Pen
    <a
      href="https://codepen.io/craigwfox/pen/KKeWywO/c9543b36266207cf5425a72285e821f1"
    >
      Grid auto columns with variable sizes</a
    >
    by Craig Fox (<a href="https://codepen.io/craigwfox">@craigwfox</a>) on
    <a href="https://codepen.io">CodePen</a>.</span
  >
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
```

## Closing thoughts

This won't work for everything out there but it's a handy tool to have in your grid layout toolkit. For some other layout techniques checkout my previous post on [Methods for equal height columns](https://craigwfox.com/posts/2021-11/methods-for-equal-height-columns/)
