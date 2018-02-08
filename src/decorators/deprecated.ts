export default function deprecated(altMethod?: string) {
	return (target: any, key: string, descriptor: PropertyDescriptor) => {
		const { value: original } = descriptor;
		let message = `Function ${key} is deprecated.`;

		if (altMethod) {
			message += ` Use ${altMethod} instead.`;
		}

		descriptor.value = function () {
			console.warn(message);
			return original.apply(this, arguments);
		};
	};
}
