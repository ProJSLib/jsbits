//#set _F _REQUIRE(_PATH + '/index.js')
//#set _D (ds) => new Date(ds.length > 10 ? ds : `${ds}T00:00:00Z`)
//#set _R (dt) => isNaN(dt) ? 'NaN' : dt.toJSON(dt).replace('T',' ').slice(0, 19)
//#set _EXEC (ds,n) => _R(_F(_D(ds), n, true))
import $_NAME from '$_PACKAGE'

// can increment above one year
//#set _PARAM1 = '2017-01-08'
//#set _PARAM2 = 15
//#set _RESULT _EXEC(_PARAM1, _PARAM2)
$_NAME(new Date('$_PARAM1'), $_PARAM2)  // ⇒ $_RESULT

// decrement works
//#set _PARAM1 = '2017-01-01'
//#set _PARAM2 = -1
//#set _RESULT _EXEC(_PARAM1, _PARAM2)
$_NAME(new Date('$_PARAM1'), $_PARAM2)  // ⇒ $_RESULT

// avoids day overflow
//#set _PARAM1 = '2017-01-31'
//#set _PARAM2 = 1
//#set _RESULT _EXEC(_PARAM1, _PARAM2)
$_NAME(new Date('$_PARAM1'), $_PARAM2)  // ⇒ $_RESULT

// can handle leap years
//#set _PARAM1 = '2016-01-31'
//#set _PARAM2 = 1
//#set _RESULT _EXEC(_PARAM1, _PARAM2)
$_NAME(new Date('$_PARAM1'), $_PARAM2)  // ⇒ $_RESULT

// adjust the result to honors the Daylight Saving Time.
// (assuming Juny is has DST -1)
$_NAME(new Date('2015-01-01T05:00:00'), 5)  // ⇒ 2015-06-01 04:00:00

// with the third parameter, date is handled as UTC
//#set _PARAM1 = '2015-01-01T05:00:00Z'
//#set _PARAM2 = 1
//#set _RESULT _EXEC(_PARAM1, _PARAM2) + 'Z'
$_NAME(new Date('$_PARAM1'), $_PARAM2, true)  // ⇒ $_RESULT

// handle string as input (numbers as well)
//#set _PARAM1 = '2016-01-31'
//#set _PARAM2 = 1
//#set _RESULT _R(_F(_PARAM1, _PARAM2))
$_NAME('$_PARAM1', $_PARAM2)  // ⇒ $_RESULT

// returns an Invalid Date (i.e. NaN) if the input is falsy
// to avoid undesired conversions to the current date.
//#set _RESULT _R(_F(false, _PARAM2))
$_NAME(false, $_PARAM2)  // ⇒ $_RESULT
