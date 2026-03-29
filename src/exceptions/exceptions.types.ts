/**
 * Type-safe map of exception codes for a module.
 * Always includes `not_found` plus any custom codes.
 * Values are literal string types like `'orders.not_found'`.
 */
export type ExceptionModule<P extends string, T extends readonly string[]> = {
	not_found: `${P}.not_found`
} & { [K in T[number]]: `${P}.${K}` }

/** Builder passed to the {@link createExceptions} factory function. */
export type ExceptionBuilder = {
	/**
	 * Creates exception codes for a module.
	 *
	 * @param prefix - Module prefix (e.g. `'orders'`). Each code becomes `'orders.<code>'`.
	 * @param codes - Additional exception codes beyond `not_found`.
	 */
	module: <const P extends string, const T extends readonly string[]>(
		prefix: P,
		codes: T,
	) => ExceptionModule<P, T>
}
