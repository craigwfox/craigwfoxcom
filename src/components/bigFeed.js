import { graphql, StaticQuery, Link } from "gatsby"
import * as React from "react"

const BIGFEED_QUERY = graphql`
  query BlogPostBigFeed {
    allMarkdownRemark(
      limit: 300
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
            date(formatString: "MMMM DD, YYYY")
            excerpt
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
          <p>
            {node.frontmatter.excerpt ? node.frontmatter.excerpt : node.excerpt}
          </p>
        </article>
      ))
    }
  />
)

export default BigFeed
