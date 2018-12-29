/* eslint-disable no-console */
const fs = require('fs')
const path = require('path')

const src = /(\w+) (\w+) (\d{4})/.source
const re = RegExp(`^${src} +${src} +${src} +${src}$`)

const months = {
  March: 2,
  April: 3,
}

/**
 * Check dates
 * @param {Date[]} dates - 1700-2299
 */
const checkDates = (dates) => {
  dates.forEach((dt, ix) => {
    const ok = dt.getUTCFullYear(dt) === ix + 1700 && !dt.getUTCDay()
    if (!ok) {
      console.error(`Expected ${dt.toJSON()} to have year ${
        ix + 1700} and day 0 (day is ${dt.getUTCDay()})`)
      process.exit(1)
    }
  })
}

/**
 * @param {RegExpMatchArray[]} mm -
 * @param {Date[]} buffer -
 */
const addToBuffer = function (mm, buffer) {
  //
  for (let i = 0; i < 12; i += 3) {
    const d = parseInt(mm[i + 1], 10)
    const m = months[mm[i + 2]] || NaN
    const y = mm[i + 3]

    const date = new Date(Date.UTC(+y, m, d))

    if (isNaN(+date)) {
      console.error(`Invalid date "${mm[i + 1]} ${mm[i + 1]} ${mm[i + 2]}"`)
      console.dir(mm)
      process.exit(0)
    }

    buffer.push(date)
  }
}

/**
 * @returns {RegExpMatchArray[]} lines
 */
const readLines = function () {
  const file = path.join(__dirname, 'easter-days.txt')
  /** @type {string} */
  const text = fs.readFileSync(file, 'utf8')

  return text.split('\n')
    .map((line) => re.exec(line.trim())).filter(Boolean)
}

const readDays = function () {
  const matches = readLines()

  /** @type {Date[]} */
  const buffer = []

  matches.forEach((match) => addToBuffer(match, buffer))

  return buffer.sort((a, b) => +a - +b)
}

/**
 * Write a JSON with the dates from 1700 to 2299
 */
const extractDays = function () {
  const dates = readDays()
  const json = `export = ${JSON.stringify(dates, null, 2)}\n`

  // check the dates
  checkDates(dates)

  // const days = dates.map((d) => d.toJSON().slice(0, 10) + ' ' + d.getUTCDay())
  // console.dir(days)

  const file = path.join(__dirname, '../fixtures/easter-days.ts')
  fs.writeFileSync(file, json, 'utf8')
}

extractDays()
