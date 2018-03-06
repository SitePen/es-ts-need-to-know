import { deprecated } from './decorators';
export enum NewsSource {
	NYT = 'the-new-york-times',
	WAPO = 'the-washington-post',
	HN = 'hacker-news',
	TNW = 'the-next-web',
	VERGE = 'the-verge',
	ARS = 'ars-technica'
}

/**
 * NewsAPI.org provides back a
 * list of articles containing the following properties
 * * source: { id, name }
 * * author
 * * title
 * * description
 * * url
 * * urlToImage
 * * publishedAt
 */
export interface Article {
	source: { id: string; name: string };
	author: string;
	title: string;
	description: string;
	url: string;
	urlToImage: string;
	publishedAt: string;
}

export class ArticlesService {
	private _apiKey: string;

	constructor(apiKey: string) {
		this._apiKey = apiKey;
	}

	fetchArticles(source: NewsSource): Promise<Article[]> {
		const url = `https://newsapi.org/v1/articles?source=${source}&apiKey=${
			this._apiKey
		}`;
		const promise = fetch(url);
		return promise.then((res) => res.json()).then((json) => json.articles);
	}

	@deprecated
	getArticles(
		source: NewsSource,
		callback: (articles: Article[]) => void,
		errorCallback: (error: any) => void
	) {
		const url = `https://newsapi.org/v1/articles?source=${source}&apiKey=${
			this._apiKey
		}`;
		const xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function() {
			let response;
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					response = JSON.parse(xhr.responseText);
					callback(response.articles);
				} else {
					errorCallback && errorCallback(xhr.statusText);
				}
			}
		};

		xhr.open('GET', url);
		xhr.send();
	}
}

export default ArticlesService;
