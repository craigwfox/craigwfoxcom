---
slug: "/methods-for-equal-height-columns"
date: "2021-11-24"
title: "Methods for equal height columns"
---

# Methods for equal height columns

<div class="post-note">
  Updated for 2021, my original post on this was in 2017 and can be found on{" "}
  <a href="https://codepen.io/craigwfox/post/methods-for-equal-height-columns">
    CodePen
  </a>
  .
</div>

While looking over a competitor's newly designed website, I saw they were using float and an after element to make equal height columns. This got me to thinking about all of the different ways that you can make an equal height column layout.

Below I'm going to go over various ways to layout content to be equal height.

## Using :after and float

This is the method I mentioned earlier. It's not something I have used before and is meant more for vertically centering content.

### Pros

- Columns are equal height
- The columns have a max height set so they will never get taller than you want and they will scale down vertically as the page narrows.

### Cons

- The height isn't dynamic. If content runs long it will expand outside of the container.
- Requires rows so if you want to swap from a 3 column layout to a two column as the browser this doesn't allow for it

### The HTML

The HTML is a typical grid layout. You have a row containing your columns.

```html
<div class="row">
  <div class="col">...</div>
  <div class="col">...</div>
</div>
<div class="row">
  <div class="col">...</div>
  <div class="col">...</div>
</div>
```

### The CSS

For the CSS you have a row with a clearfix. Then the columns that have max-height's set to limit the `padding-top: 100%` from expanding too far.

```css
.row:after {
  content: "";
  display: table;
  clear: both;
}
.col {
  max-height: 300px;
  float: left;
  position: relative;
}
.col:after {
  content: "";
  display: block;
  padding-top: 100%;
}
```

### Working Example

## Table-Cell

## Flex

## Grid
