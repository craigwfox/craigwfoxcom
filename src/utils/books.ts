import type {
  Render,
  RenderedContent,
  InferEntrySchema,
} from "astro:content"

export type NullableDate = Date | null

export interface Book {
  id: string
  render(): Render[".md"]
  slug: string
  body: string
  collection: "reading"
  data: InferEntrySchema<"reading">
  rendered?: RenderedContent
  filePath?: string | undefined
}

export function compareDates(
  a: Book,
  b: Book,
  order: "DESC" | "ASC" = "ASC",
) {
  if (b.data.endDate && a.data.endDate) {
    if (order === "DESC")
      return (
        a.data.endDate.valueOf() - b.data.endDate.valueOf()
      )
    return (
      b.data.endDate.valueOf() - a.data.endDate.valueOf()
    )
  } else {
    return 0
  }
}

export function refineBookDate(
  book: Book,
): InferEntrySchema<"reading"> {
  const updatedBook = book.data
  let startDate: NullableDate = null
  let endDate: NullableDate = null
  let publishDate: NullableDate = null

  if (book.data.startDate)
    startDate = new Date(
      new Date(book.data.startDate)
        .toISOString()
        .replaceAll(/-/g, "/")
        .replace(/T.+/, ""),
    )

  if (book.data.endDate)
    endDate = new Date(
      new Date(book.data.endDate)
        .toISOString()
        .replaceAll(/-/g, "\/")
        .replace(/T.+/, ""),
    )

  if (book.data.publishDate)
    publishDate = new Date(
      new Date(book.data.publishDate)
        .toISOString()
        .replaceAll(/-/g, "\/")
        .replace(/T.+/, ""),
    )

  const fullDate = endDate ? endDate : startDate

  if (fullDate)
    updatedBook["imageSrc"] =
      `/images/covers/${book.data.isbn}.jpg`

  if (book.data.startDate && startDate)
    updatedBook.startDate = startDate
  if (book.data.endDate && endDate)
    updatedBook.endDate = endDate
  if (book.data.publishDate && publishDate)
    updatedBook.publishDate = publishDate
  return updatedBook
}

export function getPercentage(min: number, max: number) {
  const percentage = Math.round((min / max) * 100)
  return `${percentage < 100 ? percentage : 100}%`
}
