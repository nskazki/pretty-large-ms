'use strict'

import parseMs from 'parse-large-ms'
import pluralize = require('pluralize')
import { inspect } from 'util'
import { isNumber, isString, isPlainObject,
  first, last, includes, get, extend, values } from 'lodash'

export interface IPrettyLargeMs {
  (ms: number|string, size?: number, replacers?: Object, space?: string): string
}

const bitOrder = [
  'millenniums',
  'centuries',
  'decades',
  'years',
  'months',
  'days',
  'hours',
  'minutes',
  'seconds',
  'milliseconds'
]

// size
export const compact = 1
export const short = 2
export const long = 4
export const verbose = bitOrder.length

// replacer
export const longReplacers = {
  'milliseconds': 'ms'
}

export const shortReplacers = {
  'millenniums':  'MI',
  'centuries':    'C',
  'decades':      'D',
  'years':        'Y',
  'months':       'M',
  'days':         'd',
  'hours':        'h',
  'minutes':      'm',
  'seconds':      's',
  'milliseconds': 'ms'
}

function getReplacers(size: number): Object {
  return size < long
    ? shortReplacers
    : longReplacers
}

// space
export const useSpace = ' '
export const notUseSpace = ''
function getSpace(size: number, replacers: Object): string {
  if (replacers === longReplacers) return useSpace
  if (replacers === shortReplacers) return notUseSpace

  return size < long
    ? notUseSpace
    : useSpace
}

// addUncountableReplacer
let uncountableReplacer: Array<string> = []
function addUncountableReplacer(replacer: string|Array<string>): IPrettyLargeMs {
  const replacers = isString(replacer)
    ? [ replacer ]
    : replacer

  replacers
    .filter(r => !includes(uncountableReplacer, r))
    .forEach(r => {
      uncountableReplacer.push(r)
      pluralize.addUncountableRule(r)
    })

  return module.exports
}

// export
const prettyLargeMs: IPrettyLargeMs = function prettyLargeMs(
  ms, size = short,
  replacers = getReplacers(size),
  space = getSpace(size, replacers)) {

  // input valudate
  if (!isString(ms) && !isNumber(ms))
    throw new Error(`prettyLargeMs: ms must be a number|string! \n\t ms: ${inspect(ms)}`)
  if (!isNumber(size))
    throw new Error(`prettyLargeMs: size must be a number! \
      \n\t size: ${inspect(size)} \
      \n\t use one of default sizes: \
      \n\t   prettyLargeMs.compact=${compact} \
      \n\t   prettyLargeMs.short=${short} \
      \n\t   prettyLargeMs.long=${long} \
      \n\t   prettyLargeMs.verbose=${verbose}`)
  if (!isPlainObject(replacers))
    throw new Error(`prettyLargeMs: replacers must be a plain object! \
      \n\t replacers: ${inspect(replacers)} \
      \n\t use one of default replacers: \
      \n\t   prettyLargeMs.longReplacers=${inspect(longReplacers)} \
      \n\t   prettyLargeMs.shortReplacers=${inspect(shortReplacers).replace(/,\n\s+/g, ' ')}`)
  if (!isString(space))
    throw new Error(`prettyLargeMs: space must be a string! \
      \n\t space: ${inspect(space)} \
      \n\t use one of default spaces: \
      \n\t   prettyLargeMs.useSpace=${inspect(useSpace)}, \
      \n\t   prettyLargeMs.notUseSpace=${inspect(notUseSpace)}`)

  // main
  addUncountableReplacer(values<string>(replacers))
  const info: any = parseMs(ms)

  const rawAllDfnBitNames = bitOrder.filter(bitName => {
    return info[bitName] !== 0
  })
  const allDfnBitNames = rawAllDfnBitNames.length !== 0
    ? rawAllDfnBitNames
    : [ last(bitOrder) ]

  const firstDfnBitName = first(allDfnBitNames)
  const firstDfnBitIndex = allDfnBitNames.indexOf(firstDfnBitName)

  const viewDfnBitNames = allDfnBitNames.slice(
    firstDfnBitIndex,
    firstDfnBitIndex + size)

  return viewDfnBitNames.map(bitName => {
    const bValue: number = info[bitName]
    const rName = get(replacers, bitName, bitName)
    const pName = pluralize(rName, bValue)
    const result = bValue.toString() + space + pName
    return result
  }).join(' ')
}

export default prettyLargeMs

// ES6 Modules default exports interop with CommonJS
extend(prettyLargeMs, module.exports)
module.exports = prettyLargeMs
