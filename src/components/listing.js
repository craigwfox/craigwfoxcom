import { graphql, StaticQuery, Link } from "gatsby"
import * as React from "react"

const LISTING_QUERY = graphql`
  query BlogPostListing {
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

const Listing = () => (
  <StaticQuery
    query={LISTING_QUERY}
    render={({ allMarkdownRemark }) =>
      allMarkdownRemark.edges.map(({ node }) => (
        <article className="post post--listing" key={node.frontmatter.slug}>
          <h2 className="post-title">
            <Link to={`/posts${node.frontmatter.slug}`}>
              {node.frontmatter.title}
            </Link>
          </h2>
          <time className="post-date">{node.frontmatter.date}</time>
          <p className="post-excerpt">{node.excerpt}</p>
          <Link to={`/posts${node.frontmatter.slug}`} className="post-link">
            Read more
          </Link>
        </article>
      ))
    }
  />
)

export default Listing
