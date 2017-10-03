import * as moment from 'moment';

/**
 * API key for newsapi.org
 * Don't worry, I'll change it after this ;-)
 */
const API_KEY = '2b88a66af2114afcb1f736a302d51998';

export interface Article {
	author: string;
	title: string;
	description: string;
	url: string;
	urlToImage: string;
	publishedAt: string;
}

export interface ArticlesResponse {
	status: string;
	source: string;
	sortBy: string;
	articles: Article[];
}

export type SortType = 'top' | 'latest' | 'popular';

export enum NewsSource {
	NYT = 'the-new-york-times',
	WAPO = 'the-washington-post',
	HN = 'hacker-news',
	TNW = 'the-next-web',
	VERGE = 'the-verge',
	ARS = 'ars-technica'
}

export function requestNews(source: NewsSource, sortType: SortType = 'latest', callback: (articles: Article[]) => void, errorCallback?: (error: any) => void): void {
	const url = `https://newsapi.org/v1/articles?source=${source}&sortBy=${sortType}&apiKey=${API_KEY}`;
	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				const response: ArticlesResponse = JSON.parse(xhr.responseText);
				callback(response.articles);
			} else {
				errorCallback && errorCallback(xhr.statusText);
			}
		}
	};
	xhr.open('GET', url);
	xhr.send();
}

export function fetchNews(source: NewsSource, sortType: SortType = 'latest'): Promise<Article[]> {
	const url = `https://newsapi.org/v1/articles?source=${source}&sortBy=top&apiKey=${API_KEY}`;
	return fetch(url).then((response) => {
		return response.json();
	}).then((json: ArticlesResponse) => {
		return json.articles;
	});
}

export function renderArticle(article: Article): HTMLElement {
	const div = document.createElement('div');
	div.classList.add('article');
	div.innerHTML = `
	<div class="image">
		<img src="${article.urlToImage}" />
	</div>
	<div class="content">
		<div class='header'>
			<a href="${article.url}">${article.title}</a>
		</div>
		<div class="meta date">
			${moment(new Date(article.publishedAt)).startOf('day').fromNow()}
		</div>
		<div class="meta description">
			<p>${article.description}</p>
		</div>
	</div>
	`;

	return div;
}
