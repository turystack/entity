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
})
