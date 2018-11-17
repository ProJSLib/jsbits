
import expect = require('expect.js')
import addMonths = require('..')
import infoDates = require('./info-dates')

const { dt, ut } = require('./helper')

describe('addMonths', function () {

  it('(first, test expect.js capabilities)', function () {
    const s1 = '2018-01-01T13:00:00'
    const dt = new Date(s1)
    const d2 = new Date(s1)
    expect(dt).to.eql(d2)
    expect(dt).not.to.be(d2)
    expect(dt).not.to.be(new Date(s1))
  })

  it('If count is evaluated as zero, returns a new Date instance with the same value as startdate', function () {
    const date = new Date()
    let result

    // @ts-ignore
    result = addMonths(date)
    expect(result).not.to.be(date)
    expect(result).to.eql(date)
    result = addMonths(date, 0)
    expect(result).not.to.be(date)
    expect(result).to.eql(date)
    result = addMonths(date, '0' as any)
    expect(result).not.to.be(date)
    expect(result).to.eql(date)
    result = addMonths(date, NaN)
    expect(result).not.to.be(date)
    expect(result).to.eql(date)
    result = addMonths(date, null as any)
    expect(result).not.to.be(date)
    expect(result).to.eql(date)
    result = addMonths(date, false as any)
    expect(result).not.to.be(date)
    expect(result).to.eql(date)
  })

  it('If date is invalid, returns a new Date instance with an invalid date', function () {
    const indate = new Date('@')  // Date object with empty content
    const result = addMonths(indate, 0)

    //expect(Object.prototype.toString.call(rdate)).to.be('[object Date]')
    expect(result).to.be.a(Date)
    expect(result).not.to.be(indate)
    expect(+result + '').to.be('NaN')
  })

  it('If date is null or undefined, returns a new invalid date', function () {
    let result: Date

    result = addMonths(null as any, 0)
    expect(result).to.be.a(Date)
    expect(+result + '').to.be('NaN')

    result = addMonths(undefined as any, 0)
    expect(result).to.be.a(Date)
    expect(+result + '').to.be('NaN')
  })

  it('if date is not a Date, string, or number, returns a new invalid Date', function () {
    expect(+addMonths({} as any, 0) + '').to.be('NaN')
    expect(+addMonths(true as any, 0) + '').to.be('NaN')
    expect(+addMonths(false as any, 0) + '').to.be('NaN')
  })

  it('if date is NaN, or results in NaN, returns a new invalid Date', function () {
    expect(+addMonths('X' as any, 0) + '').to.be('NaN')
    expect(+addMonths(NaN, 0) + '').to.be('NaN')
    expect(+addMonths(Infinity, 0) + '').to.be('NaN')
    expect(+addMonths(-Infinity, 0) + '').to.be('NaN')
  })

  it('if date is a number, convert it to a Date first', function () {
    const dnum = 1234567890
    const date = new Date(dnum)

    expect(addMonths(dnum, 0)).to.eql(new Date(+date))
  })

  it('if date is not a Date or a number, return an invalid date', function () {
    const dstr = '2015-02-01T00:00:00Z'

    expect(+addMonths(false as any, 0) + '').to.eql('NaN')
    expect(+addMonths(dstr as any, 0) + '').to.eql('NaN')
    expect(+addMonths(null as any, 0) + '').to.eql('NaN')
  })

  it('must increment X months with a positive integer', function () {
    const test = infoDates.incX

    for (let i = 0; i < test.length; i++) {
      const info = test[i]
      const result = addMonths(dt(info[0]), info[1])
      expect(result).to.eql(dt(info[2]))
    }
  })

  it('must increment X months with a positive integer (UTC)', function () {
    const test = infoDates.incX

    for (let i = 0; i < test.length; i++) {
      const info = test[i]
      const result = addMonths(ut(info[0]), info[1], true)
      expect(result.toJSON()).to.be(ut(info[2]).toJSON())
    }
  })

  it('must decrement X months with a negative integer', function () {
    const test = infoDates.decX

    for (let i = 0; i < test.length; i++) {
      const info = test[i]
      const result = addMonths(dt(info[0]), info[1])
      expect(result).to.eql(dt(info[2]))
    }
  })

  it('must decrement X months with a negative integer (UTC)', function () {
    const test = infoDates.decX

    for (let i = 0; i < test.length; i++) {
      const info = test[i]
      const result = addMonths(ut(info[0]), info[1], true)
      expect(result.toJSON()).to.be(ut(info[2]).toJSON())
    }
  })

  it('must preserve the correct time', function () {
    const test = infoDates.preserveTime

    for (let i = 0; i < test.length; i++) {
      const info = test[i]
      const result = addMonths(dt(info[0]), info[1])
      expect(result).to.eql(dt(info[2]))
    }
  })

  it('must preserve the correct time (UTC)', function () {
    const test = infoDates.preserveTime

    for (let i = 0; i < test.length; i++) {
      const info = test[i]
      const result = addMonths(ut(info[0]), info[1], true)
      expect(result.toJSON()).to.be(ut(info[2]).toJSON())
    }
  })

  it('must limit to last day of the month is there\'s day overflow', function () {
    const test = infoDates.limitToLastDay

    for (let i = 0; i < test.length; i++) {
      const info = test[i]
      const result = addMonths(dt(info[0]), info[1])
      expect(result).to.eql(dt(info[2]))
    }
  })

  it('must limit to last day of the month is there\'s day overflow (UTC)', function () {
    const test = infoDates.limitToLastDay

    for (let i = 0; i < test.length; i++) {
      const info = test[i]
      const result = addMonths(ut(info[0]), info[1], true)
      expect(result.toJSON()).to.be(ut(info[2]).toJSON())
    }
  })

  it('must handle leap years', function () {
    const test = infoDates.leapYears

    for (let i = 0; i < test.length; i++) {
      const info = test[i]
      const result = addMonths(dt(info[0]), info[1])
      expect(result).to.eql(dt(info[2]))
    }
  })

  it('must handle leap years (UTC)', function () {
    const test = infoDates.leapYears

    for (let i = 0; i < test.length; i++) {
      const info = test[i]
      const result = addMonths(ut(info[0]), info[1], true)
      expect(result.toJSON()).to.be(ut(info[2]).toJSON())
    }
  })

  it('must respect the time changes due to DST', function () {
    const start = new Date(2018, 0, 1)

    for (let h = 0; h < 4; h++) {
      for (let i = 1; i <= 12; i++) {
        const res = addMonths(start, i)
        const exp = new Date(+start)
        exp.setMonth(i)     // get the change from plain JS
        if (+res !== +exp || i === 1) {
          expect('' + res).to.be('' + exp)
        }
      }
      start.setHours(start.getHours() + 5)
    }
  })

  it('must respect the time changes due to DST (UTC)', function () {
    const start = new Date('2018-01-01T00:00:00Z')

    for (let h = 0; h < 4; h++) {
      for (let i = 1; i <= 12; i++) {
        const res = addMonths(start, i, true)
        const exp = new Date(+start)
        exp.setUTCMonth(i)     // get the change from plain JS
        if (+res !== +exp || i === 1) {
          expect('' + res).to.be('' + exp)
        }
      }
      start.setUTCHours(start.getUTCHours() + 5)
    }
  })

  it('test of the example', function () {
    /* eslint-disable indent */
    //@_EXAMPLE_BEGIN

    // can increment above one year
    expect(addMonths(dt('2017-01-08'), 15))
             .to.eql(dt('2018-04-08'))

    // decrement works
    expect(addMonths(dt('2017-01-01'), -1))
             .to.eql(dt('2016-12-01'))

    // avoids day overflow
    expect(addMonths(dt('2017-01-31'), 1))
             .to.eql(dt('2017-02-28'))

    // can handle leap years
    expect(addMonths(dt('2016-01-31'), 1))
             .to.eql(dt('2016-02-29'))

    // adjust the result to honors the Daylight Saving Time.
    // (assuming Juny is has DST -1)
    expect(addMonths(dt('2015-01-01T05:00:00'), 5))
             .to.eql(dt('2015-06-01T05:00:00'))

    // with the third parameter, can handle UTC dates
    expect(addMonths(ut('2015-01-01T05:00:00Z'), 5, true).toJSON())
              .to.be(ut('2015-06-01T05:00:00Z').toJSON())

    // returns new instances, even if the result has the same value
    expect(addMonths(dt('2016-01-31'), 0))
          .not.to.be(dt('2016-01-31'))

    // handle string as input (numbers as well)
    expect(addMonths(1541898143424, 0))
    .to.eql(new Date(1541898143424))

    // returns an Invalid Date (i.e. NaN) if the input is falsy
    // to avoid undesired conversions to the current date.
    expect(+addMonths('' as any, 2) + '').to.be('NaN')

    // the same for booleans, although the Date ctor coerces booleans
    // to 0 or 1 (Note the "as any", TS disallow this values).
    expect(+addMonths(true as any, 2) + '').to.be('NaN')
    //@_EXAMPLE_END
    /* eslint-enable indent */
  })

  describe('some egde cases taken from StackOverflow', function () {

    const stackOverflow: Array<[string, number, string]> = [
      ['2011-10-31T00:00:00', 1, '2011-11-30T00:00:00'],
      ['2015-03-31T00:00:00', 1, '2015-04-30T00:00:00'],
      ['2015-01-01T00:00:00', 3, '2015-04-01T00:00:00'],
      ['2016-01-31T00:00:00', 1, '2016-02-29T00:00:00'],
      ['2017-01-31T00:00:00', 1, '2017-02-28T00:00:00'],
    ]

    it('with the current timezone (whatever this be)', function () {
      const test = stackOverflow

      for (let i = 0; i < test.length; i++) {
        const info = test[i]
        const date = dt(info[0])
        const result = addMonths(date, info[1])
        expect(result).to.eql(dt(info[2]))
      }
    })

    it('with the GMT+0 timezone (UTC)', function () {
      const test = stackOverflow

      for (let i = 0; i < test.length; i++) {
        const info = test[i]
        const result = addMonths(ut(info[0]), info[1], true)
        expect(result.toJSON()).to.be(ut(info[2]).toJSON())
      }
    })
  })

})

