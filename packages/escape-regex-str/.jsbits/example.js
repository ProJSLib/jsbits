//#set _F = _REQUIRE(_PATH + '/index.js')
import $_NAME from '$_PACKAGE'

//#set _TEMPL 'Unicorn (white): $'
//#set _PARAM 'Unicorn (white): $1,000,000.00'
//#set _RESULT RegExp(_TEMPL).test(_PARAM)
const regexStr = $_NAME('$_TEMPL')
const regex = new RegExp(regexStr)

// without $_NAME, the test fails.
console.log(regex.test('$_PARAM')) // ⇒ $_RESULT
