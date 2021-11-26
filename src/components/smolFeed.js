import { graphql, StaticQuery, Link } from "gatsby"
import * as React from "react"

const SMOLFEED_QUERY = graphql`
  query BlogPostSmolFeed {
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

const SmolFeed = () => (
  <ul className="list-posts">
    <StaticQuery
      query={SMOLFEED_QUERY}
      render={({ allMarkdownRemark }) =>
        allMarkdownRemark.edges.map(({ node }) => (
          <li key={node.frontmatter.slug}>
            <time>{node.frontmatter.date}</time>
            <Link to={`/posts${node.frontmatter.slug}`}>
              {node.frontmatter.title}
            </Link>
          </li>
        ))
      }
    />
  </ul>
)

export default SmolFeed
