import * as React from "react"
import Seo from "../components/seo"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <section id="about" aria-labelledby="title-about" className="section">
      <h2 id="title-about">About Craig</h2>
      <p>
        Hiya, I'm a front-end developer and have been building websites for a
        bit over 10 years. Currently I'm working for Arkansas Blue Cross and
        Blue Shield and do some contract work on the side.
      </p>
      <p>
        I try to make my sites usable and accessible for all. Over the years
        I've built sites static sites, WordPress, Vue, and React for companies
        large and small.
      </p>
      <div>
        <StaticImage
          src="../images/craig-becca-hiking.jpg"
          alt="Craig and Becca hiking at Petit Jean Mountain"
          width={300}
        />
      </div>
    </section>
  </Layout>
)

export default IndexPage
