export default function spawn(genFn: (...args: any[]) => Iterator<any>): void {
	const iterator = genFn();

	function co(type: 'next' | 'throw', arg?: any): Promise<any> {
		let result: { value: any, done: boolean };
		try {
			result = iterator[type]!(arg);
		} catch (error) {
			return Promise.reject(error);
		}

		const { value, done } = result;

		if (done) {
			if (type === 'throw') {
				return arg;
			} else {
				return value;
		}
		} else {
			return Promise.resolve(value).then(
				(value) => co('next', value),
				(error) => co('throw', error)
			);
		}
	}

	co('next');
}
