import superjson from 'superjson'

type Class = {
	new (...args: never[]): object
}

/**
 * Class decorator that registers a class with superjson for serialization/deserialization.
 *
 * type preservation (e.g. `Date`, custom classes) across serialization boundaries.
 *
 * @example
 * ```ts
 * import { Entity } from '@turystack/entity'
 *
 * @Entity()
 * class Order {
 *   id: string
 *   createdAt: Date
 * }
 * ```
 *
 * @param identifier - Stable serialization identifier. Prefer a namespaced value
 * such as `orders.order` when class names may be minified or duplicated.
 */
export function Entity(identifier?: string) {
	return (Constructor: Class) => {
		superjson.registerClass(Constructor, identifier)
	}
}
