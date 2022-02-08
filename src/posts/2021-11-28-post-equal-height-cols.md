---
slug: "/methods-for-equal-height-columns"
date: "2021-11-28"
title: "Methods for equal height columns"
excerpt: "The different ways I've created equal height columns, since I first started making websites."
---

# Methods for equal height columns

<p class="post-note">
  Updated for 2021, my original post on this was in 2017 and can be found on <a href="https://codepen.io/craigwfox/post/methods-for-equal-height-columns">CodePen</a>.
</p>

A few years ago, while looking over a competitor's newly designed website, I saw they were using float and an after pseudo selector to make equal height columns. This got me to thinking about all of the different ways that you can make an equal height column layout.

## Using :after and float

This is the method I mentioned earlier. It's not something I have used before and is pretty unnecessary now with flex and grid. The purpose of it seems to have been meant more for vertically centering than making the columns equal height.

### Pros

- Columns are equal height
- The columns have a max height set so they will never get taller than you want and they will scale down vertically as the page narrows.

### Cons

- The height isn't dynamic. If content runs long it will overflow outside of the container.
- Requires rows so if you want to swap from a 3 column layout to a two column as the browser resizes it requires a decent bit of CSS

### The HTML

The HTML is a typical grid layout of rows and columns. Very similar to what you would see in older version of Bootstrap.

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

For the CSS you have a row with a clearfix. Then the column will have a `max-height` and the col's &:after pseudo selector has padding 100%.

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

<iframe height="450" style="width: 100%;" scrolling="no" title="Equal Height Columns - After + Float" src="https://codepen.io/craigwfox/embed/BZRjEo?default-tab=result&theme-id=dark" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/craigwfox/pen/BZRjEo">
  Equal Height Columns - After + Float</a> by Craig Fox (<a href="https://codepen.io/craigwfox">@craigwfox</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

<p class="disclaimer">Not something I would recommend using anymore, now that flex and gid work everywhere</p>

## Table-Cell

This was one of my personal gotos before using starting to use flex and grid. It is fairly easy to work with and at the time I used it had solid browser support in older versions of IE, while I still needed to support that.

### Pros:

- Columns are equal height.
- Great support/fallback for ie9 (if that something you might still need)

### Cons:

- Like the float method above it requires rows so swapping amounts of columns per row can be an issue. Getting space between background colors of the columns can be a pain, requiring you to make wrappers inside of each column and using padding to make space.

### The HTML

The HTML is the same as using the :before method.

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

The CSS is simple. The `.col` class is given the `display: table-cell` property. Then set the width you would like.

```css
.col {
  width: 50%;
  height: 100%;

  display: table-cell;
}
```

### Working Example

<iframe height="450" style="width: 100%;" scrolling="no" title="Equal Height Columns - table-cell" src="https://codepen.io/craigwfox/embed/VWbKVq?default-tab=result&theme-id=dark" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/craigwfox/pen/VWbKVq">
  Equal Height Columns - table-cell</a> by Craig Fox (<a href="https://codepen.io/craigwfox">@craigwfox</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

<p class="disclaimer">Not something I would recommend using anymore, now that flex and gid work everywhere</p>

## Flex

### Pros:

- Equal height columns
- Can move and reorder content with CSS
- Doesn't require rows to have multiple rows of columns, so if you need to swap from the number of columns you can by adjusting the widths

### Cons:

- Not really any cons these days. It works in all modern browsers (and even IE 11 with some prefixing and a bit of tweaking here and there)

### The HTML

No need for a lot of wrappers/containers. We just need a parent wrapping all the columns.

```html
<div class="grid">
  <div class="col">...</div>
  <div class="col">...</div>
  <div class="col">...</div>
  <div class="col">...</div>
</div>
```

### The CSS

On the parent container, .grid in this case, we will add display: flex and that it's we have equal height columns.

```css
.grid {
  display: flex;
}
```

There is a downside here if we want to set a width of say fifty percent and we have four columns it will by default ignore that width and fit all four columns into the same row. To fix this we will add flex-wrap: wrap to the .grid and then we can a width to .col and the 3rd and 4th columns would drop to a second row.

```css
.grid {
  display: flex;
  flex-wrap: wrap;
}
.col {
  width: 50%;
}
```

### Working Example

<iframe height="450" style="width: 100%;" scrolling="no" title="Equal Height Columns - flexbox" src="https://codepen.io/craigwfox/embed/PjjNBz?default-tab=result&theme-id=dark" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/craigwfox/pen/PjjNBz">
  Equal Height Columns - flexbox</a> by Craig Fox (<a href="https://codepen.io/craigwfox">@craigwfox</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

For a more complete guide to flex box check out the [CSS-Tricks guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

## Grid

### Pros:

- Tons of options for fine tune control of how the layout works. You can go pretty simple or you can precisely control where each element goes in the grid.
- Like Flexbox you can rearrange your content with CSS just by swapping the rows / cols (do remember that just because you reorder the elements within the grid, screen readers and tabbing will still follow the order of the HTML not necessarily how the screen renders)

### Cons:

- Not really any cons these days. It works in all modern browsers (and even IE 11 with some prefixing and a bit of tweaking here and there)

### The HTML

No need for a lot of wrappers/containers. We just need a parent wrapping all the columns.

```html
<div class="grid">
  <div class="col">...</div>
  <div class="col">...</div>
  <div class="col">...</div>
  <div class="col">...</div>
</div>
```

### The CSS

This can be as simple of complex as you want it to be. There are options to set base column and row sizes, but you can also get a specific as you want.

```css
.grid {
  display: grid;
  grid-gap: 20px;
  grid-auto-rows: minmax(100px, auto);
  grid-template-columns: 50% 1fr;
}
```

### Working Example

<iframe height="450" style="width: 100%;" scrolling="no" title="Equal Height Columns - grid" src="https://codepen.io/craigwfox/embed/GEMoMy?default-tab=result&theme-id=dark" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/craigwfox/pen/GEMoMy">
  Equal Height Columns - grid</a> by Craig Fox (<a href="https://codepen.io/craigwfox">@craigwfox</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

For a more complete guide to CSS Grid check out [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) or [CSS-Tricks](https://css-tricks.com/snippets/css/complete-guide-grid/).
