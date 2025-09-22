const API_BASE = process.env.NEXT_PUBLIC_API_URL

export function resolveImageUrl(path: string) {
  if (!path) return ""
  if (path.startsWith("http")) return path
  if (!API_BASE) return path

  try {
    return new URL(path, API_BASE).toString()
  } catch {
    const sanitizedBase = API_BASE.endsWith("/") ? API_BASE.slice(0, -1) : API_BASE
    const sanitizedPath = path.startsWith("/") ? path.slice(1) : path
    return `${sanitizedBase}/${sanitizedPath}`
  }
}
