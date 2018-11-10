/* eslint-disable no-console */
require('../proto')

const showIt = (date) => console.log('' + date)

const locDate = new Date()
const utcDate = new Date(+locDate)
showIt(locDate)                // => Sat Nov 10 2018 09:55:48 GMT-0600 (hora estándar central)
showIt(utcDate)

showIt(locDate.setMonth(locDate.getMonth() + 3))   // ⇒ 1541865348092
showIt(locDate)                // => Sat Nov 10 2018 09:55:48 GMT-0600 (hora estándar central)

showIt(utcDate.setUTCMonth(locDate.getUTCMonth() + 3))
showIt(utcDate)
