//#set _F _REQUIRE(_PATH + '/index.js')
//#set _D (ds) => {var d=ds.split(/[-T: ]/); return new Date(d[0], d[1]-1, d[2], ~~d[3], ~~d[4], ~~d[5])}
//#set _R (dt) => isNaN(dt) ? 'NaN' : dt.toJSON(dt).replace('T',' ').slice(0, 19)
//#set _EXEC (ds,n) => _R(_F(_D(ds), n, true))
import $_NAME from '$_PACKAGE'

// Helper for creating a local date based on a string
const toDate = (ds) => {
  const dt = ds.split(/[-T: ]/)
  return new Date(dt[0], dt[1] - 1, dt[2], ~~dt[3], ~~dt[4], ~~dt[5])
}

// can increment above one year
//#if 0 // for linters
let $_PARAM1 = ''
let $_PARAM2 = 0
//#endif
//#set _PARAM1 = '2017-01-08'
//#set _PARAM2 = 15
//#set _RESULT _EXEC(_PARAM1, _PARAM2)
$_NAME(toDate('$_PARAM1'), $_PARAM2)  // ⇒ $_RESULT

// decrement works
//#set _PARAM1 = '2017-01-01'
//#set _PARAM2 = -1
//#set _RESULT _EXEC(_PARAM1, _PARAM2)
$_NAME(toDate('$_PARAM1'), $_PARAM2)  // ⇒ $_RESULT

// avoids day overflow
//#set _PARAM1 = '2017-01-31'
//#set _PARAM2 = 1
//#set _RESULT _EXEC(_PARAM1, _PARAM2)
$_NAME(toDate('$_PARAM1'), $_PARAM2)  // ⇒ $_RESULT

// can handle leap years
//#set _PARAM1 = '2016-01-31'
//#set _PARAM2 = 1
//#set _RESULT _EXEC(_PARAM1, _PARAM2)
$_NAME(toDate('$_PARAM1'), $_PARAM2)  // ⇒ $_RESULT

// with the third parameter, date is handled as UTC
//#set _PARAM1 = '2015-01-01T05:00:00Z'
//#set _PARAM2 = 1
//#set _RESULT _R(_F(new Date(_PARAM1), _PARAM2, true)) + 'Z'
$_NAME(new Date('$_PARAM1'), $_PARAM2, true)  // ⇒ $_RESULT

// it accepts numericals parameters
//#set _PARAM1 = 1541898143424
//#set _PARAM2 = 1
//#set _RESULT _R(_F(_PARAM1, _PARAM2))
$_NAME($_PARAM1, $_PARAM2)  // ⇒ $_RESULT

// returns an Invalid Date (i.e. NaN) for other types,
// to avoid undesired conversions to the current date.
//#set _RESULT _R(_F(false, _PARAM2))
$_NAME(false, $_PARAM2)  // ⇒ $_RESULT
