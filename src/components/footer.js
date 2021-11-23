import * as React from "react"
import { Link } from "gatsby"

const Footer = () => (
  <footer id="contact" class="site-foot">
    <h2 class="section-title">Contact</h2>

    <ul class="social-wrap">
      <li class="social-icns">
        <a class="github" href="https://github.com/craigwfox">
          Github
        </a>
      </li>
      <li class="social-icns">
        <a class="linkedin" href="http://www.linkedin.com/in/craigwfox">
          LinkedIn
        </a>
      </li>
    </ul>

    <ul class="contact">
      <li>
        ©{` `}
        {new Date().getFullYear()}
        {` `}
        Craig Fox 🦊
      </li>
      <li>Front-End Developer</li>
      <li>
        <a href="mailto:info@craigwfox.com">Email me</a>
      </li>
    </ul>
  </footer>
)

export default Footer
