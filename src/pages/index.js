import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import Seo from "../components/seo"

import Layout from "../components/layout"
import Listing from "../components/listing"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <h1>Blogy blog</h1>

    <Listing />
  </Layout>
)

export default IndexPage
