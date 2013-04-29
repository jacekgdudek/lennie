function HomeScene()
{
	var newsList = new Array();

	this.init = function()
	{
		document.getElementById("title-card").style.visibility = "visible";

		//newsList = structure.news;

		//constructNews(structure.news);
	}

	this.update = function()
	{

	}

	this.finalize = function()
	{
		document.getElementById("title-card").style.visibility = "hidden";

	}

	//=======================PRIV

	function constructNews(news)
	{
		//clear body
		while (body.hasChildNodes()) {
    		body.removeChild(body.lastChild);
		}

		//draw news
		for(var i = 0 ; i < news.length; i++)
		{
			var newsContainer = document.createElement("div");
			newsContainer.class = "news-container";
			body.appendChild(newsContainer);

			var title = document.createElement("h3");
			title.innerHTML = news[i].topic;
			title.style.textAlign = "left";
			newsContainer.appendChild(title);

			var content = document.createElement("p");
			content.innerHTML = news[i].content;
			newsContainer.appendChild(content);

			var brake = document.createElement("br");
			newsContainer.appendChild(brake);
			

			//draw title

			//draw date

			//draw content
		}

	}

}