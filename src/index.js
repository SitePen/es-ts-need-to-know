define([
	'exports',
	'./ArticlesComponent'
], function (exports, ArticlesComponent) {
	var API_KEY = '2b88a66af2114afcb1f736a302d51998';

	var newsSource = {
		NYT: 'the-new-york-times',
		WAPO: 'the-washington-post',
		HN: 'hacker-news',
		TNW: 'the-next-web',
		VERGE: 'the-verge',
		ARS: 'ars-technica'
	};

	function fetchArticles(source, callback, errorCallback) {
		var url = 'https://newsapi.org/v1/articles?source=' + source + '&apiKey=' + API_KEY;
		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function () {
			var response;
			if (xhr.readyState === 4) {
				if (xhr.status ===  200) {
					response = JSON.parse(xhr.responseText);
					callback(response.articles);
				}
				else {
					errorCallback && errorCallback(xhr.statusText);
				}
			}
		};

		xhr.open('GET', url);
		xhr.send();
	}

	function loadArticles() {
		var articlesDiv = document.getElementById('articles');
		var component = new ArticlesComponent(articlesDiv);
		fetchArticles(newsSource.ARS, function (articles) {
			component.setArticles(articles);
		}, function (error) {
			console.log('[ERROR]', error)
		});
	}

	exports.init = function () {
		var articlesButton = document.getElementById('load_articles');
		articlesButton.addEventListener('click', loadArticles)
		articlesButton.removeAttribute('disabled');
	};
});
