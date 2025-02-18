<script setup>
const props = defineProps({ curPost: Number })
</script>

<template>
  <div class="series-block">
    <h2>2022 new CSS hotness series</h2>
    <p>
      This is article is a part of a series I'm going to be doing
      talking about some of the cool new things that have come to CSS
      in the last couple of years.
    </p>

    <ol>
      <li>
        <a
          :aria-current="props.curPost == 1 ? page : false"
          href="/blog/2022-05/fluid-type-and-sizing/"
        >
          Fluid type and sizing using clamp(), min(), max()
        </a>
        <em v-if="props.curPost == 1">(You are here)</em>
      </li>
      <li>
        <a
          :aria-current="props.curPost == 2 ? page : false"
          href="/blog/2022-08/where-is-and-has"
          >where(), is(), has()
        </a>
        <em v-if="props.curPost == 2">(You are here)</em>
      </li>
      <li>
        <a
          :aria-current="props.curPost == 3 ? page : false"
          href="/blog/2022-11/using-aspect-ratio/"
          >aspect-ratio</a
        >
        <em v-if="props.curPost == 3">(You are here)</em>
      </li>
      <li>
        Container Queries
        <em v-if="props.curPost == 4">(You are here)</em>
      </li>
    </ol>
  </div>
</template>
