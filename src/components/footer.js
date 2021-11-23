import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"

const Footer = () => (
  <footer id="footer" className="site-footer">
    <h2>Contact</h2>

    <ul>
      <li>
        <a href="https://github.com/craigwfox">Github</a>
      </li>
      <li>
        <a href="http://www.linkedin.com/in/craigwfox">LinkedIn</a>
      </li>
    </ul>

    <ul>
      <li>
        ©{` `}
        {new Date().getFullYear()}
        {` `}
        Craig Fox
        {` `}
        <StaticImage
          src="../images/fox-icon.svg"
          alt="Orange fox head illustration"
          width={15}
          height={15}
        />
      </li>
      <li>Front-End Developer</li>
      <li>
        <a href="mailto:info@craigwfox.com" target="_blank" rel="noopener">
          Email me
        </a>
      </li>
    </ul>
  </footer>
)

export default Footer
