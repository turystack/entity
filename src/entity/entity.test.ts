import superjson from 'superjson'
import { describe, expect, it } from 'vitest'

import { Entity } from '@/entity/entity.js'

describe('Entity', () => {
	it('should register a class', () => {
		const TestClass = Entity()
		expect(TestClass).toBeDefined()
	})

	it('should parse and stringify a class', () => {
		@Entity()
		class TestClass {
			id!: string
			status!: 'ACTIVE' | 'INACTIVE'

			constructor(partial: Partial<TestClass>) {
				Object.assign(this, partial)
			}

			isActive() {
				return this.status === 'ACTIVE'
			}

			isInactive() {
				return this.status === 'INACTIVE'
			}
		}

		const testInstance = new TestClass({
			id: '123',
			status: 'ACTIVE',
		})

		const parsed = superjson.stringify(testInstance)
		const parsedInstance = superjson.parse(parsed) as TestClass

		expect(parsedInstance).toBeInstanceOf(TestClass)
		expect(parsedInstance.id).toBe('123')
		expect(parsedInstance.status).toBe('ACTIVE')
		expect(parsedInstance.isActive()).toBe(true)
		expect(parsedInstance.isInactive()).toBe(false)
	})

	it('should register a stable serialization identifier', () => {
		@Entity('orders.order')
		class Order {
			constructor(readonly id: string) {}
		}

		const serialized = superjson.stringify(new Order('order-1'))
		const parsed = superjson.parse(serialized)

		expect(serialized).toContain('orders.order')
		expect(parsed).toBeInstanceOf(Order)
		expect(parsed).toMatchObject({
			id: 'order-1',
		})
	})

	it('should preserve nested serializable values', () => {
		@Entity('events.event')
		class Event {
			constructor(
				readonly occurredAt: Date,
				readonly tags: Set<string>,
			) {}
		}

		const event = new Event(
			new Date('2026-07-18T12:00:00.000Z'),
			new Set([
				'created',
			]),
		)
		const parsed = superjson.parse<Event>(superjson.stringify(event))

		expect(parsed).toBeInstanceOf(Event)
		expect(parsed.occurredAt).toEqual(event.occurredAt)
		expect(parsed.tags).toEqual(event.tags)
	})
})
