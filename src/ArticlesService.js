define([], function() {
	var newsSource = {
		NYT: 'the-new-york-times',
		WAPO: 'the-washington-post',
		HN: 'hacker-news',
		TNW: 'the-next-web',
		VERGE: 'the-verge',
		ARS: 'ars-technica'
	};

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

	function ArticlesService(apiKey) {
		this._apiKey = apiKey;
	}

	ArticlesService.prototype.getArticles = function(source, callback, errorCallback) {
		var url = 'https://newsapi.org/v1/articles?source=' + source + '&apiKey=' + this._apiKey;
		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function() {
			var response;
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
	};

	ArticlesService.newsSource = newsSource;

	return ArticlesService;
});
