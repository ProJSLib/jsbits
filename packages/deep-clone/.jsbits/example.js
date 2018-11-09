import $_NAME from '$_PACKAGE'

const objct = { foo: 1, bar: 'bar', baz: { date: new Date() } }
const clone = $_NAME(objct)

console.log('Success?',
  clone.baz.date instanceof Date && clone.baz.date !== objct.baz.date)
// ⇒ Seccess? true
