// import spawn from './spawn';

// function cbDelay(fn: Function, time = 1000): Function {
// 	return function (...args: any[]) {
// 		setTimeout(() => {
// 			fn(...args);
// 		}, time);
// 	};
// }

// function delayCallback() {
// 	cbDelay(() => console.log('hello world'), 500);
// }

// function pDelay(time = 1000) {
// 	return new Promise((resolve) => {
// 		setTimeout(resolve, time);
// 	});
// }

// function delayPromise() {
// 	pDelay(500).then(() => {
// 		console.log('hello world');
// 	});
// }

// async function delayAsync() {
// 	await pDelay(500);
// 	console.log('hello world');
// }

// function delayGen() {
// 	spawn(function *() {
// 		yield pDelay(1000);
// 		console.log('hello world');
// 	});
// }
