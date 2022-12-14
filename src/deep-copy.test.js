const _ = require('lodash')
const deepCopy = require('./deep-copy.js')

class Human {
  isHuman = true
}

class Parent extends Human {
  constructor (children) {
    super()
    this.children = children
  }

  privateAge = 50

  get age () {
    return this.privateAge
  }

  set age (age) {
    this.privateAge = age
  }
}

const parent = new Parent([{ name: 'Charles', age: 10 }, { name: 'James', age: 12 }, { name: 'Lina', age: 7 }])
const copiedParent = deepCopy(parent)

test('should copy string', () => {
  const str = 'abc'
  expect(deepCopy(str)).toEqual(str)
})

test('should copy number', () => {
  const number = 2
  expect(number).toEqual(deepCopy(number))
})

test('should copy null', () => {
  expect(deepCopy(null)).toEqual(null)
})

test('should copy nested object', () => {
  expect(copiedParent).toEqual(parent)
})

test('should copy __proto__ object', () => {
  expect(copiedParent.__proto__).toEqual(parent.__proto__)
})

test('should copy properties of __proto__ object', () => {
  expect(copiedParent.isHuman).toEqual(parent.isHuman)
})

test('should copy own property descriptors', () => {
  expect(Object.getOwnPropertyDescriptors(copiedParent)).toEqual(Object.getOwnPropertyDescriptors(parent))
})

test('should copy getter', () => {
  expect(copiedParent.age).toEqual(parent.age)
})

test('should copy setter', () => {
  const newAge = 54
  copiedParent.age = newAge
  expect(copiedParent.age).toEqual(newAge)
})

test('should copy Map', () => {
  const map = new Map([
    ['name', 'Minkyung'],
    [function () {}, 'function'],
    ['a', {
      a: 1,
      b: 2,
      c: ['x', 'y', 'z'],
      d: { abc: 1 }
    }]])
  const copiedMap = deepCopy(map)
  expect(map).toEqual(copiedMap)
})

test('should copy Set', () => {
  const set = new Set([1, { a: 1, b: 2, c: ['x', 'y', 'z'], d: { abc: 1 } }, 3, 4])
  const copiedSet = deepCopy(set)
  expect(set).toEqual(copiedSet)
})

test('should copy Date', () => {
  const date = new Date()
  const copiedDate = deepCopy(date)
  expect(date).toEqual(copiedDate)
})

test('should copy Promise', () => {
  const makePromise = function (number) {
    return new Promise((resolve, reject) => {
      if (number === 100) reject('Invalid Number')
      else setTimeout(() => { resolve('Done!')}, 1000)
    })
  }
  const promise = makePromise(1)
  const  copiedPromise = deepCopy(promise)
  expect(promise).toEqual(copiedPromise)
})
