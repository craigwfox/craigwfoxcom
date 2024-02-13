---
tags: post, post-dev
categories: ["dev", "css", "css grid", "grid layout"]
postSlug: "css-cascade-layers-and-important/"
pubDate: 2023-12-06
title: "How important works with CSS cascade layers"
description: A short explanation of how important works with CSS cascade layers
image: "images/twitter/2023-01-18-css-auto-columns.png"
ogImage: "images/twitter/2023-12-06-css-cascade-layers-and-important.png"
ogImageAlt: "How important works with CSS cascade layers"
---

I was working with CSS Cascade layers and Bootstrap 5 and learned that the specificity of `important` works very differently.

## How `important` is normally used

Normally how `important` works is that important will override everything other style on the page.

```css
p {
  color: red;
}

p {
  color: green !important;
}

p {
  color: blue;
}
```

<div class="html-example" id="important-example-one">
  <p>This should be green.</p>
</div>

<style>
  #important-example-one p {
    color: pink;
  }

  #important-example-one p {
    color: lightgreen !important;
  }

  #important-example-one p {
    color: lightblue;
  }
</style>

In this case also if you were to state important again the last style with important will have the highest specificity.

```css
p {
  color: red;
}

p {
  color: green !important;
}

p {
  color: blue;
}

p {
  color: palegoldenrod !important;
}
```

<div class="html-example" id="important-example-two">
  <p>This should be yellow.</p>
</div>

<style>
  #important-example-two p {
    color: pink;
  }

  #important-example-two p {
    color: lightgreen !important;
  }

  #important-example-two p {
    color: lightblue;
  }

  #important-example-two p {
    color: palegoldenrod !important;
  }
</style>

## How `important` works with Cascade Layers

In CSS Cascade Layers this all works quite a bit differently. Normally the way specificity works in cascade layers is that the later layers have higher specificity than the previous layers. Additionally styles not inside of a layer will have higher specificity than styles within layers.

Where this gets weird is when you throw `important` into the ring. The first time `important` is declared in a layer takes specificity over all other styles including any additional `important` declarations on the selector. Even more strangely declaring `important` outside of a layer either at the very start of a file or the very end, that first `important` declaration takes specificity over those outside of a layer.

```css
@layer layerOne, layerTwo;

@layer layerOne {
  p {
    color: pink;
  }
}

@layer layerTwo {
  p {
    color: lightblue;
  }
}

p {
  color: palegoldenrod;
}
```

<div class="html-example" id="important-example-three">
  <p>This should be pink.</p>
</div>

<style>
  #important-example-three p {
    color: purple !important;
  }

  @layer layerOne, layerTwo;

  @layer layerOne {
    #important-example-three p {
      color: pink !important;
    }
  }

  @layer layerTwo {
    #important-example-three p {
      color: lightblue;
    }
  }

  #important-example-three p {
    color: palegoldenrod !important;
  }
</style>

## Why does this matter?

You might be asking why does this even matter since we shouldn't even need `important` with layers. The problem I had was Bootstraps utilities classes. Most of the utilities use `important` and with layers you want to import/wrap all vendor styles withing a vendor layer that goes at the start of the `@layer` stack. Which means that those important become almost impossible to override.

So how do you override them? Well the only solution I have found so far is to create some kind of "exceptions" layer and then place that layer at the very start of the layer stack. This really isn't ideal so hopefully down the line now that layers are supported across the board Bootstrap and other frameworks, plugins, etc will move to layering their CSS and move away from using important.
