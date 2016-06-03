declare module 'pluralize' {
  function pluralize(word: string, count: number, inclusive?: boolean): string;
  module pluralize {
      export function addUncountableRule(rule: string): void;
      export function addPluralRule(rule: RegExp, replacer: string): void;
  }
  export = pluralize;
}
