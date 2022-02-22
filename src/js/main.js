// Checks the user preference for color scheme and sets it to match
// the data-theme matches up with the theme-switcher web component
function checkPref() {
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")
  const body = document.querySelector("body")
  let theme = "light"

  if (prefersDarkScheme.matches) theme = "dark"
  body.setAttribute("data-theme", theme)
}
checkPref()
