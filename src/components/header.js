import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const Header = ({ siteTitle, siteDescription }) => (
  <header className="site-header">
    <h1 className="site-logo">
      <span>{siteTitle}</span>
    </h1>
    <h2>{siteDescription}</h2>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
  siteDescription: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
  siteDescription: ``,
}

export default Header
