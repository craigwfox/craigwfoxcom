import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import svgCraigLogo from "../images/craig-logo.svg"

const Header = ({ siteDescription }) => (
  <header className="site-head">
    <Link to="/" className="site-logo-wrap">
      <img
        className="site-logo"
        src={svgCraigLogo}
        alt="Craig Fox Web Designer and Front-End Developer"
      />
    </Link>
  </header>
)

Header.propTypes = {
  siteDescription: PropTypes.string,
}

Header.defaultProps = {
  siteDescription: ``,
}

export default Header
