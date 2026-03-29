import superjson from 'superjson'

type Class = {
	new (...args: any[]): any
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
 */
export function Entity() {
	return (Constructor: Class) => {
		superjson.registerClass(Constructor)
	}
}
