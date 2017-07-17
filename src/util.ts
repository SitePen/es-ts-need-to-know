export interface OriginalFunction<T> {
	(...args: any[]): PromiseLike<T> | T;
}

export interface PromisedFunction<T> {
	(...args: any[]): Promise<T>;
}

/**
 * A function that returns a new function that will not be called until after a delay.
 *
 * The returned function will also return its value as a Promise.
 * @param callback The function to delay invoking
 * @param delay The delay, in milliseconds
 * @param thisArg The `this` to utilise
 */
export function delay<T>(callback: OriginalFunction<T>, delay: number, thisArg?: any): PromisedFunction<T> {
	return function (...args: any[]): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			setTimeout(() => {
				let result: any;
				try {
					result = callback.apply(thisArg, args);
				}
				catch (e) {
					reject(e);
					return;
				}
				if (isPromiseLike<any>(result)) {
					return result.then(resolve, reject);
				}
				resolve(result);
			}, delay);
		});
	};
}

/**
 * A type guard which returns `true` if the `value` is _thenable_ (contains a property named `.then` which is a
 * `function`)
 * @param value The value to guard against
 */
export function isPromiseLike<T>(value: any): value is PromiseLike<T> {
	return Boolean(value && typeof value === 'object' && 'then' in value && typeof value.then === 'function');
}