import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import svgCraigLogo from "../images/craig-logo-red.svg"

const Header = ({ siteDescription }) => (
  <header className="site-header">
    <Link to="/">
      <img
        className="site-logo"
        src={svgCraigLogo}
        alt="Craig Fox Web Designer and Front-End Developer"
      />
    </Link>
    <nav>
      <a href="/">Home</a>
      <a href="/">Blog</a>
    </nav>
  </header>
)

Header.propTypes = {
  siteDescription: PropTypes.string,
}

Header.defaultProps = {
  siteDescription: ``,
}

export default Header
