/*
  Performance test for function to get own enumerable properties.
*/
/* eslint-disable no-console */
const Benchmark = require('benchmark')

const hasOwnProps = (function () {
  const _hasOwn = Object.prototype.hasOwnProperty

  return function (obj) {
    for (const key in obj) {
      if (_hasOwn.call(obj, key)) {
        return true
      }
    }
    return false
  }
})()

const obj0 = {}
const obj1 = { foo: 1, bar: 2, baz: 3, [Symbol('@')]: 4 }
const obj2 = Object.create({ foo: 1, bar: 2, baz: 3 })
obj2.xyz = 4
const arr0 = new Array(1000).join('a')

const _keys = Object.keys
const test1 = function (obj) {
  return _keys(obj).length > 0
}

const test2 = function (obj) {
  return hasOwnProps(obj)
}

if (test1(obj0) || !test1(obj1) || !test1(obj2) || !test1(arr0)) {
  throw new Error('getOwnKeys1 wrong.')
}
if (test2(obj0) || !test2(obj1) || !test2(obj2) || !test2(arr0)) {
  throw new Error('getOwnKeys2 wrong.')
}

const testIt = function (obj) {
  const suite = new Benchmark.Suite()
  suite
    .add('getOwnKeys1', () => test1(obj))
    .add('getOwnKeys2', () => test2(obj))
    // Listeners
    .on('cycle', function (event) {
      const mem = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
      console.log(String(event.target), `Memory usage: ${mem} MiB`)
    })
    .on('error', function (event) {
      console.dir(event.target.error)
      suite.abort()
    })
    .on('complete', function () {
      console.log(`Fastest is ${this.filter('fastest').map('name')}`)
    })
    // run
    .run({ async: false })
}

console.log('Object without properties')
testIt(obj0)
console.log('Object with only own properties (3)')
testIt(obj1)
console.log('Object with various inherit and one own properties')
testIt(obj2)
console.log('Array with 1000 elements')
testIt(arr0)
