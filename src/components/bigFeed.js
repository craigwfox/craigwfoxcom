import { graphql, StaticQuery, Link } from "gatsby"
import * as React from "react"

const BIGFEED_QUERY = graphql`
  query BlogPostBigFeed {
    allMarkdownRemark(
      limit: 15
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
            date(formatString: "MMMM DD, YYYY")
          }
          excerpt
        }
      }
    }
  }
`

const BigFeed = () => (
  <StaticQuery
    query={BIGFEED_QUERY}
    render={({ allMarkdownRemark }) =>
      allMarkdownRemark.edges.map(({ node }) => (
        <article className="post" key={node.frontmatter.slug}>
          <time>{node.frontmatter.date}</time>
          <h2>
            <Link to={`/posts${node.frontmatter.slug}`}>
              {node.frontmatter.title}
            </Link>
          </h2>
          <p>{node.excerpt}</p>
        </article>
      ))
    }
  />
)

export default BigFeed
