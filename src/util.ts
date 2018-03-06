export function toRelativeDate(isoString: string): string {
	const date = new Date(
		(isoString || '').replace(/-/g, '/').replace(/[TZ]/g, ' ')
	);
	const now = Date.now() + new Date().getTimezoneOffset() * 60000;
	const diff = (now - date.getTime()) / 1000;
	const dayDiff = Math.floor(diff / 86400);

	if (isNaN(dayDiff) || dayDiff < 0 || dayDiff >= 31) {
		return '';
	}

	if (diff < 60) {
		return 'just now';
	}

	if (diff < 120) {
		return '1 minute ago';
	}

	if (diff < 3600) {
		return Math.floor(diff / 60) + ' minutes ago';
	}

	if (diff < 7200) {
		return '1 hour ago';
	}

	if (diff < 86400) {
		return Math.floor(diff / 3600) + ' hours ago';
	}

	if (dayDiff === 1) {
		return 'Yesterday';
	}

	if (dayDiff < 7) {
		return dayDiff + ' days ago';
	}

	if (dayDiff < 31) {
		return Math.ceil(dayDiff / 7) + ' weeks ago';
	}

	return '';
}
