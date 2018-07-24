const request = require('superagent')
const config  = require('./config')
const fs      = require('fs')
const path    = require('path')
const util    = require('./util')
const puppeteer = require('puppeteer')

async function sleep (ms) {
  await new Promise(res => {
    setTimeout(res, 1000)
  })
}

async function fetchCompanyRawSearchResult () {
  const browser = await puppeteer.launch({
    headless: false
  })
  const page = await browser.newPage()
  await page.goto('https://www.qichacha.com')
  const fileNames = util.readdirSafe(config.companyInfoPath)
  const dataPath  = path.resolve(__dirname, '..', 'data', 'rawSearchResult')
  for (const [i, v] of fileNames.entries()) {
    const [id, companyName] = v.slice(0, -5).split('|')
    console.log(`${i + 1} / ${fileNames.length}: ${id} ${companyName}`)
    try {
      if (!fs.existsSync(path.resolve(dataPath, `${id}|${companyName}.html`))) {
        await page.goto(`https://www.qichacha.com/search?key=${companyName}`)
        const pageHTML = await page.content()
        fs.writeFileSync(path.resolve(dataPath, `${id}|${companyName}.html`), pageHTML)
        await sleep(1000)
      } else {
        console.log('已存在')
      }
    } catch (err) {
      console.log(err.message)
    }
  }
  page.close()
  browser.close()
}

module.exports = {
  fetchCompanyRawSearchResult
}