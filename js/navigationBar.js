function NavigationBar()
{
	var navBar;

	this.init = function()
	{
		navBar = document.getElementById("nav-bar-div");
		navBar.style.width = window.innerWidth + "px";
		navBar.style.backgroundColor = "#888888";
		//navBar.style.backgroundImage = "url(assets/landing/texture.png)";
		navBar.style.textDecoration = "none";
		navBar.style.fontSize = "24px";
		navBar.style.color = "gray";

		constructNavBar();

		navBar.style.visibility = "visible";
	}

	this.update = function()
	{
		if(navBar.children[0].state != "static")
		{
			//check if move
			navBar.children[0].nextId = navBar.children[0].state.replace(/moveTo/gi, '');
		}

		if(navBar.children[0].nextId != navBar.children[0].currentId)
		{
			//move navBar towards new id
			var posOfOld = parseInt(navBar.children[0].style.left, 10);//parseInt(navBar.children[1 + navBar.children[0].currentId].style.left, 10);
			var posOfNew = parseInt(navBar.children[1 + parseInt(navBar.children[0].nextId)].style.left, 10) - 5;
			var distance = posOfNew - posOfOld;
			var jump = distance/5 + (distance > 0 ? 5 : -5);//Math.ceil(distance/5 + (distance > 0 ? 1 : -1));

			//console.log(jump);

			navBar.children[0].style.left = (parseInt(navBar.children[0].style.left , 10) +jump) + "px";
			//console.log(navBar.children[0].style.left);

			//check if finnished
			if(parseInt(navBar.children[0].nextId) > navBar.children[0].currentId && 
				parseInt(navBar.children[0].style.left , 10) > parseInt(navBar.children[ parseInt(navBar.children[0].nextId) +1].style.left ) - 5)
			{
				navBar.children[0].style.left = parseInt(navBar.children[ parseInt(navBar.children[0].nextId) + 1].style.left, 10) - 5 + "px";
				navBar.children[0].currentId =  parseInt(navBar.children[0].nextId);
				//console.log("Maxed to the right");
			}
			else if(parseInt(navBar.children[0].nextId) < navBar.children[0].currentId && 
				parseInt(navBar.children[0].style.left , 10) < parseInt(navBar.children[ parseInt(navBar.children[0].nextId) +1].style.left ) - 5)
			{
				navBar.children[0].style.left = parseInt(navBar.children[ parseInt(navBar.children[0].nextId) + 1].style.left, 10) - 5 + "px";
				navBar.children[0].currentId =  parseInt(navBar.children[0].nextId);
				//console.log("Maxed to the left");
			}

			//animate width
			var widthOfOld = parseInt(navBar.children[0].clientWidth, 10);
			var widthOfNew = parseInt(navBar.children[1 + parseInt(navBar.children[0].nextId)].clientWidth, 10);
			var widthDistance = widthOfNew - widthOfOld;
			var jump2 = widthDistance/5 + (widthDistance > 0 ? 2 : -2);
			navBar.children[0].style.width = (parseInt(navBar.children[0].clientWidth , 10) +jump2) + 10 + "px";

			if(parseInt(navBar.children[ 0 ].clientWidth) > parseInt(navBar.children[ parseInt(navBar.children[0].nextId) + 1].clientWidth)+ 10)
			{
				navBar.children[0].style.width = parseInt(navBar.children[ parseInt(navBar.children[0].nextId) + 1].clientWidth)+ 10 + "px";
			}
		}
	}

	this.finalize = function()
	{


	}

	//=======================PRIV

	function constructNavBar()
	{
		var noOfObjects = navBar.children.length;
		console.log("window width" + window.innerWidth);
		var titleWidth = 200;
		var startingPosition = window.innerWidth/2 - (noOfObjects/2)*titleWidth + 180;


		for(var i = 0 ; i < noOfObjects-1 ; i ++)
		{
			navBar.children[i+1].id = "nav-bar-child-" +i; 
			navBar.children[i+1].style.position = "absolute";
			navBar.children[i+1].style.left = startingPosition + i*titleWidth + "px";
			navBar.children[i+1].style.top = "15px";
			navBar.children[i+1].style.textDecoration = "none";
			navBar.children[i+1].style.color = "black";
			navBar.children[i+1].style.width = "auto";
			navBar.children[i+1].style.height = "auto";
		}

		//construct highlight
		var marginSize = 5;
		navBar.children[0].style.left = (startingPosition - marginSize) + "px";
		navBar.children[0].style.width = (navBar.children[1].children[0].clientWidth + marginSize*2) + "px";
		navBar.children[0].state = "static";
		navBar.children[0].nextId = 0;
		navBar.children[0].currentId = 0;
	}

}