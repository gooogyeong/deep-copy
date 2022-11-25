const _ = require('lodash')
const deepCopy = require('./deep-copy.js')

class Human {
  isHuman = true
}

class Parent {
  constructor(children) {
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
parent.__proto__ = new Human()
const copiedParent = deepCopy(parent)

test('should copy primitive value', () => {
  const str = 'abc'
  expect(deepCopy(str)).toEqual(str)
})

test('should copy null', () => {
  expect(deepCopy(null)).toEqual(null)
})

test('should copy nested object', () => {
  expect(copiedParent).toEqual(parent)
  // expect(_.cloneDeep(copiedParent)).toEqual(parent)
})

test('should copy __proto__ object', () => {
  expect(copiedParent.__proto__).toEqual(parent.__proto__)
  // expect(_.cloneDeep(copiedParent).__proto__).toEqual(parent.__proto__)
})

test('should copy properties of __proto__ object', () => {
  expect(copiedParent.isHuman).toEqual(parent.isHuman)
  // expect(_.cloneDeep(copiedParent).isHuman).toEqual(parent.isHuman)
})

test('should copy getter', () => {
  expect(copiedParent.age).toEqual(parent.age)
  // expect(_.cloneDeep(copiedParent).age).toEqual(parent.age)
})

test('should copy setter', () => {
  const newAge = 54
  copiedParent.age = newAge
  expect(copiedParent.age).toEqual(newAge)
  // expect(_.cloneDeep(parent)).toEqual(newAge)
})
