# pretty-large-ms

[![Build Status](https://travis-ci.org/nskazki/pretty-large-ms.svg)](https://travis-ci.org/nskazki/pretty-large-ms)
[![Coverage Status](https://coveralls.io/repos/github/nskazki/pretty-large-ms/badge.svg?branch=master)](https://coveralls.io/github/nskazki/pretty-large-ms)

>This module is written on `typescript`, and contains the `.d.ts` file.
><br>If you write on `typescript`: just use it in your project and definitions will be automatically uploaded.

```
npm i -S pretty-large-ms
```

## About

This module converts large milliseconds to a human readable string up to the millenniums.
<br>Like [pretty-ms](https://github.com/sindresorhus/pretty-ms) but with support for large values.

## Exports

```ts
export function prettyLargeMs(
  ms: number|string,
  size?: number,
  replacers?: IReplacers,
  space?: string): string;

export function addUncountableReplacers(replacer: string|Array<string>): void;
export function dropUncountableReplacers(): void;

export const compact = 1;
export const short   = 2;
export const long    = 4;
export const verbose = 10;

export const longReplacers  = { /*...*/ };
export const shortReplacers = { /*...*/ };

export const useSpace    = ' ';
export const notUseSpace = '';
```

## Features

```js
const pretty = require('pretty-large-ms')
const assert = require('assert')

// About DEFAULTS args:
//
//   size     = pretty.short
//   replacer = pretty.longReplacers
//   space    = pretty.useSpace
assert.equal(pretty(1e8), '1 day 3 hours')
assert.equal(
  pretty(1e8, pretty.short, pretty.longReplacers, pretty.useSpace),
  pretty(1e8))

// About SIZE options:
//
//   compact = 1
//   short   = 2
//   long    = 4
//   verbose = 10 (ms..millennium)
// also, you can specify some custom size >= 1

// About REPLACERS:
//
//   shortReplacers = { millenniums: 'MI', centuries: 'C', decades: 'D',
//                     years: 'Y',  months: 'M', days: 'd', hours: 'h',
//                     minutes: 'm', seconds: 's', milliseconds: 'ms' }
//   longReplacers  = { millenniums: 'millennium', centuries: 'century',
//                      ... seconds: 'second', milliseconds: 'ms' }
const shortAct = pretty(1e8, pretty.short, pretty.shortReplacers)
const longAct = pretty(1e8, pretty.short, pretty.longReplacers)
assert.equal(shortAct, '1d 3h')
assert.equal(longAct, '1 day 3 hours')

// also you can specify some custom map
const myRer = { minutes: 'MIN', seconds: 'SEC' }
const short = pretty.short
assert.equal(pretty(1e6, short, myRer), '16 MINS 40 SECS')

// use #addUncountableReplacers (note: use single format of names!)
// if you want to make some of names are uncountable
pretty.addUncountableReplacers([ 'MIN', 'SEC' ])
assert.equal(pretty(1e6, short, myRer), '16 MIN 40 SEC')

// use #dropUncountableReplacers
// to drop all custom uncountable rules
pretty.dropUncountableReplacers()
assert.equal(pretty(1e6, short, myRer), '16 MINS 40 SECS')

// last note about custom replacers:
// if in your map of replacers something is missing,
// it will be complemented by default map.
const actByEmptyReplacers = pretty(1e15 + 1, pretty.verbose, {})
const expByEmptyReplacers =
  '31 millenniums 7 centuries 9 years 9 months ' +
  '19 days 1 hour 46 minutes 40 seconds 1 millisecond'
assert.equal(actByEmptyReplacers, expByEmptyReplacers)

// About SPACE options:
//
//   useSpace = ' '
//   notUseSpace = ''
// if you use longReplacers, default space = useSpace
// if you use shortReplacers, default space = notUseSpace
// if you use custom replacers, default space = useSpace
assert.equal(
  pretty(1e8, pretty.short, pretty.longReplacers, pretty.notUseSpace),
 '1day 3hours')
// also you can use custom space
assert.equal(
  pretty(1e8, pretty.short, pretty.longReplacers, '__'),
 '1__day 3__hours')

// About MS (first argument):
//
// it may be negative or positive number
// or string compatible with https://github.com/nskazki/str2num
assert.equal(pretty(1e9), '11 days 13 hours')
assert.equal(pretty(-1e9), '-11 days -13 hours')
assert.equal(pretty('-1e9'), '-11 days -13 hours')
assert.equal(pretty('-1 000,000,000'), '-11 days -13 hours')

// Last, about module missuse
assert.throws(() => pretty('-123e'), 'string not compatible with str2num')
assert.throws(() => pretty(0, 0), 'size < 1')
assert.throws(() => pretty(0, 1, []), 'wrong type of replacer')
assert.throws(() => pretty(0, 1, {}, []), 'wrong type of space')
```
