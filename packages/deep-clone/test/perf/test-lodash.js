/*
  Performance test for function to get own enumerable properties.
*/
/* eslint-disable no-console */
const Benchmark = require('benchmark')
const clonedeep = require('lodash.clonedeep')
const deepClone = require('../../index')

const map = new Map()
map.set('foo', /./)
map.set('bar', {})

const obj = {
  name: 'Deep clone test',
  arr: ['a', 'b', 'c'],
  obj: { a: 'a', b: {}, c: null },
  foo: 1,
  bar: 2,
  baz: 3,
  date: new Date(),
  map,
}

const test1 = function (o) {
  return !!clonedeep(o)
}

const test2 = function (o) {
  return !!deepClone(o)
}

const suite = new Benchmark.Suite()
suite
  .add('clonedeep', () => test1(obj))
  .add('deepClone', () => test2(obj))
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
