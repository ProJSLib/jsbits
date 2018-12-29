//#set _F = _REQUIRE(_PATH + '/index.js')
import $_NAME from '$_PACKAGE'

//#set _OBJ = { foo: 1, bar: 'bar', baz: { date: new Date() } }
let obj = {
  foo: 1,
  bar: 'bar',
  baz: { date: new Date() },
}
//#set _DUP = _F(_OBJ)
let clone = $_NAME(obj)

//#set _RES = _DUP.baz.date instanceof Date && _DUP.baz.date !== _OBJ.baz.date
console.log('Success?',
  clone.baz.date instanceof Date && clone.baz.date !== obj.baz.date)
// ⇒ $_RES

/*
  Using Symbol() as property name and the additional parameter
  to clone the non-enumerable property "abc".
*/
//#set _BAZ = Symbol()
//#set _OBJ = {foo: 'Foo', arr: [{ bar: 'Bar' }], [_BAZ]: 'Baz'}
const baz = Symbol()
obj = {
  foo: 'Foo',
  arr: [{ bar: 'Bar' }],
  [baz]: 'Baz',
}
//#set _X = Object.defineProperty(_OBJ, 'abc', {value: 'xyz', enumerable: false})
Object.defineProperty(obj, 'abc', {
  value: 'xyz',
  enumerable: false,
})
//#set _DUP = _F(_OBJ, true)
clone = $_NAME(obj, true)

//#set _RES = [JSON.stringify(_DUP), _DUP[_BAZ], _DUP.abc]
console.log(JSON.stringify(clone))  // ⇒ '$_RES.0'
console.log(clone[baz])             // ⇒ '$_RES.1'
console.log(clone.abc)              // ⇒ '$_RES.2'

console.dir(Object.getOwnPropertyDescriptor(clone, 'abc'))
// ⇒ { value: '$_DUP.abc',
//      writable: false,
//      enumerable: false,
//      configurable: false }
