const fs = require('fs')

function readdirSafe (path) {
  const dir = fs.readdirSync(path)
  return dir.filter(v => !v.startsWith('.'))
}

module.exports = {
  readdirSafe
}