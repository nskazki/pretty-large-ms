'use strict'

import parseMs from 'parse-large-ms'
import { inspect } from 'util'
import { isNumber, isString, isPlainObject,
  first, last, includes, get, values, defaults } from 'lodash'
import clearRequire = require('clear-require')

export interface IPrettyLargeMs {
  (ms: number|string, size?: number, replacers?: IReplacers, space?: string): string
}
// since pluralize uses a global set of rules
// I protect themselves and others from crossing rulesets
const loadPluralize = () => {
  clearRequire('pluralize')
  const pluralize = require('pluralize')
  clearRequire('pluralize')
  return pluralize
}

let pluralize = loadPluralize()

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
export interface IReplacers {
  millenniums?:  string,
  centuries?:    string,
  decades?:      string,
  years?:        string,
  months?:       string,
  days?:         string,
  hours?:        string,
  minutes?:      string,
  seconds?:      string,
  milliseconds?: string
}

export const longReplacers: IReplacers = {
  millenniums:  'millennium',
  centuries:    'century',
  decades:      'decade',
  years:        'year',
  months:       'month',
  days:         'day',
  hours:        'hour',
  minutes:      'minute',
  seconds:      'second',
  milliseconds: 'ms'
}

export const shortReplacers: IReplacers = {
  millenniums:  'MI',
  centuries:    'C',
  decades:      'D',
  years:        'Y',
  months:       'M',
  days:         'd',
  hours:        'h',
  minutes:      'm',
  seconds:      's',
  milliseconds: 'ms'
}

const toExtendRawReplacers: IReplacers = {
  millenniums:  'millennium',
  centuries:    'century',
  decades:      'decade',
  years:        'year',
  months:       'month',
  days:         'day',
  hours:        'hour',
  minutes:      'minute',
  seconds:      'second',
  milliseconds: 'millisecond'
}

// space
export const useSpace = ' '
export const notUseSpace = ''
function getSpace(replacers: Object): string {
  if (replacers === longReplacers) return useSpace
  if (replacers === shortReplacers) return notUseSpace
  else return useSpace
}

// addUncountableReplacer
let uncountableReplacers: Array<string> = []
export function addUncountableReplacers(replacer: string|Array<string>): IPrettyLargeMs {
  const replacers = isString(replacer)
    ? [ replacer ]
    : replacer

  replacers
    .filter(r => !includes(uncountableReplacers, r))
    .forEach(r => {
      uncountableReplacers.push(r)
      pluralize.addUncountableRule(r)
    })

  return module.exports
}

export function dropUncountableReplacers() {
  pluralize = loadPluralize()

  uncountableReplacers.length = 0
  addUncountableReplacers(values<string>(shortReplacers))
  pluralize.addPluralRule(/^millennium$/i, 'millenniums')

  return module.exports
}

addUncountableReplacers(values<string>(shortReplacers))
pluralize.addPluralRule(/^millennium$/i, 'millenniums')

// export
const prettyLargeMs: IPrettyLargeMs = function prettyLargeMs(
  ms, size = short,
  rawReplacers = longReplacers,
  space = getSpace(rawReplacers)) {

  // input valudation
  if (!isString(ms) && !isNumber(ms))
    throw new Error(`prettyLargeMs: ms must be a number|string! \n\t ms: ${inspect(ms)}`)
  if (!isNumber(size) || size < 1)
    throw new Error(`prettyLargeMs: size must be large then 1! \
      \n\t size: ${inspect(size)} \
      \n\t use one of default sizes: \
      \n\t   prettyLargeMs.compact=${compact} \
      \n\t   prettyLargeMs.short=${short} \
      \n\t   prettyLargeMs.long=${long} \
      \n\t   prettyLargeMs.verbose=${verbose}`)
  if (!isPlainObject(rawReplacers))
    throw new Error(`prettyLargeMs: replacers must be a plain object! \
      \n\t replacers: ${inspect(rawReplacers)} \
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
  const info: any = parseMs(ms)
  const replacers: IReplacers = defaults({}, rawReplacers, toExtendRawReplacers)

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
module.exports = prettyLargeMs
module.exports.default = prettyLargeMs
module.exports.addUncountableReplacers = addUncountableReplacers
module.exports.dropUncountableReplacers = dropUncountableReplacers

module.exports.compact = compact
module.exports.short   = short
module.exports.long    = long
module.exports.verbose = verbose

module.exports.longReplacers  = longReplacers
module.exports.shortReplacers = shortReplacers

module.exports.useSpace    = useSpace
module.exports.notUseSpace = notUseSpace
