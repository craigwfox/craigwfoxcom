---
templateEngineOverride: njk,md
tags: post
permalink: "/posts/2022-11/using-aspect-ratio/"
date: 2022-11-03
title: "CSS aspect-ratio and some everyday uses for it"
description: "CSS aspect-ratio has been working in browser for a couple of years now and I want to share some ways that I frequently utilize it in my day to day work."
categories: [2022-css, css]
image: "img/twitter/2022-11-03-aspect-ratio.png"
ogImage: "img/twitter/2022-11-03-aspect-ratio.png"
ogImageAlt: "Using CSS aspect-ratio"
---

# CSS aspect ratio and some everyday uses for it

CSS aspect-ratio has been working in browser for a couple of years now and I want to share some ways that I frequently utilize it in my day to day work.

{% set curPost = "3" %}
{% include '../blog-parts/css-2022-hotness.njk' %}

## Image sizing

I most often find myself reaching for aspect-ratio to size images in combination with object-fit. It can be useful to keep images sized similarly between different items in a grid of content (at least until subgrid works everywhere).

### Example of a figure/caption

In this example I have a figure and caption. The figure is using a grid layout that limits the width of the image and then the image has an aspect-ratio of 1 which will keep is square.

<iframe height="500" style="width: 100%;" scrolling="no" title="Aspect ratio with images" src="https://codepen.io/craigwfox/embed/mdKEVKL?default-tab=result&theme-id=dark" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/craigwfox/pen/mdKEVKL">
  Aspect ratio with images</a> by Craig Fox (<a href="https://codepen.io/craigwfox">@craigwfox</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## Video sizing

Another frequent use I find for aspect-ratio is to make videos embeds (specifically iframes from viemo/youtube) responsive. This requires fairly minimal CSS. You need to set the width and height to 100%, then set the aspect-ratio to match the video (in this case 16 by 9), and then `object-fit: contain`, this will keep the image the correct ratio and allow it to resize.

```css
.responsive-video {
  width: 100%;
  height: 100%;
  aspect-ratio: 16 / 9;
  object-fit: contain;
}
```

### Example of a responsive video

<iframe style="width: 100%;" scrolling="no" title="Responsive video" src="https://codepen.io/craigwfox/embed/qBVRXJZ?default-tab=html%2Cresult" loading="lazy" allowtransparency="true" allowfullscreen="true" height="500" frameborder="no">
  See the Pen <a href="https://codepen.io/craigwfox/pen/qBVRXJZ">
  Responsive video</a> by Craig Fox (<a href="https://codepen.io/craigwfox">@craigwfox</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

I've got a longer post on just [responsive videos](https://craigwfox.com/posts/responsive-video-embeds/) and some history on how they used to be done.
