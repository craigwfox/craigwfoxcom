import * as React from "react"
import Seo from "../components/seo"

import Layout from "../components/layout"
import BigFeed from "../components/bigFeed"

const Posts = () => (
  <Layout>
    <Seo title="Blog" />

    <section id="blog" aria-labelledby="title-blog" className="section">
      <h1 id="title-blog">Ramblings of me</h1>

      <div className="post-feed">
        <BigFeed />
      </div>
    </section>
  </Layout>
)

export default Posts
