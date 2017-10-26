import * as registerSuite from 'intern!object';
import * as assert from 'intern/chai!assert';
import { toRelativeDate } from '../../src/util';

registerSuite({
	name: 'util',
	'2 hours ago'() {
		const time = Date.now();
		const twoHours = 60000 * 120;
		const date = (new Date(time - twoHours)).toISOString();
		assert.strictEqual(toRelativeDate(date), '2 hours ago');
	}
});
