export function createID(): string {
  return Math.random().toString(36).substr(2, 16).toUpperCase()
}
