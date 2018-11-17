/// <reference path="../proto.d.ts" />

import expect = require('expect.js')
import infoDates = require('./info-dates')

const { dt, ut } = require('./helper')

describe('Date.prototype.addMonths', function () {

  require('../proto')

  it('works with the Date instance, as a setter.', function () {
    const date = new Date()
    const dref = date
    // silly test :)
    date.setMonth(0)
    expect(date).to.be(dref)
  })

  it('returns the Unix time for valid dates.', function () {
    const date = new Date()

    const result1 = date.addMonths(0)
    expect(result1).to.be(+date)
    const result2 = date.addUTCMonths(0)
    expect(result2).to.be(+date)
  })

  it('must increment X months with a positive integer', function () {
    const test = infoDates.incX

    for (let i = 0; i < test.length; i++) {
      const info = test[i]
      const date = dt(info[0])
      date.addMonths(info[1])
      expect(date).to.eql(dt(info[2]))
    }
  })

  it('must increment X months with a positive integer (UTC)', function () {
    const test = infoDates.incX

    for (let i = 0; i < test.length; i++) {
      const info = test[i]
      const date = ut(info[0])
      date.addUTCMonths(info[1])
      expect(date.toJSON()).to.be(ut(info[2]).toJSON())
    }
  })

  it('must decrement X months with a negative integer', function () {
    const test = infoDates.decX

    for (let i = 0; i < test.length; i++) {
      const info = test[i]
      const date = dt(info[0])
      date.addMonths(info[1])
      expect(date).to.eql(dt(info[2]))
    }
  })

  it('must decrement X months with a negative integer (UTC)', function () {
    const test = infoDates.decX

    for (let i = 0; i < test.length; i++) {
      const info = test[i]
      const date = ut(info[0])
      date.addUTCMonths(info[1])
      expect(date.toJSON()).to.be(ut(info[2]).toJSON())
    }
  })

  it('must preserve the correct time', function () {
    const test = infoDates.preserveTime

    for (let i = 0; i < test.length; i++) {
      const info = test[i]
      const date = dt(info[0])
      date.addMonths(info[1])
      expect(date).to.eql(dt(info[2]))
    }
  })

  it('must preserve the correct time (UTC)', function () {
    const test = infoDates.preserveTime

    for (let i = 0; i < test.length; i++) {
      const info = test[i]
      const date = ut(info[0])
      date.addUTCMonths(info[1])
      expect(date.toJSON()).to.be(ut(info[2]).toJSON())
    }
  })

  it('must limit to last day of the month is there\'s day overflow', function () {
    const test = infoDates.limitToLastDay

    for (let i = 0; i < test.length; i++) {
      const info = test[i]
      const date = dt(info[0])
      date.addMonths(info[1])
      expect(date).to.eql(dt(info[2]))
    }
  })

  it('must limit to last day of the month is there\'s day overflow (UTC)', function () {
    const test = infoDates.limitToLastDay

    for (let i = 0; i < test.length; i++) {
      const info = test[i]
      const date = ut(info[0])
      date.addUTCMonths(info[1])
      expect(date.toJSON()).to.be(ut(info[2]).toJSON())
    }
  })

  it('must handle leap years', function () {
    const test = infoDates.leapYears

    for (let i = 0; i < test.length; i++) {
      const info = test[i]
      const date = dt(info[0])
      date.addMonths(info[1])
      expect(date).to.eql(dt(info[2]))
    }
  })

  it('must handle leap years (UTC)', function () {
    const test = infoDates.leapYears

    for (let i = 0; i < test.length; i++) {
      const info = test[i]
      const date = ut(info[0])
      date.addUTCMonths(info[1])
      expect(date.toJSON()).to.be(ut(info[2]).toJSON())
    }
  })

  it('must return NaN for invalid dates (value remains NaN).', function () {
    const date = new Date(NaN)

    expect(date.addMonths(0) + '').to.be('NaN')
    expect(+date + '').to.be('NaN')
  })

  it('must throw w/TypeError if the date is not an instance of Date', function () {
    const dt = new Date()

    expect(() => {
      dt.addMonths.call({}, 0)
    }).to.throwError(TypeError)
    expect(() => {
      dt.addUTCMonths.call({}, 0)
    }).to.throwError(TypeError)

    expect(() => {
      dt.addMonths.call(true, 0)
    }).to.throwError(TypeError)
    expect(() => {
      dt.addUTCMonths.call(false, 0)
    }).to.throwError(TypeError)
  })

})
