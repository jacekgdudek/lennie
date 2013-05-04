function BlogScene()
{

	this.init = function()
	{
		//move navBar to the top

		//construct Blog
		constructBlog(structure.blog);
		
	}

	this.update = function()
	{

	}

	this.finalize = function()
	{
		while (body.hasChildNodes()) {
    		body.removeChild(body.lastChild);
		}
		body.style.visibility = "hidden";
	}

	//=======================PRIV

	function constructBlog(blog)
	{
		//clear body
		while (body.hasChildNodes()) {
    		body.removeChild(body.lastChild);
		}

		body.style.visibility = "visible";
		body.style.width = window.innerWidth * 0.8 + "px";
		body.style.left = window.innerWidth * 0.1 + "px";

		//cover for background
		var bg_cover = document.createElement("div");
		bg_cover.style.position = "fixed";
		bg_cover.style.top = "0px";
		bg_cover.style.left = "0px";
		bg_cover.style.height = window.innerHeight - 50 + "px";
		bg_cover.style.width = "100%";
		bg_cover.style.backgroundColor = "rgba(26,65,68,0.2)";

		//draw months square
		var monthsContainer = document.createElement("div");
		monthsContainer.style.position = "absolute";
		monthsContainer.style.top = window.innerHeight * 0.05 + "px";
		monthsContainer.style.left = window.innerWidth * 0.02 + "px";
		monthsContainer.style.height = window.innerHeight * 0.2 + "px";
		monthsContainer.style.width = window.innerWidth * 0.1 + "px";
		monthsContainer.style.backgroundColor = "rgba(146, 197, 202, 0.82)";
		monthsContainer.style.textAlign = "center";
		monthsContainer.style.paddingTop = "30px";
		monthsContainer.style.lineHeight = "200%";
		monthsContainer.style.borderRadius = "5px";

		for(var i  = 0; i < blog.months.length ; i ++ )
		{
			var newText = document.createElement("a");
			newText.innerHTML = blog.months[i].text;
			newText.style.cursor = "pointer";
			newText.style.color = "#1a4144";
			monthsContainer.appendChild(newText);
		}
		//

		//draw blog area
		var blogContainer = document.createElement("div");
		blogContainer.style.position = "absolute";
		blogContainer.style.top = window.innerHeight * 0.05 + "px";
		blogContainer.style.left = window.innerWidth * 0.15 + "px";
		blogContainer.style.height = window.innerHeight * 0.6 + "px";
		blogContainer.style.width = window.innerWidth * 0.6 + "px";
		blogContainer.style.backgroundColor = "rgba(146, 197, 202, 0.82)";
		blogContainer.style.paddingTop = "0px";
		blogContainer.style.paddingLeft = "30px";
		blogContainer.style.borderRadius = "5px";
		blogContainer.style.color = "#1a4144";

		for(var i  = 0; i < blog.posts.length ; i ++ )
		{
			var newDate = document.createElement("p");
			newDate.innerHTML = blog.posts[i].date;
			newDate.style.position = "relative";
			newDate.style.left = parseInt(blogContainer.style.width, 10) - 100 + "px";
			newDate.style.top = 40+ "px";
			newDate.style.width = 60+ "px";
			newDate.style.color = "#1a4144";
			blogContainer.appendChild(newDate);

			var newTitle = document.createElement("h3");
			newTitle.innerHTML = blog.posts[i].title;
			newTitle.style.color = "#1a4144";
			blogContainer.appendChild(newTitle);

			var newText = document.createElement("p");
			newText.innerHTML = blog.posts[i].text;
			blogContainer.appendChild(newText);
			newText.style.color = "#1a4144";

			var horizontalBar = document.createElement("hr");
			horizontalBar.style.color = "#1a4144";
			horizontalBar.color = "#1a4144";
			horizontalBar.style.border = "none";	
			horizontalBar.style.borderTop = "1px #1a4144 solid";
			horizontalBar.style.height = "1px";
			horizontalBar.style.marginBottom = "-8px";
			blogContainer.appendChild(horizontalBar);
		}

		body.appendChild(bg_cover);
		body.appendChild(monthsContainer);
		body.appendChild(blogContainer);

	}

}