/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "../sass/styles.scss"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  return (
    <>
      <Header
        siteTitle={data.site.siteMetadata?.title || `Title`}
        siteDescription={data.site.siteMetadata?.description || `Description`}
      />
      <main id="maincontent" className="main">
        <section className="content">{children}</section>
      </main>
      <footer className="site-footer">
        <p>
          © {new Date().getFullYear()}, Built by
          {` `}
          <a href="https://craigwfox.com">Craig Fox</a>
          {` `}
          using Gatsby and Netlify
        </p>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
