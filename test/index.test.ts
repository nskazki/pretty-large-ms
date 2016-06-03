'use strict'

import pretty from '../src'
import { compact, short, long, verbose } from '../src'
import { shortReplacers, longReplacers } from '../src'
import { useSpace, notUseSpace } from '../src'
import { addUncountableReplacers, dropUncountableReplacers } from '../src'
import { clone } from 'lodash'
import assert = require('power-assert')

describe('#addUncountableReplacer', () => {
  it('add second: 16 minutes 40 second', () => {
    addUncountableReplacers('second')
    const act = pretty(1e6, short, longReplacers)
    const exp = '16 minutes 40 second'
    assert.equal(act, exp)
  })

  it('add minute: 16 minute 40 second ', () => {
    addUncountableReplacers('minute')
    const act = pretty(1e6, short, longReplacers)
    const exp = '16 minute 40 second'
    assert.equal(act, exp)
  })

  it('drop rules: 16 minutes 40 seconds', () => {
    dropUncountableReplacers()
    const act = pretty(1e6, short, longReplacers)
    const exp = '16 minutes 40 seconds'
    assert.equal(act, exp)
  })
})

describe('size: compact, replacer: longReplacers', () => {
  it('0 ms', () => {
    const act = pretty(0, compact, longReplacers)
    const exp = '0 ms'
    assert.equal(act, exp)
  })

  it('16 minutes', () => {
    const act = pretty(1e6, compact, longReplacers)
    const exp = '16 minutes'
    assert.equal(act, exp)
  })

  it('3 decades', () => {
    const act = pretty(1e12, compact, longReplacers)
    const exp = '3 decades'
    assert.equal(act, exp)
  })

  it('31709 millenniums', () => {
    const act = pretty(1e18, compact, longReplacers)
    const exp = '31709 millenniums'
    assert.equal(act, exp)
  })
})

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

  it('-10 ms', () => {
    const act = pretty(-1e1, short, longReplacers)
    const exp = '-10 ms'
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

  it('-1 second', () => {
    const act = pretty(-1e3, short, longReplacers)
    const exp = '-1 seconds'
    assert.equal(act, exp)
  })

  it('1 minute 40 seconds', () => {
    const act = pretty(1e5, short, longReplacers)
    const exp = '1 minute 40 seconds'
    assert.equal(act, exp)
  })

  it('-1 minute -40 seconds', () => {
    const act = pretty(-1e5, short, longReplacers)
    const exp = '-1 minutes -40 seconds'
    assert.equal(act, exp)
  })

  it('16 minutes 40 seconds', () => {
    const act = pretty(1e6, short, longReplacers)
    const exp = '16 minutes 40 seconds'
    assert.equal(act, exp)
  })

  it('-16 minutes -40 seconds', () => {
    const act = pretty(-1e6, short, longReplacers)
    const exp = '-16 minutes -40 seconds'
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

  it('3 years 2 months', () => {
    const act = pretty(1e11, short, longReplacers)
    const exp = '3 years 2 months'
    assert.equal(act, exp)
  })

  it('3 decades 1 year', () => {
    const act = pretty(1e12, short, longReplacers)
    const exp = '3 decades 1 year'
    assert.equal(act, exp)
  })

  it('3 centuries 1 decade', () => {
    const act = pretty(1e13, short, longReplacers)
    const exp = '3 centuries 1 decade'
    assert.equal(act, exp)
  })

  it('3 millenniums 1 century', () => {
    const act = pretty(1e14, short, longReplacers)
    const exp = '3 millenniums 1 century'
    assert.equal(act, exp)
  })

  it('31 millenniums 7 centuries', () => {
    const act = pretty(1e15, short, longReplacers)
    const exp = '31 millenniums 7 centuries'
    assert.equal(act, exp)
  })

  it('317 millenniums 9 decades', () => {
    const act = pretty(1e16, short, longReplacers)
    const exp = '317 millenniums 9 decades'
    assert.equal(act, exp)
  })
})

describe('size: long, replacer: longReplacers', () => {
  it('0 ms', () => {
    const act = pretty(0, long, longReplacers)
    const exp = '0 ms'
    assert.equal(act, exp)
  })

  it('1 minute 40 seconds', () => {
    const act = pretty(1e5, long, longReplacers)
    const exp = '1 minute 40 seconds'
    assert.equal(act, exp)
  })

  it('2 hours 46 minutes 40 seconds', () => {
    const act = pretty(1e7, long, longReplacers)
    const exp = '2 hours 46 minutes 40 seconds'
    assert.equal(act, exp)
  })

  it('3 months 25 days 17 hours 46 minutes', () => {
    const act = pretty(1e10, long, longReplacers)
    const exp = '3 months 25 days 17 hours 46 minutes'
    assert.equal(act, exp)
  })

  it('31 millenniums 7 centuries 9 years 9 months', () => {
    const act = pretty(1e15, long, longReplacers)
    const exp = '31 millenniums 7 centuries 9 years 9 months'
    assert.equal(act, exp)
  })
})

describe('size: verbose, replacer: longReplacers', () => {
  it('0 ms', () => {
    const act = pretty(0, verbose, longReplacers)
    const exp = '0 ms'
    assert.equal(act, exp)
  })

  it('1 minute 40 seconds', () => {
    const act = pretty(1e5, verbose, longReplacers)
    const exp = '1 minute 40 seconds'
    assert.equal(act, exp)
  })

  it('2 hours 46 minutes 40 seconds', () => {
    const act = pretty(1e7, verbose, longReplacers)
    const exp = '2 hours 46 minutes 40 seconds'
    assert.equal(act, exp)
  })

  it('3 months 25 days 17 hours 46 minutes 40 seconds', () => {
    const act = pretty(1e10, verbose, longReplacers)
    const exp = '3 months 25 days 17 hours 46 minutes 40 seconds'
    assert.equal(act, exp)
  })

  it('31 millenniums 7 centuries 9 years 9 months 19 days 1 hour 46 minutes 40 seconds', () => {
    const act = pretty(1e15, verbose, longReplacers)
    const exp = '31 millenniums 7 centuries 9 years 9 months 19 days 1 hour 46 minutes 40 seconds'
    assert.equal(act, exp)
  })

  it('31 millenniums 7 centuries 9 years 9 months 19 days 1 hour 46 minutes 40 seconds 1 ms', () => {
    const act = pretty(1e15 + 1, verbose, longReplacers)
    const exp = '31 millenniums 7 centuries 9 years 9 months 19 days 1 hour 46 minutes 40 seconds 1 ms'
    assert.equal(act, exp)
  })
})

describe('size: compact, replacer: shortReplacers', () => {
  it('0ms', () => {
    const act = pretty(0, compact, shortReplacers)
    const exp = '0ms'
    assert.equal(act, exp)
  })

  it('16m', () => {
    const act = pretty(1e6, compact, shortReplacers)
    const exp = '16m'
    assert.equal(act, exp)
  })

  it('3D', () => {
    const act = pretty(1e12, compact, shortReplacers)
    const exp = '3D'
    assert.equal(act, exp)
  })

  it('31709MI', () => {
    const act = pretty(1e18, compact, shortReplacers)
    const exp = '31709MI'
    assert.equal(act, exp)
  })
})

describe('size: short, replacer: shortReplacers', () => {
  it('0ms', () => {
    const act = pretty(0, short, shortReplacers)
    const exp = '0ms'
    assert.equal(act, exp)
  })

  it('0ms', () => {
    const act = pretty(-0, short, shortReplacers)
    const exp = '0ms'
    assert.equal(act, exp)
  })

  it('1ms', () => {
    const act = pretty(1, short, shortReplacers)
    const exp = '1ms'
    assert.equal(act, exp)
  })

  it('-1ms', () => {
    const act = pretty(-1, short, shortReplacers)
    const exp = '-1ms'
    assert.equal(act, exp)
  })

  it('-10ms', () => {
    const act = pretty(-1e1, short, shortReplacers)
    const exp = '-10ms'
    assert.equal(act, exp)
  })

  it('10ms', () => {
    const act = pretty(1e1, short, shortReplacers)
    const exp = '10ms'
    assert.equal(act, exp)
  })

  it('1s', () => {
    const act = pretty(1e3, short, shortReplacers)
    const exp = '1s'
    assert.equal(act, exp)
  })

  it('-1s', () => {
    const act = pretty(-1e3, short, shortReplacers)
    const exp = '-1s'
    assert.equal(act, exp)
  })

  it('1m 40s', () => {
    const act = pretty(1e5, short, shortReplacers)
    const exp = '1m 40s'
    assert.equal(act, exp)
  })

  it('-1m -40s', () => {
    const act = pretty(-1e5, short, shortReplacers)
    const exp = '-1m -40s'
    assert.equal(act, exp)
  })

  it('16m 40s', () => {
    const act = pretty(1e6, short, shortReplacers)
    const exp = '16m 40s'
    assert.equal(act, exp)
  })

  it('-16m -40s', () => {
    const act = pretty(-1e6, short, shortReplacers)
    const exp = '-16m -40s'
    assert.equal(act, exp)
  })

  it('2h 46m', () => {
    const act = pretty(1e7, short, shortReplacers)
    const exp = '2h 46m'
    assert.equal(act, exp)
  })

  it('11d 13h', () => {
    const act = pretty(1e9, short, shortReplacers)
    const exp = '11d 13h'
    assert.equal(act, exp)
  })

  it('3M 25d', () => {
    const act = pretty(1e10, short, shortReplacers)
    const exp = '3M 25d'
    assert.equal(act, exp)
  })

  it('3Y 2M', () => {
    const act = pretty(1e11, short, shortReplacers)
    const exp = '3Y 2M'
    assert.equal(act, exp)
  })

  it('3D 1Y', () => {
    const act = pretty(1e12, short, shortReplacers)
    const exp = '3D 1Y'
    assert.equal(act, exp)
  })

  it('3C 1D', () => {
    const act = pretty(1e13, short, shortReplacers)
    const exp = '3C 1D'
    assert.equal(act, exp)
  })

  it('3MI 1C', () => {
    const act = pretty(1e14, short, shortReplacers)
    const exp = '3MI 1C'
    assert.equal(act, exp)
  })

  it('31MI 7C', () => {
    const act = pretty(1e15, short, shortReplacers)
    const exp = '31MI 7C'
    assert.equal(act, exp)
  })

  it('317MI 9D', () => {
    const act = pretty(1e16, short, shortReplacers)
    const exp = '317MI 9D'
    assert.equal(act, exp)
  })
})

describe('size: long, replacer: shortReplacers', () => {
  it('0ms', () => {
    const act = pretty(0, long, shortReplacers)
    const exp = '0ms'
    assert.equal(act, exp)
  })

  it('1m 40s', () => {
    const act = pretty(1e5, long, shortReplacers)
    const exp = '1m 40s'
    assert.equal(act, exp)
  })

  it('2h 46m 40s', () => {
    const act = pretty(1e7, long, shortReplacers)
    const exp = '2h 46m 40s'
    assert.equal(act, exp)
  })

  it('3M 25d 17h 46m', () => {
    const act = pretty(1e10, long, shortReplacers)
    const exp = '3M 25d 17h 46m'
    assert.equal(act, exp)
  })

  it('31MI 7C 9Y 9M', () => {
    const act = pretty(1e15, long, shortReplacers)
    const exp = '31MI 7C 9Y 9M'
    assert.equal(act, exp)
  })
})

describe('size: verbose, replacer: shortReplacers', () => {
  it('0ms', () => {
    const act = pretty(0, verbose, shortReplacers)
    const exp = '0ms'
    assert.equal(act, exp)
  })

  it('1m 40s', () => {
    const act = pretty(1e5, verbose, shortReplacers)
    const exp = '1m 40s'
    assert.equal(act, exp)
  })

  it('2h 46m 40s', () => {
    const act = pretty(1e7, verbose, shortReplacers)
    const exp = '2h 46m 40s'
    assert.equal(act, exp)
  })

  it('3M 25d 17h 46m 40s', () => {
    const act = pretty(1e10, verbose, shortReplacers)
    const exp = '3M 25d 17h 46m 40s'
    assert.equal(act, exp)
  })

  it('31MI 7C 9Y 9M 19d 1h 46m 40s', () => {
    const act = pretty(1e15, verbose, shortReplacers)
    const exp = '31MI 7C 9Y 9M 19d 1h 46m 40s'
    assert.equal(act, exp)
  })

  it('31MI 7C 9Y 9M 19d 1h 46m 40s 1ms', () => {
    const act = pretty(1e15 + 1, verbose, shortReplacers)
    const exp = '31MI 7C 9Y 9M 19d 1h 46m 40s 1ms'
    assert.equal(act, exp)
  })
})

describe('space', () => {
  it('replacer=longReplacers, space=useSpace', () => {
    const act = pretty(1e8, short, longReplacers, useSpace)
    const exp = '1 day 3 hours'
    assert.equal(act, exp)
  })

  it('replacer=shortReplacers, space=useSpace', () => {
    const act = pretty(1e8, short, shortReplacers, useSpace)
    const exp = '1 d 3 h'
    assert.equal(act, exp)
  })

  it('replacer=shortReplacers, space=notUseSpace', () => {
    const act = pretty(1e8, short, shortReplacers, notUseSpace)
    const exp = '1d 3h'
    assert.equal(act, exp)
  })

  it('replacer=longReplacers, space=notUseSpace', () => {
    const act = pretty(1e8, short, longReplacers, notUseSpace)
    const exp = '1day 3hours'
    assert.equal(act, exp)
  })

  it('replacer=shortReplacers, space=userSpace', () => {
    const act = pretty(1e8, short, shortReplacers, '__')
    const exp = '1__d 3__h'
    assert.equal(act, exp)
  })

  it('replacer=longReplacers, space=userSpace', () => {
    const act = pretty(1e8, short, longReplacers, '__')
    const exp = '1__day 3__hours'
    assert.equal(act, exp)
  })
})

describe('replacer', () => {
  it('full custom replacer: 31 MILLENNIUMS 7 CENTURIES 9 YEARS 9 MONTHS 19 DAYS 1 HOUR 46 MINUTES 40 SECONDS 2 MILLISECONDS', () => {
    const act = pretty(1e15 + 2, verbose, {
      'millenniums':  'MILLENNIUM',
      'centuries':    'CENTURY',
      'decades':      'DECADE',
      'years':        'YEAR',
      'months':       'MONTH',
      'days':         'DAY',
      'hours':        'HOUR',
      'minutes':      'MINUTE',
      'seconds':      'SECOND',
      'milliseconds': 'MILLISECOND'
    })
    const exp = '31 MILLENNIUMS 7 CENTURIES 9 YEARS 9 MONTHS 19 DAYS 1 HOUR 46 MINUTES 40 SECONDS 2 MILLISECONDS'
    assert.equal(act, exp)
  })

  it('1/2 custom replacer: 31 MILLENNIUMS 7 CENTURIES 9 YEARS 9 MONTHS 19 days 1 hour 46 minutes 40 seconds 2 milliseconds', () => {
    const act = pretty(1e15 + 2, verbose, {
      'millenniums':  'MILLENNIUM',
      'centuries':    'CENTURIE',
      'decades':      'DECADE',
      'years':        'YEAR',
      'months':       'MONTH'
    })
    const exp = '31 MILLENNIUMS 7 CENTURIES 9 YEARS 9 MONTHS 19 days 1 hour 46 minutes 40 seconds 2 milliseconds'
    assert.equal(act, exp)
  })

  it('empty replacer: 31 millenniums 7 centuries 9 years 9 months 19 days 1 hour 46 minutes 40 seconds 2 milliseconds', () => {
    const act = pretty(1e15 + 2, verbose, {})
    const exp = '31 millenniums 7 centuries 9 years 9 months 19 days 1 hour 46 minutes 40 seconds 2 milliseconds'
    assert.equal(act, exp)
  })
})

describe('defaults', () => {
  it('size=short, replacer=longReplacers, space=useSpace', () => {
    const act = pretty(1e8)
    const exp = '1 day 3 hours'
    assert.equal(act, exp)
  })

  it('space=useSpace by replacer=longReplacers', () => {
    const act = pretty(1e8, short, longReplacers)
    const exp = '1 day 3 hours'
    assert.equal(act, exp)
  })

  it('space=notUseSpace by replacer=shortReplacers', () => {
    const act = pretty(1e8, short, shortReplacers)
    const exp = '1d 3h'
    assert.equal(act, exp)
  })

  it('space=useSpace by replacer=userReplacers', () => {
    const act = pretty(1e8, short, clone(shortReplacers))
    const exp = '1 d 3 h'
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
  it('wrong ms type', () => {
    assert.throws(() => pretty([] as any), '')
    assert.throws(() => pretty({} as any), '{}')
    assert.throws(() => pretty(/./ as any), '/./')
  })

  it('bad ms value (bad string)', () => {
    assert.throws(() => pretty(''))
    assert.throws(() => pretty('.'))
    assert.throws(() => pretty('e'), 'e')
    assert.throws(() => pretty('.e'), '.e')
    assert.throws(() => pretty('.e3'), '.e3')
    assert.throws(() => pretty('-123e'), '-123e')
    assert.throws(() => pretty('e123'), 'e123')
  })

  it('wrong size type', () => {
    assert.throws(() => pretty(0, [] as any), 'size: []')
    assert.throws(() => pretty(0, {} as any), 'size: {}')
    assert.throws(() => pretty(0, /./ as any), 'size: /./')
  })

  it('wrong size value', () => {
    assert.throws(() => pretty(0, 0), 'size: 0')
    assert.throws(() => pretty(0, 0.5), 'size: 0.5')
    assert.throws(() => pretty(0, -1), 'size: -1')
  })

  it('wrong replacer type', () => {
    assert.throws(() => pretty(0, 1, [] as any), 'replacer: []')
    assert.throws(() => pretty(0, 1, 0 as any), 'replacer: 0')
    assert.throws(() => pretty(0, 1, /./ as any), 'replacer: /./')
  })

  it('wrong space type', () => {
    assert.throws(() => pretty(0, 1, {}, [] as any), 'space: []')
    assert.throws(() => pretty(0, 1, {}, 0 as any), 'space: 0')
    assert.throws(() => pretty(0, 1, {}, /./ as any), 'space: /./')
  })
})
