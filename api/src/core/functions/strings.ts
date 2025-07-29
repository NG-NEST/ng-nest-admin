/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

const STRING_DASHERIZE_REGEXP = /[ _]/g;
const STRING_DECAMELIZE_REGEXP = /([a-z\d])([A-Z])/g;
const STRING_CAMELIZE_REGEXP = /(-|_|\.|\s)+(.)?/g;
const STRING_UNDERSCORE_REGEXP_1 = /([a-z\d])([A-Z]+)/g;
const STRING_UNDERSCORE_REGEXP_2 = /-|\s+/g;

/**
 * Converts a camelized string into all lower case separated by underscores.
 *
 * @example
 * ```typescript
 * decamelize('innerHTML');         // 'inner_html'
 * decamelize('action_name');       // 'action_name'
 * decamelize('css-class-name');    // 'css-class-name'
 * decamelize('my favorite items'); // 'my favorite items'
 * ```
 *
 * @param {string} str - The string to decamelize.
 * @returns {string} The decamelized string.
 */
export function decamelize(str: string): string {
  if (!str) return '';
  return str.replace(STRING_DECAMELIZE_REGEXP, '$1_$2').toLowerCase();
}

/**
 * Replaces underscores, spaces, or camelCase with dashes.
 *
 * @example
 * ```typescript
 * dasherize('innerHTML');         // 'inner-html'
 * dasherize('action_name');       // 'action-name'
 * dasherize('css-class-name');    // 'css-class-name'
 * dasherize('my favorite items'); // 'my-favorite-items'
 * ```
 *
 * @param {string} str - The string to dasherize.
 * @returns {string} The dasherized string.
 */
export function dasherize(str: string): string {
  if (!str) return '';
  return decamelize(str).replace(STRING_DASHERIZE_REGEXP, '-');
}

/**
 * Returns the lowerCamelCase form of a string.
 *
 * @example
 * ```typescript
 * camelize('innerHTML');          // 'innerHTML'
 * camelize('action_name');        // 'actionName'
 * camelize('css-class-name');     // 'cssClassName'
 * camelize('my favorite items');  // 'myFavoriteItems'
 * camelize('My Favorite Items');  // 'myFavoriteItems'
 * ```
 *
 * @param {string} str - The string to camelize.
 * @returns {string} The camelized string.
 */
export function camelize(str: string): string {
  if (!str) return '';
  return str
    .replace(STRING_CAMELIZE_REGEXP, (_match: string, _separator: string, chr: string) => {
      return chr ? chr.toUpperCase() : '';
    })
    .replace(/^([A-Z])/, (match: string) => match.toLowerCase());
}

/**
 * Returns the UpperCamelCase form of a string.
 *
 * @example
 * ```typescript
 * classify('innerHTML');          // 'InnerHTML'
 * classify('action_name');        // 'ActionName'
 * classify('css-class-name');     // 'CssClassName'
 * classify('my favorite items');  // 'MyFavoriteItems'
 * classify('app.component');      // 'AppComponent'
 * ```
 *
 * @param {string} str - The string to classify.
 * @returns {string} The classified string.
 */
export function classify(str: string): string {
  if (!str) return '';
  return str
    .split('.')
    .map((part) => capitalize(camelize(part)))
    .join('');
}

/**
 * More general than decamelize. Returns the lower_case_and_underscored
 * form of a string.
 *
 * @example
 * ```typescript
 * underscore('innerHTML');          // 'inner_html'
 * underscore('action_name');        // 'action_name'
 * underscore('css-class-name');     // 'css_class_name'
 * underscore('my favorite items');  // 'my_favorite_items'
 * ```
 *
 * @param {string} str - The string to underscore.
 * @returns {string} The underscored string.
 */
export function underscore(str: string): string {
  if (!str) return '';
  return str
    .replace(STRING_UNDERSCORE_REGEXP_1, '$1_$2')
    .replace(STRING_UNDERSCORE_REGEXP_2, '_')
    .toLowerCase();
}

/**
 * Replaces dashes, underscores, or spaces with underscores and converts the string to uppercase.
 *
 * @example
 * ```typescript
 * constantize('css-name');          // 'CSS_NAME'
 * constantize('action_name');       // 'ACTION_NAME'
 * constantize('my favorite items'); // 'MY_FAVORITE_ITEMS'
 * ```
 *
 * @param {string} str - The string to constantize.
 * @returns {string} The constantized string.
 */
export function constantize(str: string): string {
  if (!str) return '';
  return underscore(str).toUpperCase();
}

/**
 * Returns the Capitalized form of a string
 *
 * @example
 * ```typescript
 * capitalize('innerHTML');         // 'InnerHTML'
 * capitalize('action_name');       // 'Action_name'
 * capitalize('css-class-name');    // 'Css-class-name'
 * capitalize('my favorite items'); // 'My favorite items'
 * ```
 *
 * @param {string} str - The string to capitalize.
 * @returns {string} The capitalized string.
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Calculate the levenshtein distance of two strings.
 * See https://en.wikipedia.org/wiki/Levenshtein_distance.
 * Based off https://gist.github.com/andrei-m/982927 (for using the faster dynamic programming version).
 *
 * @param {string} a - String a.
 * @param {string} b - String b.
 * @returns {number} A number that represents the distance between the two strings. The greater the number the more distant the strings are from each other.
 */
export function levenshtein(a: string, b: string): number {
  if (a.length === 0) {
    return b.length;
  }
  if (b.length === 0) {
    return a.length;
  }

  const matrix: number[][] = [];

  // increment along the first column of each row
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  // increment each column in the first row
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j] + 1, // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 *
 *  * @example
 * ```typescript
 * pluralize('child');      // 'children' (irregular plural)
 * pluralize('box');        // 'boxes' (ends with x)
 * pluralize('city');       // 'cities' (ends with consonant + y)
 * pluralize('knife');      // 'knives' (ends with fe)
 * pluralize('potato');     // 'potatoes' (special o ending)
 * pluralize('criterion');  // 'criteria' (Greek origin)
 * pluralize('cat');        // 'cats' (default rule)
 * ```
 *
 * @param word
 * @returns
 */
export function pluralize(word: string): string {
  const irregularPlurals: { [key: string]: string } = {
    child: 'children',
    person: 'people',
    man: 'men',
    woman: 'women',
    tooth: 'teeth',
    foot: 'feet',
    mouse: 'mice',
    goose: 'geese',
    ox: 'oxen',
    die: 'dice',
    louse: 'lice',
    cactus: 'cacti',
    fungus: 'fungi',
    nucleus: 'nuclei',
    syllabus: 'syllabi',
    focus: 'foci',
    radius: 'radii',
    analysis: 'analyses',
    basis: 'bases',
    crisis: 'crises',
    thesis: 'theses',
    phenomenon: 'phenomena',
    criterion: 'criteria',
    datum: 'data',
    medium: 'media',
    bacterium: 'bacteria',
  };

  const oEsEndings = [
    'potato',
    'tomato',
    'hero',
    'echo',
    'veto',
    'embargo',
    'torpedo',
    'domino',
    'mosquito',
    'volcano',
    'tornado',
    'buffalo',
    'mango',
  ];

  const fExceptions = [
    'roof',
    'belief',
    'chef',
    'chief',
    'proof',
    'reef',
    'giraffe',
    'cafe',
    'safe',
    'cliff',
    'dwarf',
    'handkerchief',
    'turf',
  ];

  const words = word.split(/(?=[A-Z])|[-_\s]/);
  const lastWord = words[words.length - 1].toLowerCase();

  if (words.length > 1) {
    const prefix = word.slice(0, word.length - lastWord.length);
    return prefix + pluralize(lastWord);
  }

  if (!word) return '';

  if (irregularPlurals[word]) {
    return irregularPlurals[word];
  }

  if (/(s|x|z|ch|sh)$/i.test(word)) {
    return word + 'es';
  }

  if (/[^aeiou]y$/i.test(word)) {
    return word.slice(0, -1) + 'ies';
  }

  if (word.endsWith('f') && !fExceptions.includes(word)) {
    return word.slice(0, -1) + 'ves';
  }
  if (word.endsWith('fe') && !fExceptions.includes(word)) {
    return word.slice(0, -2) + 'ves';
  }

  if (word.endsWith('o') && oEsEndings.includes(word)) {
    return word + 'es';
  }

  if (word.endsWith('us')) {
    return word.slice(0, -2) + 'i';
  }

  if (word.endsWith('is')) {
    return word.slice(0, -2) + 'es';
  }

  if (word.endsWith('on')) {
    return word.slice(0, -2) + 'a';
  }

  return word + 's';
}

export function equals(str1: string, str2: string) {
  return str1 === str2;
}
