const { registerSuite } = intern.getInterface('object');
const { assert } = intern.getPlugin('chai');

import { toRelativeDate } from '../../src/util';

registerSuite('util', {
	toRelativeDate: {
		'2 hours ago'() {
			const time = Date.now();
			const twoHours = 60000 * 120;
			const date = new Date(time - twoHours).toISOString();
			assert.strictEqual(toRelativeDate(date), '2 hours ago');
		}
	}
});
