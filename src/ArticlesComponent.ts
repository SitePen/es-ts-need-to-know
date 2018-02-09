import { toRelativeDate } from './util';

export interface Article {
	url: string;
	title: string;
	description: string;
	urlToImage: string;
	publishedAt: string;
}

export default class ArticlesComponent {
	domNode: Element;
	articles!: Article[];
	constructor(domNode: Element | string = document.createElement('div'), articles: Article[] = []) {
		if (typeof domNode === 'string') {
			this.domNode = document.querySelector(domNode)!;
		}
		else {
			this.domNode = domNode;
		}
	}

	setArticles(articles: Article[]) {
		this.articles = articles;
		this.render();
	}
	render() {
		this.domNode.innerHTML = '';

		this.articles.forEach((article: Article) => {
			const articleDiv = this.renderArticle(article);
			this.domNode.appendChild(articleDiv);
		});

		return this.domNode;
	}

	renderArticle(article: Article) {
		const div = document.createElement('div');
		div.className = 'article';
		div.innerHTML = `
			<div class="image">
				<img src="${article.urlToImage}" />
			</div>
			<div class="content">
				<div class="header">
					<a href="${article.url}">${article.title}</a>
				</div>
				<div class="meta date">
					${toRelativeDate(article.publishedAt)}
				</div>
				<div class="meta description">
				<p>${article.description}</p>
				</div>
			</div>
		`;

		return div;
	}
}
