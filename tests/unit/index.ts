const { registerSuite } = intern.getInterface('object');
const { assert } = intern.getPlugin('chai');

registerSuite('index', {
	'simple test'() {
		assert(true);
	}
});
