const _ = require('lodash')

function copyArray (target) {
  const { length } = target
  const result = new target.constructor(length)
  for (let i = 0; i < length; i++) {
    result[i] = target[i]
  }
  return result
}

function deepCopy (target) {
  if (target === null || typeof target !== 'object') return target
  let result = Object.create(target.__proto__)
  for (const prop in target) {
    if (target.hasOwnProperty(prop)) {
      if (Array.isArray(target[prop])) result[prop] = copyArray(target[prop])
      else result[prop] = deepCopy(target[prop])
    }
  }
  return result
}

module.exports = deepCopy
