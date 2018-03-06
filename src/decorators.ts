export function deprecated(
	target: any,
	key: string,
	descriptor: PropertyDescriptor
) {
	const { value: original } = descriptor;
	const message = `Method ${key} is deprecated.`;

	descriptor.value = function() {
		console.warn(message);
		original.apply(this, arguments);
	};
}
