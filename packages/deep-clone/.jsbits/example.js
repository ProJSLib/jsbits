import $_NAME from '$_PACKAGE'

let obj = { foo: 1, bar: 'bar', baz: { date: new Date() } }
let clone = $_NAME(obj)

console.log('Success?',
  clone.baz.date instanceof Date && clone.baz.date !== obj.baz.date)
// ⇒ Success? true

/*
  Using the additional parameter
*/

let baz = Symbol()
obj = {
  foo: 'Foo',
  arr: [{ bar: 'Bar' }],
  [baz]: 'Baz',
}

Object.defineProperty(obj, 'abc', {
  value: 'xyz',
  enumerable: false,
})

clone = $_NAME(obj, true)

console.log(JSON.stringify(clone))  // ⇒ '{"foo":"Foo","arr":[{"bar":"Bar"}]}'
console.log(clone[baz])             // ⇒ 'Baz'
console.log(clone.abc)              // ⇒ 'xyz
