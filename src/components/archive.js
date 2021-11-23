import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

const POST_ARCHIVE_QUERY = graphql`
  query BlogPostArchive {
    allMarkdownRemark(
      limit: 5
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`

const Archive = () => {
  const data = useStaticQuery(POST_ARCHIVE_QUERY)

  return (
    <>
      <aside className="sidebar-posts">
        <h3>Archive</h3>
        {data.allMarkdownRemark.edges.map(edge => (
          <article
            className="post post--sidebar"
            key={edge.node.frontmatter.slug}
          >
            <h4 className="post-title">
              <Link to={`/posts${edge.node.frontmatter.slug}`}>
                {edge.node.frontmatter.title}
              </Link>
            </h4>
            <time className="post-date">{edge.node.frontmatter.date}</time>
          </article>
        ))}
      </aside>
    </>
  )
}

export default Archive
