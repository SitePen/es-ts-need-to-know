import { Article } from './ArticlesComponent';
import deprecated from './decorators/deprecated';

export enum NewsSource {
	NYT = 'the-new-york-times',
	WAPO = 'the-washington-post',
	HN = 'hacker-news',
	TNW = 'the-next-web',
	VERGE = 'the-verge',
	ARS = 'ars-technica'
}

export default class ArticlesService {
	private apiKey: string;

	constructor(apiKey: string) {
		this.apiKey = apiKey;
	}

	async fetchArticles(source: NewsSource = NewsSource.NYT): Promise<Article[]> {
		const url = `https://newsapi.org/v1/articles?source=${source}&apiKey=${this.apiKey}`;
		const response = await fetch(url);
		const json = await response.json();

		return json.articles;
	}

	@deprecated('fetchArticles')
	getArticles(source: NewsSource) {
		return new Promise<Article[]>((resolve, reject) => {
			const url = `https://newsapi.org/v1/articles?source=${source}&apiKey=${this.apiKey}`;
			const xhr = new XMLHttpRequest();

			xhr.onreadystatechange = function () {
				let response: any;
				if (xhr.readyState === 4) {
					if (xhr.status ===  200) {
						response = JSON.parse(xhr.responseText);
						resolve(response.articles);
					}
					else {
						reject(xhr.statusText);
					}
				}
			};

			xhr.open('GET', url);
			xhr.send();
		});
	}
}
