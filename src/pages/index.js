import * as React from "react"
import Seo from "../components/seo"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <section
      id="about"
      aria-labelledby="title-about"
      className="section section--about"
    >
      <h1 id="title-about">I'm Craig Fox, developer, maker, and geek</h1>
      <div>
        <p>
          Currently I'm working for Arkansas Blue Cross and Blue Shield as a
          front-end developer and I've been building websites for a bit over 10
          years.
        </p>
        <p>
          When building sites I try to make my sites usable and accessible for
          all. Over the years I've built websites using static site generators,
          WordPress, Vue, and React sites for companies large and small.
        </p>
        <p>
          Outside of work I woodwork, 3d print, hike, read, and play video
          games.
        </p>
      </div>

      <StaticImage
        className="about-image"
        src="../images/craig-hiking-2.jpg"
        alt="Craig and Becca hiking at Petit Jean Mountain"
        width={500}
      />
    </section>
  </Layout>
)

export default IndexPage
