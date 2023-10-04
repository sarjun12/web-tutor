export default function Editor() {
  const env = process.env.NODE_ENV
  if (env === "production") {
    return <div>404 Page Not found</div>
  }
  return <div>Editor</div>
}
