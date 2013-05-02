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
		bg_cover.style.backgroundColor = "rgba(150,150,150,0.2)";

		//draw months square
		var monthsContainer = document.createElement("div");
		monthsContainer.style.position = "absolute";
		monthsContainer.style.top = window.innerHeight * 0.05 + "px";
		monthsContainer.style.left = window.innerWidth * 0.02 + "px";
		monthsContainer.style.height = window.innerHeight * 0.2 + "px";
		monthsContainer.style.width = window.innerWidth * 0.1 + "px";
		monthsContainer.style.backgroundColor = "#999999";
		monthsContainer.style.textAlign = "center";
		monthsContainer.style.paddingTop = "30px";
		monthsContainer.style.lineHeight = "200%";
		monthsContainer.style.borderRadius = "15px";

		for(var i  = 0; i < blog.months.length ; i ++ )
		{
			var newText = document.createElement("a");
			newText.innerHTML = blog.months[i].text;
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
		blogContainer.style.backgroundColor = "#999999";
		blogContainer.style.paddingTop = "15px";
		blogContainer.style.paddingLeft = "30px";
		blogContainer.style.borderRadius = "15px";

		for(var i  = 0; i < blog.posts.length ; i ++ )
		{
			var newDate = document.createElement("p");
			newDate.innerHTML = blog.posts[i].date;
			newDate.style.position = "relative";
			newDate.style.left = parseInt(blogContainer.style.width, 10) - 100 + "px";
			newDate.style.top = 40+ "px";
			blogContainer.appendChild(newDate);

			var newTitle = document.createElement("h3");
			newTitle.innerHTML = blog.posts[i].title;
			blogContainer.appendChild(newTitle);

			var newText = document.createElement("p");
			newText.innerHTML = blog.posts[i].text;
			blogContainer.appendChild(newText);
			blogContainer.appendChild(document.createElement("br"));
		}

		body.appendChild(bg_cover);
		body.appendChild(monthsContainer);
		body.appendChild(blogContainer);

	}

}