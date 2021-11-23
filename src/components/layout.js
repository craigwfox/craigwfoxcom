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
import Footer from "./footer"
import "../sass/styles.scss"
import svgWebDev from "../images/web-dev-text.svg"
import imgMeComputer from "../images/craig-fox.jpg"

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
        siteDescription={data.site.siteMetadata?.description || `Description`}
      />

      <section class="grid-row intro">
        <div class="grid-1-2 intro__text">
          <p>
            I love design and clean, semantic code. My specialty is front-end
            development.
          </p>
        </div>
        <div class="grid-1-2 intro__img">
          <img src={svgWebDev} alt="Web Designer and Developer" />
        </div>
      </section>

      <div class="about__wrapper">
        <section id="about" class="about">
          <h2 class="section-title">About Me</h2>
          <div class="grid-row">
            <div class="grid-2-3 about__copy">
              <p>
                Currently I'm a front-end developer and I make websites there
                using HTML, CSS, and Javascript. I love what I do and feel that
                shows in my work. Whether it's writing clean code or designing a
                user-friendly site.
              </p>
            </div>
            <div class="grid-1-3 about__image">
              <img src={imgMeComputer} alt="Craig Fox - Web Developer" />
            </div>
          </div>
        </section>
      </div>

      <section id="work" class="portfolio">
        <h2 class="section-title">My Work</h2>
        <div class="grid-row"></div>
      </section>

      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
