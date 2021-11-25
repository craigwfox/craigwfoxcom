import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import svgCraigLogo from "../images/craig-logo-red.svg"

const Header = ({ siteDescription }) => (
  <header className="site-header">
    <Link to="/" className="site-logo">
      <img
        src={svgCraigLogo}
        alt="Craig Fox Web Designer and Front-End Developer"
      />
    </Link>
    <nav aria-label="Site navigation">
      <Link to="/">Home</Link>
      <Link to="/">Blog</Link>
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
