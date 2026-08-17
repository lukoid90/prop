export function formatEntryTimestamp(date: Date): string {
  const now = new Date()
  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()

  if (isToday) {
    const hour24 = date.getHours()
    const period = hour24 >= 12 ? 'pm' : 'am'
    const hour12 = hour24 % 12 || 12
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `Today, ${hour12}:${minutes}${period}`
  }

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
