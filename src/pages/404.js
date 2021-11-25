import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <section className="section">
      <Seo title="💥 404: Not found" />
      <h1>404: Not Found</h1>
      <p>
        You just hit a route that doesn&#39;t exist... have a picture of my
        cats.
      </p>
      <StaticImage
        className="image-border"
        src="../images/kitty-apples-box.webp"
        width={500}
      />
    </section>
  </Layout>
)

export default NotFoundPage
