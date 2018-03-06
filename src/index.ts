import ArticlesComponent from './ArticlesComponent';
import ArticlesService, { NewsSource } from './ArticlesService';

// Note: register for your own API key at https://newsapi.org/register
const API_KEY = '2b88a66af2114afcb1f736a302d51998';
const service = new ArticlesService(API_KEY);

async function loadArticles() {
	const component = new ArticlesComponent('#articles');
	try {
		const articles = await service.fetchArticles(NewsSource.TNW);
		component.setArticles(articles);
	} catch (error) {
		console.error('[ERROR]', error);
	}
}

const articlesButton = document.getElementById('load_articles')!;
articlesButton.addEventListener('click', loadArticles);
articlesButton.removeAttribute('disabled');
