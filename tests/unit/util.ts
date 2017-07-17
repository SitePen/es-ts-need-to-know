import * as registerSuite from 'intern!object';
import * as assert from 'intern/chai!assert';
import { delay, isPromiseLike } from '../../src/util';

registerSuite({
	name: 'util',

	'delay()': {
		async 'returns a function which is delay'() {
			let called = 0;
			const result = delay(() => {
				called = Date.now();
			}, 1000);
			const start = Date.now();
			await result();
			assert.isAtLeast(called - start, 999, 'should have been called later');
		},

		async 'returns the expected value'() {
			const result = delay(() => {
				return 'foo';
			}, 1);
			const value = await result();
			assert.strictEqual(value, 'foo', 'should have proper return value');
		},

		async 'makes arguments available'() {
			const result = delay((...args: any[]) => {
				assert.deepEqual(args, [ 'foo', 1, true ], 'should have passed correct args');
			}, 1);
			await result('foo', 1, true);
		},

		async 'passed thisArg'() {
			const thisArg = {};
			const result = delay(function (this: any) {
				assert.strictEqual(this, thisArg, 'should have passed thisArg');
			}, 1, thisArg);
			await result();
		},

		async 'passes through promise'() {
			const result = delay(() => {
				return Promise.resolve('foo');
			}, 1);
			const value = await result();
			assert.strictEqual(value, 'foo', 'should have proper return value');
		},

		'rejects on throw'(this: any) {
			const dfd = this.async();
			const result = delay(() => {
				throw new Error('Ooops');
			}, 1);
			result()
				.then(() => {
					throw new Error('Unexpected path');
				}, dfd.callback((e: Error) => {
					assert.instanceOf(e, Error, 'should be instance of error');
					assert.strictEqual(e.message, 'Ooops');
				}));
		},

		'rejects on reject'(this: any) {
			const dfd = this.async();
			const result = delay((): Promise<void> => {
				return Promise.reject(new Error('Ooops')) as any;
			}, 1);
			result()
				.then(() => {
					throw new Error('Unexpected path');
				}, dfd.callback((e: Error) => {
					assert.instanceOf(e, Error, 'should be instance of error');
					assert.strictEqual(e.message, 'Ooops');
				}));
		}
	},

	'isPromiseLike()'() {
		assert.isTrue(isPromiseLike({ then() {} }));
		assert.isTrue(isPromiseLike(new Promise(() => {})));
		assert.isFalse(isPromiseLike(null));
		assert.isFalse(isPromiseLike('foo'));
		assert.isFalse(isPromiseLike(2));
		assert.isFalse(isPromiseLike(undefined));
	}
});
