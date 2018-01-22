import ArticlesComponent, { Article } from './ArticlesComponent';
const API_KEY = '2b88a66af2114afcb1f736a302d51998';

enum NewsSource {
	NYT = 'the-new-york-times',
	WAPO = 'the-washington-post',
	HN = 'hacker-news',
	TNW = 'the-next-web',
	VERGE = 'the-verge',
	ARS = 'ars-technica'
}

async function fetchArticles(source: NewsSource): Promise<Article[]> {
	const url = `https://newsapi.org/v1/articles?source=${source}&apiKey=${API_KEY}`;
	const response = await fetch(url);
	const json = await response.json();
	return json.articles;
}

async function loadArticles() {
	const articlesDiv = document.getElementById('articles')!;
	const component = new ArticlesComponent(articlesDiv);
	try {
		const articles = await fetchArticles(NewsSource.VERGE);
		component.setArticles(articles);
	} catch (error) {
		console.log('[ERROR]', error);
	}
}

const articlesButton = document.getElementById('load_articles')!;
articlesButton.addEventListener('click', loadArticles);
articlesButton.removeAttribute('disabled');
