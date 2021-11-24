import React, { Component } from "react"
import { graphql } from "gatsby"
import Layout from "./layout"
import Seo from "./seo"

export default class postLayout extends Component {
  render() {
    const { markdownRemark } = this.props.data

    return (
      <Layout>
        <Seo title={markdownRemark.frontmatter.title} />
        <div className="section section--post">
          <time>{markdownRemark.frontmatter.date}</time>
          <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
        </div>
      </Layout>
    )
  }
}

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        slug
      }
    }
  }
`
