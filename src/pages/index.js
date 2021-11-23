import * as React from "react"
import Seo from "../components/seo"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <section id="about" aria-labelledby="title-about" className="section">
      <h2 id="title-about">About Me</h2>
      <div className="grid">
        <div className="">
          <p>
            Currently I'm a front-end developer and I make websites there using
            HTML, CSS, and Javascript. I love what I do and feel that shows in
            my work. Whether it's writing clean code or designing a
            user-friendly site.
          </p>
        </div>
        <div className="">
          <StaticImage
            src="../images/craig-becca-hiking.jpg"
            alt="Craig sitting at a desk with Kitty laying on his arm"
            width={500}
            height={500}
          />
        </div>
      </div>
    </section>

    <section id="work" className="portfolio">
      <h2 className="section-title">My Work</h2>
      <div className="grid-row"></div>
    </section>
  </Layout>
)

export default IndexPage
