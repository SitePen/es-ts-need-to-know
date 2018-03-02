require([
	'./ArticlesService',
	'./ArticlesComponent'
], function (ArticlesService, ArticlesComponent) {
	// Note: register for your own API key at https://newsapi.org/register
	var API_KEY = '2b88a66af2114afcb1f736a302d51998';
	var newsSource = ArticlesService.newsSource;
	var service = new ArticlesService(API_KEY);

	function loadArticles() {
		var articlesDiv = document.getElementById('articles');
		var component = new ArticlesComponent(articlesDiv);
		service.getArticles(newsSource.TNW, function (articles) {
			component.setArticles(articles);
		}, function (error) {
			console.error('[ERROR]', error);
		});
	}

	var articlesButton = document.getElementById('load_articles');
	articlesButton.addEventListener('click', loadArticles);
	articlesButton.removeAttribute('disabled');
});
