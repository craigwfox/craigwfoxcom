<script>
  export let curPost = 1
</script>

<div class="series-block">
  <h2>2022 new CSS hotness series</h2>
  <p>
    This is article is a part of a series I'm going to be doing talking about
    some of the cool new things that have come to CSS in the last couple of
    years.
  </p>

  <ol>
    <li>
      <a
        aria-current={curPost == 1 ? "page" : "false"}
        href="/blog/2022-05/fluid-type-and-sizing/"
      >
        Fluid type and sizing using clamp(), min(), max()
      </a>
      {#if curPost == 1}
        <em>(You are here)</em>
      {/if}
    </li>
    <li>
      <a
        aria-current={curPost == 2 ? "page" : "false"}
        href="/blog/2022-08/where-is-and-has"
        >where(), is(), has()
      </a>
      {#if curPost == 2}
        <em>(You are here)</em>
      {/if}
    </li>
    <li>
      <a
        aria-current={curPost == 3 ? "page" : "false"}
        href="/blog/2022-11/using-aspect-ratio/">aspect-ratio</a
      >
      {#if curPost == 3}
        <em>(You are here)</em>
      {/if}
    </li>
    <li>
      Container Queries
      {#if curPost == 4}
        <em>(You are here)</em>
      {/if}
    </li>
  </ol>
</div>
