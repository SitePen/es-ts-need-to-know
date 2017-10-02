import * as moment from 'moment';
import { Article, NewsSource, requestNews } from './request';
import { delay } from './util';

/**
 * A delayed function that sets the greeting text
 */
const setGreetingText = delay((text: string) => {
	const greeting = document.getElementById('greeting') as HTMLHeadElement;
	greeting.textContent = text;
}, 2000);

/**
 * An event listener that sets the text of the greeting
 * @param evt The `click` mouse event
 */
function clickMeClick(evt: MouseEvent) {
	evt.preventDefault();
	const clickMeButton = evt.target as HTMLButtonElement;
	clickMeButton.setAttribute('disabled', 'disabled');

	setGreetingText('Hello, FRBNY UI Summit!')
		.then(function () {
			clickMeButton.removeAttribute('disabled');
		});
}

function loadArticlesClick(evt: MouseEvent) {
	requestNews(NewsSource.VERGE, 'top', (articles) => {
		const articlesDiv = document.querySelector('#articles');
		articles.forEach((article) => {
			articlesDiv!.appendChild(renderArticle(article));
		});
	}, (error) => {
		console.error('[ERROR]', error);
	});
}

function renderArticle(article: Article): HTMLElement {
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

/**
 * Function that initialises the application
 */
export function init() {
	const clickMeButton = document.getElementById('click_me') as HTMLButtonElement;
	clickMeButton.addEventListener('click', clickMeClick);
	clickMeButton.removeAttribute('disabled');

	const loadArticlesButton = document.querySelector('#load_articles') as HTMLButtonElement;
	loadArticlesButton.addEventListener('click', loadArticlesClick);
	loadArticlesButton.removeAttribute('disabled');

	// spawn(function *() {
	// 	const response = yield fetch(' https://newsapi.org/v1/articles?source=hacker-news&sortBy=top&apiKey=2b88a66af2114afcb1f736a302d51998');
	// 	const { articles } = yield response.json();
	// 	articles.forEach((article: any) => {
	// 		const { title } = article;
	// 		console.log('article:', title);
	// 	});
	// });
}
