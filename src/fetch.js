const request = require('superagent')
const config  = require('./config')
const fs      = require('fs')
const path    = require('path')
const util    = require('./util')
const puppeteer = require('puppeteer')

const companies = require('./companies')

async function sleep (ms) {
  await new Promise(res => {
    setTimeout(res, ms)
  })
}

async function fetchCompanyRawSearchResult () {
  const browser = await puppeteer.launch({
    headless: false
  })
  const page = await browser.newPage()
  await page.goto('https://www.qichacha.com')
  const fileNames = companies
  const dataPath  = path.resolve(__dirname, '..', 'data', 'rawSearchResult')
  for (const [i, v] of companies.entries()) {
    const [id, companyName] = v.slice(0, -5).split('|')
    console.log(`${i + 1} / ${fileNames.length}: ${id} ${companyName}`)
    nextCompany: while (true) {
      try {
        if (!fs.existsSync(path.resolve(dataPath, `${id}|${companyName}.html`))) {
          await page.goto(`https://www.qichacha.com/search?key=${companyName}`)
          const ajaxList = await page.$('#ajaxlist')
          if (ajaxList === null) {
            console.log('被反爬虫限制 需要换ip')
            // change ip
            break nextCompany
            // continue
            // 如果出错太多肯定是有问题了
          }
          const pageHTML = await page.content()
          fs.writeFileSync(path.resolve(dataPath, `${id}|${companyName}.html`), pageHTML)
          await sleep(4000)
        } else {
          console.log('已存在')
        }
        break
      } catch (err) {
        console.log(err.message)
        break
      }
    }
  }
  page.close()
  browser.close()
}

module.exports = {
  fetchCompanyRawSearchResult
}