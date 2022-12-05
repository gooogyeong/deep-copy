const _ = require('lodash')

function deepCopy (target) {
  if (target === null || typeof target !== 'object') return target
  return Object.create(Object.getPrototypeOf(target), Object.getOwnPropertyDescriptors(target))
}

module.exports = deepCopy
