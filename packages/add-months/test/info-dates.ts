export = (function () {

  const infoDates: { [k: string]: Array<[string, number, string]> } = {
    incX: [
      ['2017-01-01',  1, '2017-02-01'],
      ['2017-01-01', 12, '2018-01-01'],
      ['2017-01-01', 25, '2019-02-01'],
      ['9999-12-31', 12, '10000-12-31'],
      ['^10000,12,31,1,40,15', 2400, '^10200,12,31,1,40,15'],
    ],
    decX: [
      ['2017-01-01',  -1, '2016-12-01'],
      ['2017-01-01', -12, '2016-01-01'],
      ['2017-01-01', -25, '2014-12-01'],
      ['Feb 1 100 12:00:00 GMT-0000',  -2400, '^-100,2,1,12'],
    ],
    preserveTime: [
      ['2017-01-01 11:59:59.999', -1, '2016-12-01 11:59:59.999'],
      ['2017-01-01 00:00:01.000', -1, '2016-12-01 00:00:01.000'],
      ['Jan 7 2017 23:59:59 GMT-0500',  12, 'Jan 7 2018 23:59:59 GMT-0500'],
      ['Jan 7 2017 23:59:00 GMT-0500',  12, 'Jan 7 2018 23:59:00 GMT-0500'],
      ['Jan 7 2017 23:59:59 GMT-1130',  12, 'Jan 7 2018 23:59:59 GMT-1130'],
      ['Jan 7 2017 23:59:00 GMT-1130',  12, 'Jan 7 2018 23:59:00 GMT-1130'],
      ['Jan 7 2017 23:59:59 GMT+1130', -12, 'Jan 7 2016 23:59:59 GMT+1130'],
      ['Jan 7 2017 23:59:00 GMT+1130', -12, 'Jan 7 2016 23:59:00 GMT+1130'],
      ['Jan 7 2017 23:59:00 GMT-0500', -12, 'Jan 7 2016 23:59:00 GMT-0500'],
      ['Jan 7 2017 23:59:00 GMT-0500', -25, 'Dec 7 2014 23:59:00 GMT-0500'],
      ['Jan 7 2017 23:59:59 GMT-1130', -25, 'Dec 7 2014 23:59:59 GMT-1130'],
      ['Jan 7 2017 23:59:59 GMT+1130', -25, 'Dec 7 2014 23:59:59 GMT+1130'],
      ['Jan 7 2017 23:59:00 GMT-1100', -25, 'Dec 7 2014 23:59:00 GMT-1100'],
    ],
    limitToLastDay: [
      ['2017-01-31',  1, '2017-02-28'],
      ['2016-10-31',  1, '2016-11-30'],
      ['2018-03-31', -1, '2018-02-28'],
      ['2018-07-31', -1, '2018-06-30'],
    ],
    leapYears: [
      // 2016 was a leap year
      ['2016-01-31',  1, '2016-02-29'],
      ['2016-02-29', 12, '2017-02-28'],
      ['2016-01-31 00:00:00',  1, '2016-02-29 00:00:00'],
      ['2016-01-31 12:00:00',  1, '2016-02-29 12:00:00'],
      ['2016-01-31 23:59:59',  1, '2016-02-29 23:59:59'],
      ['2015-01-31 23:59:59', 13, '2016-02-29 23:59:59'],
      ['2016-03-31 00:00:00', -1, '2016-02-29 00:00:00'],
      ['2016-03-31 12:00:00', -1, '2016-02-29 12:00:00'],
      ['2016-03-31 23:59:59', -1, '2016-02-29 23:59:59'],
      ['2017-03-31 23:59:59', -13, '2016-02-29 23:59:59'],
      ['2016-01-31 00:00:00',  1, '2016-02-29 00:00:00'],
      ['2021-03-31 00:00:00', -1, '2021-02-28 00:00:00'],
    ],
  }

  // for browsers without support for non-common dates (PhantomJS)
  // istanbul ignore next
  if (isNaN(+new Date(10200, 11, 31))) {
    infoDates.incX.pop()
    infoDates.decX.pop()
  }

  return infoDates

})()
