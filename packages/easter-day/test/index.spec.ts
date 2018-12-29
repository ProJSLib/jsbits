
import expect = require('expect.js')
import easterDay = require('..')
import otherCalc = require('./calculator')
import jsonTable = require('./fixtures/easter-days')

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
// istanbul ignore next
const dStr = (dt: Date) => `${dt.toJSON().substr(0, 10)} ${days[dt.getDay()].substr(0, 3)}`

describe('easterDay', function () {

  it('comparison with other calculator', function () {
    for (let r1, r2, y = 1583; y <= 9999; y++) {
      r1 = easterDay(y)
      r2 = otherCalc(y)

      // istanbul ignore next
      if (+r1 !== +r2) {
        expect().fail(`Expected ${dStr(r1)}, but instead have ${dStr(r2)}`)
      }
    }
  })

  it('comparison with a json table', function () {
    //
    // The JSON table contain dates from 1700 in UTC strings
    //
    for (let i = 0; i < jsonTable.length; i++) {
      const y = i + 1700
      const t = easterDay(y)
      const D = new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate()))

      // istanbul ignore next
      if (D.toJSON() !== jsonTable[i]) {
        expect().fail(`Expected ${dStr(D)}, but instead have ${dStr(D)}`)
      }
    }
  })

  it('must falls on Sunday, between March 22 and April 25', function () {
    for (let y = 100; y <= 9999; y++) {
      const D = easterDay(y)
      let err

      // istanbul ignore next
      if (D.getDay()) {
        err = 'Date is not a sunday:'

      } else {
        const d1 = new Date(D.getFullYear(), 2, 22)
        const d2 = new Date(D.getFullYear(), 3, 25)

        err = +D < +d1 ? 'Expected date bellow march 22, but have'
          :   +D > +d2 ? 'Expected date above april 25, but have' : ''
      }

      // istanbul ignore next
      if (err) {
        expect().fail(err + ' ' + dStr(D))
      }
    }
  })

  it('must return invalid date if year is not in 100..9999', function () {
    expect(+easterDay(1) + '').to.be('NaN')
    expect(+easterDay(10000) + '').to.be('NaN')
  })
})
