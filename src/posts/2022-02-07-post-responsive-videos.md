---
tags: post
permalink: "/posts/responsive-videos/"
date: 2022-02-07
title: "Responsive videos"
categories: ["Web history", "Old vs new"]
description: "A look at how responsive videos have been done in the past and how we can do them now."
image: "img/rss/2022-02-responsive-videos.png"
ogImage: "img/twitter/2022-02-responsive-videos.png"
ogImageAlt: "Learn about responsive videos"
---

# Responsive Videos

## How I've done responsive videos in the past {#the-past}

In the past I've used a couple of different methods to achieve responsive videos:

- The first thing I used often was a jQuery plugin called [FitVids.js](http://fitvidsjs.com/).
- Later I swapped to using CSS only version like [Bootstrap](https://getbootstrap.com/docs/4.6/utilities/embed/) uses.

At the end of the day both of these methods are achieving the same thing using similar HTML and CSS. The major difference between is how they add the HTML to the page. FitVids injects the HTML and CSS into the page using Javascript, while Bootstrap requires you to manually add the embed wrapper to each video (this can also be automated in most content management systems).

### The HTML {#past-html}

The HTML for both is pretty straightforward you have wrapper div and an iframe. In bootstrap the iframe would need a class added to it while FitVids handled this.

```html
<div class="wrapper">
  <iframe src="..."></iframe>
</div>
```

### The CSS {#past-css}

As with the HTML the CSS between the two is very similar.

#### First you have the wrapper class

- **Width** - The width is set to `100%`, this makes the container fill the space, but also makes it shrink. If need you could also set a max-width to keep the video from getting too wide.
- **Display** - The display is set to `block`, this is here for when the wrapper isn't a block level element. An inline level element would end up being 0px tall because the padding that is added in a later stage wouldn't apply.
- **Position** - The position is set to `relative`. The iframe is being set to absolute so this keep the iframe relative to it's parent.
- **Overflow** - The overflow is set to `hidden`. This prevents the video from overflowing the parent, in theory this shouldn't be needed as long as the aspect ratio of the video is right and FitVids actually omits it.
- **Padding** - The padding is set to `0`. This clears any padding from the wrapper, because any padding on the parent would throw off the resizing of the video.

```css
.wrapper {
  width: 100%;
  display: block;
  position: relative;
  overflow: hidden;
  padding: 0;
}
```

#### The iframe styles

- **Width and height:** The width and height are set to `100%` to make the iframe match the parent containers height and width.
- **Position:** The position is set to `absolute` and the top, bottom, left, and right to `0` (today you could do this using `inset: 0` instead).

```css
iframe {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
}
```

#### Setting the aspect ratio

This is where the real magic of it happens. You would set either the top padding of the wrapper (FitVids) or a psuedo selector of the parent (Bootstrap) to a value relating to the aspect ratio of the video. For this example I'm going to use a value of `56.25%`, since the video is 16x9 (to learn how to find this value you can read this [A list apart article by Thierry Koblentz](https://alistapart.com/article/creating-intrinsic-ratios-for-video/)).

- **Content:** This is required for a pseudo element show in the page at all.
- **Display block:** This makes sure the pseudo element works as a block level element, if you were to leave it as an inline element the top padding would have no effect.
- **Padding top:** This is where the padding value based on the aspect ratio is added.

```css
.wrapper::before {
  content: "";
  display: block;
  padding-top: 56.25%;
}
```

## How I manage responsive videos now {#the-now}

Today we have the CSS properties [aspect-ratio](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio) and [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) that make this much simpler to manage.

### HTML {#now-html}

The HTML can be pretty simple. I'd suggest adding a class to iframes that you want to be responsive (I'd probably avoid globally adding it to all iframes, just incase there are embeds you don't want working this way).

```html
<iframe class="responsive-video" src="..."></iframe>
```

### CSS {#now-css}

The CSS in this method is quite a bit more clear.

- **Width and height** - The width and height are still set to `100%`. This makes the iframe try to be as wide and tall as possible.
- **Aspect ratio** - The aspect-ratio is set to `16 / 9` prevents the width and height from stretching the video beyond the 16:9 aspect ratio, which would result is blank space in the iframe. Additionally you can set the aspect ratio to whatever ratio you want.
- **Object fit** - The object-fit is set to `contain` this makes the iframe try and expand to the largest width and height that it can without clipping outside it's parent bounds.

```css
.responsive-video {
  width: 100%;
  height: 100%;

  aspect-ratio: 16 / 9;
  object-fit: contain;
}
```

### Working example

<iframe height="375" style="width: 100%;" scrolling="no" title="Responsive video" src="https://codepen.io/craigwfox/embed/qBVRXJZ?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/craigwfox/pen/qBVRXJZ">
  Responsive video</a> by Craig Fox (<a href="https://codepen.io/craigwfox">@craigwfox</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

### Additional improvements

Not all videos will be 16:9 so you could add some additional class to cover more aspect ratios.

```css
.responsive-video {
  width: 100%;
  height: 100%;

  aspect-ratio: 16 / 9;
  object-fit: contain;
}

.responsive-video--4x3 {
  aspect-ratio: 4 / 3;
}

.responsive-video--1x1 {
  aspect-ratio: 1 / 1;
}
```
