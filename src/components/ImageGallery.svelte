<script>
  export let imageArry = []
  let imageCounter = 0

  function showImage(event) {
    const button = event.currentTarget
    console.log(button)
    const buttonId = button.getAttribute("aria-controls")
    const figure = document.getElementById(buttonId)

    if (button.getAttribute("aria-expanded") === "false") {
      button.setAttribute("aria-expanded", "true")
      document
        .querySelector(`.close[aria-controls="${buttonId}"]`)
        .setAttribute("aria-expanded", "true")
      figure.removeAttribute("hidden")
    } else {
      button.setAttribute("aria-expanded", "false")
      document
        .querySelector(`.close[aria-controls="${buttonId}"]`)
        .setAttribute("aria-expanded", "false")
      figure.setAttribute("hidden", true)
    }
  }

  function closeImage(event) {
    const button = event.currentTarget
    const buttonId = button.getAttribute("aria-controls")
    const figure = document.getElementById(buttonId)

    button.setAttribute("aria-expanded", "false")
    document
      .querySelector(`.open[aria-controls="${buttonId}"]`)
      .setAttribute("aria-expanded", "false")
    figure.setAttribute("hidden", true)
  }
</script>

<div class="image-gallery">
  {#each imageArry as image, i}
    <div class="image-gallery__item">
      <button
        on:click={showImage}
        type="button"
        aria-controls={`gallery-image-${i}`}
        aria-expanded="false"
        class="open"
      >
        <img src={image.path} alt={image.alt} />
      </button>
      <div id={`gallery-image-${i}`} hidden>
        <button
          on:click={closeImage}
          type="button"
          aria-controls={`gallery-image-${i}`}
          aria-expanded="false"
          class="close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentcolor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><circle cx="12" cy="12" r="10"></circle><line
              x1="15"
              y1="9"
              x2="9"
              y2="15"
            ></line><line x1="9" y1="9" x2="15" y2="15"></line></svg
          >
          <span class="visually-hidden">Close</span>
        </button>
        <figure>
          <img src={image.path} alt={image.alt} />
          <figcaption>{image.alt}</figcaption>
        </figure>
      </div>
    </div>
  {/each}
</div>
