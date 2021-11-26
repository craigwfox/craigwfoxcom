import * as React from "react"
import iconFox from "../images/fox-icon.svg"

const Footer = () => (
  <footer id="footer" className="site-footer" aria-label="Site footer">
    <h2>Find me</h2>

    <ul>
      <li>
        <a href="https://github.com/craigwfox">Github</a>
      </li>
      <li>
        <a href="https://codepen.io/craigwfox">Codepen</a>
      </li>
      <li>
        <a href="http://www.linkedin.com/in/craigwfox">LinkedIn</a>
      </li>
      <li>
        <a href="mailto:info@craigwfox.com" target="_blank" rel="noreferrer">
          Email me
        </a>
      </li>
    </ul>

    <p>
      ©{` `}
      {new Date().getFullYear()}
      {` `}
      Craig Fox
      {` `}
      <img
        src={iconFox}
        alt="Orange fox head illustration"
        width="25"
        aria-hidden="true"
      />
      {` `}
      Front-end developer
    </p>
  </footer>
)

export default Footer
