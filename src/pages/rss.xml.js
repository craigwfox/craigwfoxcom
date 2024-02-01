import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts"
import sanitizeHtml from "sanitize-html"
import MarkdownIt from "markdown-it"
const parser = new MarkdownIt()

export async function GET(context) {
  const blog = await getCollection("blog")
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: blog.map(post => ({
      ...post.data,
      title: post.data.title,
      content: sanitizeHtml(parser.render(post.body)),
      link: `/blog/${post.slug}/`,
    })),
  })
}
