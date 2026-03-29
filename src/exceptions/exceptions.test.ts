import { describe, expect, it } from 'vitest'

import { createExceptions } from './exceptions.js'

describe('createExceptions', () => {
	it('should create exceptions with not_found default', () => {
		const exceptions = createExceptions((e) => ({
			user: e.module('user', []),
		}))

		expect(exceptions.user.not_found).toBe('user.not_found')
	})

	it('should prefix custom codes with module name', () => {
		const exceptions = createExceptions((e) => ({
			billing: e.module('billing_threshold', [
				'cannot_deactivate',
				'currency_not_compatible',
			]),
		}))

		expect(exceptions.billing.not_found).toBe('billing_threshold.not_found')
		expect(exceptions.billing.cannot_deactivate).toBe(
			'billing_threshold.cannot_deactivate',
		)
		expect(exceptions.billing.currency_not_compatible).toBe(
			'billing_threshold.currency_not_compatible',
		)
	})

	it('should support multiple modules', () => {
		const exceptions = createExceptions((e) => ({
			coupon: e.module('coupon', [
				'code_already_exists',
				'not_available',
			]),
			invoice: e.module('invoice', [
				'not_expired',
				'not_payable',
			]),
		}))

		expect(exceptions.coupon.not_found).toBe('coupon.not_found')
		expect(exceptions.coupon.code_already_exists).toBe(
			'coupon.code_already_exists',
		)
		expect(exceptions.invoice.not_found).toBe('invoice.not_found')
		expect(exceptions.invoice.not_payable).toBe('invoice.not_payable')
	})

	it('should match billing-service pattern', () => {
		const exceptions = createExceptions((e) => ({
			billingThreshold: e.module('billing_threshold', [
				'cannot_deactivate',
				'cannot_reactivate',
				'currency_not_compatible',
				'not_available',
			]),
			customer: e.module('customer', [
				'no_active_subscription',
				'no_had_subscription',
				'organization_id_already_exists',
			]),
			voucher: e.module('voucher', []),
		}))

		expect(exceptions.billingThreshold.not_found).toBe(
			'billing_threshold.not_found',
		)
		expect(exceptions.billingThreshold.cannot_deactivate).toBe(
			'billing_threshold.cannot_deactivate',
		)
		expect(exceptions.customer.not_found).toBe('customer.not_found')
		expect(exceptions.customer.organization_id_already_exists).toBe(
			'customer.organization_id_already_exists',
		)
		expect(exceptions.voucher.not_found).toBe('voucher.not_found')
	})
})
