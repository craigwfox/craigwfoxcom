export const formatDate = function (date) {
  const newDate = new Date(date)
  return newDate.toLocaleDateString("en-us", {
    timeZone: "UTC",
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}
