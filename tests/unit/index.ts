import * as registerSuite from 'intern!object';
import * as assert from 'intern/chai!assert';
import * as index from '../../src/index';

registerSuite({
	name: 'index',

	'page init'() {
		const clickMeButton = document.createElement('button');
		clickMeButton.setAttribute('id', 'click_me');
		document.body.appendChild(clickMeButton);

		index.init();

		document.body.removeChild(clickMeButton);
	},

	'click button'(this: any) {
		const dfd = this.async();
		const greetingH2 = document.createElement('h2');
		greetingH2.id = 'greeting';
		greetingH2.textContent = '[ TODO: Replace Me ]';
		document.body.appendChild(greetingH2);

		const clickMeButton = document.createElement('button');
		clickMeButton.id = 'click_me';
		document.body.appendChild(clickMeButton);

		index.init();
		const event = new window.CustomEvent('click');
		clickMeButton.dispatchEvent(event);

		setTimeout(dfd.callback(() => {
			assert.strictEqual(greetingH2.textContent, 'Hello FRBNY UI Summit');
			document.body.removeChild(greetingH2);
			document.body.removeChild(clickMeButton);
		}), 2500);
	}
});
