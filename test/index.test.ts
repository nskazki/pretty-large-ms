'use strict'

import pretty, { short, longReplacers } from '../src'
import assert = require('power-assert')

describe('size: short, replacer: longReplacers', () => {
  it('0 ms', () => {
    const act = pretty(0, short, longReplacers)
    const exp = '0 ms'
    assert.equal(act, exp)
  })

  it('0 ms', () => {
    const act = pretty(-0, short, longReplacers)
    const exp = '0 ms'
    assert.equal(act, exp)
  })

  it('1 ms', () => {
    const act = pretty(1, short, longReplacers)
    const exp = '1 ms'
    assert.equal(act, exp)
  })

  it('-1 ms', () => {
    const act = pretty(-1, short, longReplacers)
    const exp = '-1 ms'
    assert.equal(act, exp)
  })

  it('10 ms', () => {
    const act = pretty(1e1, short, longReplacers)
    const exp = '10 ms'
    assert.equal(act, exp)
  })

  it('1 second', () => {
    const act = pretty(1e3, short, longReplacers)
    const exp = '1 second'
    assert.equal(act, exp)
  })

  it('1 minute 40 seconds', () => {
    const act = pretty(1e5, short, longReplacers)
    const exp = '1 minute 40 seconds'
    assert.equal(act, exp)
  })

  it('2 hours 46 minutes', () => {
    const act = pretty(1e7, short, longReplacers)
    const exp = '2 hours 46 minutes'
    assert.equal(act, exp)
  })

  it('11 days 13 hours', () => {
    const act = pretty(1e9, short, longReplacers)
    const exp = '11 days 13 hours'
    assert.equal(act, exp)
  })

  it('3 months 25 days', () => {
    const act = pretty(1e10, short, longReplacers)
    const exp = '3 months 25 days'
    assert.equal(act, exp)
  })

  it('-16 minutes -40 seconds', () => {
    const act = pretty(-1e6, short, longReplacers)
    const exp = '-16 minutes -40 seconds'
    assert.equal(act, exp)
  })
})

describe('string input', () => {
  it('- 1.234e5', () => {
    const act = pretty(-1.234e5, short, longReplacers)
    const exp = '-2 minutes -3 seconds'
    assert.equal(act, exp)
  })
})

describe('throws', () => {
  it('wrong type', () => {
    assert.throws(() => pretty([] as any), '')
    assert.throws(() => pretty({} as any), '{}')
    assert.throws(() => pretty(/./ as any), '/./')
  })

  it('bad string', () => {
    assert.throws(() => pretty(''))
    assert.throws(() => pretty('.'))
    assert.throws(() => pretty('e'), 'e')
    assert.throws(() => pretty('.e'), '.e')
    assert.throws(() => pretty('.e3'), '.e3')
    assert.throws(() => pretty('-123e'), '-123e')
    assert.throws(() => pretty('e123'), 'e123')
  })
})
