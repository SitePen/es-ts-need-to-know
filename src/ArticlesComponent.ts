import { Article } from './ArticlesService';
import * as util from './util';

export default class ArticlesComponent {
	domNode: HTMLElement;
	articles: Article[];
	constructor(
		domNode: string | HTMLElement = document.createElement('div'),
		articles: Article[] = []
	) {
		if (typeof domNode === 'string') {
			this.domNode = document.querySelector(domNode) as HTMLElement;
		} else {
			this.domNode = domNode;
		}
		this.articles = articles;
	}
	setArticles(articles: Article[]) {
		this.articles = articles;
		this.render();
	}

	render() {
		this.domNode.innerHTML = '';

		this.articles.forEach((article) => {
			const articleDiv = this.renderArticle(article);
			this.domNode.appendChild(articleDiv);
		});

		return this.domNode;
	}
	renderArticle(article: Article) {
		const div = document.createElement('div');
		div.className = 'article';
		/* eslint-disable indent */
		div.innerHTML = `
			<div class="image">
				<img src="${article.urlToImage}" />
			</div>
			<div class="content">
				<div class="header">
					<a href="${article.url}">${article.title}</a>
				</div>
				<div class="meta date">
					${util.toRelativeDate(article.publishedAt)}
				</div>
				<div class="meta description">
					<p>${article.description}</p>
				</div>
			</div>
		`;
		/* eslint-enable indent */

		return div;
	}
}
