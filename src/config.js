const config  = require('./config')
const fs      = require('fs')
const path    = require('path')
const util    = require('./util')

fs.writeFileSync('companies.json', JSON.stringify(util.readdirSafe('/Users/hrsonion/Dev/crawl/amac-c/data/managerData'), 0, 2))



module.exports = {
  companyInfoPath: '/Users/hrsonion/Dev/crawl/amac-c/data/managerData'
}