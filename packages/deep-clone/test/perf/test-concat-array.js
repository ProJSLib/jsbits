/*
  Performance test for function to get own enumerable properties.
*/
/* eslint-disable no-console */
const Benchmark = require('benchmark')

const test2 = function (a1, a2) {
  const len = a1.length
  for (let i = 0; i < a2.length; i++) {
    a1[len + i] = a2[i]
  }
  return a1
}

const test3 = function (a1, a2) {
  for (let i = 0; i < a2.length; i++) {
    a1.push(a2[i])
  }
  return a1
}

const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const arr2 = [1, 2]

const ARR = []
const len = arr1.concat(arr2).length
if (test2(ARR.concat(arr1), arr2).length !== len) {
  throw Error(`test2 returns ${test2(arr1, arr2).length}, but ${len} is expected.`)
}
if (test3(ARR.concat(arr1), arr2).length !== len) {
  throw Error(`test3 returns ${test3(arr1, arr2).length}, but ${len} is expected.`)
}

const suite = new Benchmark.Suite()
suite
  .add('Array.concat', () => [1, 2, 3, 4, 5, 7, 8, 9].concat(arr2))
  .add('copy w/index', () => test2([1, 2, 3, 4, 5, 7, 8, 9], arr2))
  .add('copy w/push ', () => test3([1, 2, 3, 4, 5, 7, 8, 9], arr2))
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
