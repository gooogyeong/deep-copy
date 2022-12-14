const { cloneDeep } = require('lodash')

function deepCopy (target) {
  if (target === null || typeof target !== 'object') return target
  const constructorName = Object.getPrototypeOf(target).constructor.name
  if (constructorName === 'Map') return new Map(target)
  if (constructorName === 'Set') return new Set(target)
  if (constructorName === 'Date') return new Date(target)
  return Object.create(Object.getPrototypeOf(target), Object.getOwnPropertyDescriptors(target))
}

module.exports = deepCopy
