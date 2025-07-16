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
export function dasherize(str: string): string;

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
export function camelize(str: string): string;

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
export function classify(str: string): string;

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
export function underscore(str: string): string;

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
export function constantize(str: string): string;

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
export function capitalize(str: string): string;

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
export function decamelize(str: string): string;
