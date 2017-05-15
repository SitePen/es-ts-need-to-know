import * as moment from 'moment';

interface DateResults {
	/**
	 * A string representing a week ago
	 */
	lastWeek: string;
}

export default class Clock {
	private _date: string;

	constructor(date: string) {
		this._date = date;
	}

	getDates(): DateResults {
		const today = moment(this._date);
		return {
			lastWeek: today.subtract(7, 'days').format('LL')
		};
	}
}
