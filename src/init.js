const fs = require('fs')
const path = require('path')

function init () {
  if (fs.existsSync(path.resolve(__dirname, '..', 'data'))) {
    fs.mkdirSync(path.resolve(__dirname, '..', 'data'))
  }
  if (fs.existsSync(path.resolve(__dirname, '..', 'data', 'rawSearchResult'))) {
    fs.mkdirSync(path.resolve(__dirname, '..', 'data', 'rawSearchResult'))
  }
}

module.exports = init
