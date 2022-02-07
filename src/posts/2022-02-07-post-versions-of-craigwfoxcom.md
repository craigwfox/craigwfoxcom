---
slug: "/responsive-videos"
date: "2022-02-07"
title: "Responsive videos"
excerpt: ""
---

# Responsive Videos

## History of how I've done responsive videos

In the past I've used a couple of different methods to achieve responsive videos:

- The first thing I remember using was a jQuery plugin called [FitVids.js](http://fitvidsjs.com/) by Chris Coyier (CSS Tricks and Codepen) and Dave Rupert (Paravel).
- Later I swapped to using CSS only version like [Bootstrap](https://getbootstrap.com/docs/4.6/utilities/embed/) does it.

At the end of the day both of these plugins are achieving this with very similar HTML and CSS. The only major difference is that FitVids injects the HTML and CSS into the page. Bootstrap requires you to manually add the embed wrapper to each video.

### The HTML

The HTMl for both is pretty straightforward you have wrapper div and an iframe. In bootstrap the iframe will have a class added to it.

```HTML
<div class="wrapper">
  <iframe src="...">
</div>
```

### The CSS

Again the CSS is similar, but it might seem a bit odd at first glance.

#### First you have the wrapper class

- **Width 100%:** this makes the container responsive and fill the width of it's container (you can add a max-width to keep it from getting too big if need be).
- **Display block:** This makes sure that if the container holding the video isn't a block level element that it will be treated like one. This is needed because without it being treated as block a span for example wouldn't increase in height and the iframe would end up hidden by the positioned we add later.
- **Position relative:** This is needed since we will be absolutely positioning the iframe to the parent and we want the iframe to stay relative to the parent.
- **Overflow hidden:** This keeps the video from overflowing the parent in theory this shouldn't be needed as long as the aspect ratio of the video is right.
- **Padding 0:** This clears any padding from the wrapper. This is required since we will be using padding to set the containers height.

```CSS
.wrapper {
  width: 100%;
  display: block;
  position: relative;
  overflow: hidden;
  padding: 0;
}
```

#### The iframe styles

- **Width and height:** You would set the width and height to 100% to make the iframe match the parent containers height and width.
- **Position:** Next you would position the iframe absolute and set it's top, bottom, left, and right to 0 (today you could do this using `inset: 0` instead).

```CSS
iframe {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
}
```

#### The padding

This is where the real magic of it happens. You would set either the top padding of the wrapper (FitVids) or a psuedo selector of the parent (Bootstrap) to a value relating to the aspect ratio of the video. For this example I'm going to use a value of `56.25%`, since the video is 16x9 (to learn how to find this value you can read this [A list apart article by Thierry Koblentz](https://alistapart.com/article/creating-intrinsic-ratios-for-video/)).

- **Content:** This is required for a pseudo element show in the page at all.
- **Display block:** This makes sure the pseudo element works as a block level element, if you were to leave it as an inline element the top padding would have no effect.
- **Padding top:** This is where the padding value based on the aspect ratio is added.

```CSS
.wrapper::before {
  content:'';
  display: block;
  padding-top: 56.25%;
}
```

## How I manage them today
