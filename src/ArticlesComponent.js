define([
	'exports',
	'./util'
], function (exports, util) {
	function ArticlesComponent(domNode, articles) {
		if (!domNode) {
			this.domNode = document.createElement('div');
		}
		else if (typeof domNode === 'string') {
			this.domNode = document.querySelector(domNode);
		}
		else {
			this.domNode = domNode;
		}
		this.articles = articles || [];
	}

	ArticlesComponent.prototype.setArticles = function (articles) {
		this.articles = articles;
		this.render();
	};

	ArticlesComponent.prototype.render = function() {
		this.domNode.innerHTML = '';

		this.articles.forEach(function (article) {
			var articleDiv = this.renderArticle(article);
			this.domNode.appendChild(articleDiv);
		}, this);

		return this.domNode;
	};

	ArticlesComponent.prototype.renderArticle = function (article) {
		var div = document.createElement('div')
		div.className = 'article';
		div.innerHTML = [
			'<div class="image">',
				'<img src="' + article.urlToImage + '" />',
			'</div>',
			'<div class="content">',
				'<div class="header">',
					'<a href="' + article.url + '">' + article.title + '</a>',
				'</div>',
				'<div class="meta date">',
					util.toRelativeDate(article.publishedAt),
				'</div>',
				'<div class="meta description">',
				'<p>' + article.description + '</p>',
				'</div>',
			'</div>'
		].join('\n');

		return div;
	};

	return ArticlesComponent;
});
