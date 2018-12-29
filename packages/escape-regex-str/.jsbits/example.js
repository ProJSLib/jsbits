//#set _F = _REQUIRE(_PATH + '/index.js')
import $_NAME from '$_PACKAGE'

//#set _TEMPL = 'Unicorn (white): $'
//#set _PARAM = 'Unicorn (white): $1.00'
const sourceStr = '$_TEMPL'

// without $_NAME, the test fails.
//#set _RESULT = RegExp(_TEMPL).test(_PARAM)
const regex1 = new RegExp(sourceStr)
console.log(regex1.test('$_PARAM')) // ⇒ $_RESULT

// with $_NAME, it succeeds.
//#set _RESULT = RegExp(_F(_TEMPL)).test(_PARAM)
const regex2 = new RegExp($_NAME(sourceStr))
console.log(regex2.test('$_PARAM')) // ⇒ $_RESULT
