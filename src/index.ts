import ArticlesComponent from './ArticlesComponent';
import ArticlesService, { NewsSource } from './ArticlesService';

// generate your own key at https://newsapi.org/register
const API_KEY = '2b88a66af2114afcb1f736a302d51998';
const service = new ArticlesService(API_KEY);

async function loadArticles() {
	const articlesDiv = document.getElementById('articles')!;
	const component = new ArticlesComponent(articlesDiv);
	try {
		const articles = await service.fetchArticles(NewsSource.VERGE);
		component.setArticles(articles);
	} catch (error) {
		console.log('[ERROR]', error);
	}
}

const articlesButton = document.getElementById('load_articles')!;
articlesButton.addEventListener('click', loadArticles);
articlesButton.removeAttribute('disabled');
