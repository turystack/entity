import type { ExceptionBuilder, ExceptionModule } from './exceptions.types.js'

/**
 * Creates a type-safe exception code registry.
 *
 * Each module gets a `not_found` code by default plus any custom codes.
 * Codes are prefixed with the module name (e.g. `'orders.not_found'`).
 *
 * @example
 * ```ts
 * import { createExceptions } from '@/shared/exceptions'
 *
 * const Exceptions = createExceptions((e) => ({
 *   orders: e.module('orders', ['already_paid', 'limit_exceeded'] as const),
 *   users: e.module('users', ['email_taken'] as const),
 * }))
 *
 * Exceptions.orders.not_found     // 'orders.not_found'
 * Exceptions.orders.already_paid  // 'orders.already_paid'
 * Exceptions.users.email_taken    // 'users.email_taken'
 * ```
 */
export function createExceptions<T>(factory: (e: ExceptionBuilder) => T): T {
	const builder: ExceptionBuilder = {
		module: <const P extends string, const C extends readonly string[]>(
			prefix: P,
			codes: C,
		): ExceptionModule<P, C> => {
			const result = {
				not_found: `${prefix}.not_found`,
			} as Record<string, string>

			for (const code of codes) {
				result[code] = `${prefix}.${code}`
			}

			return result as ExceptionModule<P, C>
		},
	}

	return factory(builder)
}
