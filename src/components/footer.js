import * as React from "react"
import { Link } from "gatsby"

const Footer = () => (
  <footer id="contact" className="site-foot">
    <h2 className="section-title">Contact</h2>

    <ul className="social-wrap">
      <li className="social-icns">
        <a className="github" href="https://github.com/craigwfox">
          Github
        </a>
      </li>
      <li className="social-icns">
        <a className="linkedin" href="http://www.linkedin.com/in/craigwfox">
          LinkedIn
        </a>
      </li>
    </ul>

    <ul className="contact">
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
