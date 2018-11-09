//#set _F _REQUIRE(_PATH + '/index.js')
import $_NAME from '$_PACKAGE'

//#set _RESULT _F({})
$_NAME({}) // ⇒ $_RESULT
//#set _RESULT _F({ foo: 'bar' })
$_NAME({ foo: 'bar' }) // ⇒ $_RESULT
//#set _RESULT _F(null)
$_NAME(null) // ⇒ $_RESULT

//#set _RESULT _F([])
$_NAME([]) // ⇒ $_RESULT
//#set _RESULT _F([], true)
$_NAME([], true) // ⇒ $_RESULT
//#set _RESULT _F([0])
$_NAME([0]) // ⇒ $_RESULT

//#set _O = Object.defineProperty({}, 'foo', { value: 'bar' })
const obj = Object.defineProperty({}, 'foo', { value: 'bar' })
//#set _RESULT _F(_O)
$_NAME(obj) // ⇒ $_RESULT
//#set _RESULT _F(_O, true)
$_NAME(obj, true) // ⇒ $_RESULT

//#set _O = { foo: Symbol() }
const sym = { foo: Symbol() }
//#set _RESULT _F(_O)
$_NAME(sym) // ⇒ $_RESULT
//#set _RESULT _F(_O, true)
$_NAME(sym, true) // ⇒ $_RESULT

//#set _RESULT _F(new String(''))
$_NAME(new String('')) // ⇒ $_RESULT
//#set _RESULT _F(new String(''), true)
$_NAME(new String(''), true) // ⇒ $_RESULT
//#set _RESULT _F(new String('foo'))
$_NAME(new String('foo')) // ⇒ $_RESULT
// it has 0:'f', 1:'o', 2:'o'

//#set _RESULT _F(new RegExp('.', 'g'))
$_NAME(new RegExp('.', 'g')) // ⇒ $_RESULT
//#set _RESULT _F(new RegExp('.', 'g'), true)
$_NAME(new RegExp('.', 'g'), true) // ⇒ $_RESULT
//#set _RESULT _F(new Date())
$_NAME(new Date()) // ⇒ $_RESULT
//#set _RESULT _F(new Date(), true)
$_NAME(new Date(), true) // ⇒ $_RESULT

//#set _RESULT _F(true)
$_NAME(true) // ⇒ $_RESULT
//#set _RESULT _F('foo')
$_NAME('foo') // ⇒ $_RESULT
//#set _RESULT _F(1)
$_NAME(1) // ⇒ $_RESULT
//#set _RESULT _F(NaN)
$_NAME(NaN) // ⇒ $_RESULT
