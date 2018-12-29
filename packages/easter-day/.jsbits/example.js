//#set _F = _REQUIRE(_PATH + '/index.js')
import $_NAME from '$_PACKAGE'

//#set _D = 2019
//#set _RESULT = _F(_D).toDateString()
const easter = $_NAME($_D)
console.log(easter.toDateString()) // ⇒ $_RESULT
