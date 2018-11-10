/* eslint-disable no-console */
/*
  To get the values for the Date.prototype methods
*/
require('../proto')

// helpers
const showLoc = (dt) => console.log('' + dt)
const showUTC = (dt) => console.log(dt.toJSON())
const showRes = (dt) => console.log(dt)

const date = new Date(2018, 0, 30, 20, 0, 0)

showLoc(date)                   // =>
showRes(date.addMonths(1))      // =>
showLoc(date)                   // =>

showUTC(date)                   // =>
showRes(date.addUTCMonths(1))   // =>
showUTC(date)                   // =>
