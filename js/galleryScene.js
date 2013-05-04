function GalleryScene()
{
	var stageDiv;
	var gallery_ = new Object();

	var currentImageId;
	var nextImageIdId;

	this.init = function()
	{
		currentImageId = 0;
		nextImageId = 0;
		//newsList = structure.news;
		constructCanvas(structure.gallery);
		constructGallery(structure.gallery);
	}

	this.update = function()
	{

		if(nextImageId != currentImageId)
		{
			if(currentImageId != -1) gallery_.images[currentImageId].style.visibility = "hidden";
			gallery_.images[nextImageId].style.visibility = "visible";

			//change description
			gallery_.description.title.innerHTML = structure.gallery.photos[nextImageId].title;
			gallery_.description.text.innerHTML = structure.gallery.photos[nextImageId].description;
			//--
			currentImageId = nextImageId;
		}

		//===================necessary repositioning
		// stageDiv.style.top = structure.gallery.height/2 - parseInt(body.style.height,10)/2 + "px";// - gallery.height/2 + "px";
		// stageDiv.style.left = parseInt(body.style.width,10)/2 - structure.gallery.width/2 + "px";;
		//==================================
	}

	this.finalize = function()
	{
		while (body.hasChildNodes()) {
    		body.removeChild(body.lastChild);
		}

		stageDiv = {};

		body.style.visibility = "hidden";

	}

	function nextImage()
	{
		nextImageId++;
		if(nextImageId >= gallery_.images.length) nextImageId = 0;
	}

	function previousImage()
	{
		nextImageId--;
		if(nextImageId < 0) nextImageId = gallery_.images.length - 1;
	}

	//=======================PRIV

	function constructCanvas(gallery)
	{
		//clear body
		while (body.hasChildNodes()) {
    		body.removeChild(body.lastChild);
		}

		body.style.visibility = "visible";
		body.style.width = window.innerHeight * 0.8 + "px";
		body.style.top = window.innerHeight * 0.075 + "px";
		body.style.width = window.innerWidth * 0.8 + "px";
		body.style.left = window.innerWidth * 0.1 + "px";

		//create stage for calendar
		stageDiv = document.createElement("div");
		stageDiv.id = "galleryDiv";
		stageDiv.style.width = gallery.width + "px";
		stageDiv.style.height = gallery.height + "px";
		stageDiv.style.paddingLeft = (800-gallery.width)/2;
		stageDiv.style.position = "absolute";
		stageDiv.style.top = "15%";//gallery.height/2 - parseInt(body.style.height,10)/2 + "px";// - gallery.height/2 + "px";
		stageDiv.style.left = parseInt(body.style.width,10)/2 - gallery.width/2 + "px";;
		stageDiv.style.overflow = "hidden";
		//stageDiv.style.position = "absolute";
		body.appendChild(stageDiv);

	}


	function constructGallery(gallery)
	{
		//load images
		var images = new Array();
		for(var i = 0; i < gallery.photos.length ; i++)
		{
			var newImage = document.createElement("img");
			newImage.src = gallery.photos[i].src + i + ".jpg";

			if(!i)newImage.style.visibility = "visible";
			else newImage.style.visibility = "hidden";

			newImage.onload = function()
			{
				if(this.height > this.width)
				{
					this.style.height = gallery.height + "px";
					this.style.width = parseInt(this.style.height,10)*(this.width/this.height) + "px";
					this.style.left = (gallery.width-parseInt(this.style.width,10))/2 + "px";
				}
				else
				{
					this.style.width = gallery.width + "px";
					this.style.height = parseInt(this.style.width,10)*(this.height/this.width) + "px";
					this.style.top = (gallery.height-parseInt(this.style.height,10))/2 + "px";
				}
				this.style.position = "absolute";
				
			}

			newImage.onclick = function()
			{
				nextImage();
			}

			stageDiv.appendChild(newImage);

			images.push(newImage);
		}
		gallery_.images = images;

		//prepare arrows
		var arrows = new Array();

		var arrowLeft = new Object();
		arrowLeft.bitmap = document.createElement("img");
		arrowLeft.bitmap.src = gallery.arrows1 + ".png";
		arrowLeft.bitmap.style.cursor = "pointer";
		arrowLeft.bitmap.onload = function()
		{
			this.style.position = "absolute";
			this.style.left = "10px";
			this.style.top = gallery.height/2 - this.height/2 + "px";
			this.style.visibility = "visible";

		}

		arrowLeft.bitmap.onclick = function()
		{
			previousImage();
		}

		arrowLeft.bkg = document.createElement("div");
		arrowLeft.bkg.style.position = "absolute";
		arrowLeft.bkg.style.width = "50px";
		arrowLeft.bkg.style.height = "86px";
		arrowLeft.bkg.style.top = gallery.height/2 - 86/2 + "px";
		arrowLeft.bkg.style.left = "5px";
		arrowLeft.bkg.style.backgroundColor = "rgba(255,255,255,0.5)";
		arrowLeft.bkg.style.borderRadius = "5px";

		var arrowRight = new Object();
		arrowRight.bitmap = document.createElement("img");
		arrowRight.bitmap.src = gallery.arrows2 + ".png";
		arrowRight.bitmap.style.cursor = "pointer";
		arrowRight.bitmap.onload = function()
		{
			this.style.position = "absolute";
			this.style.right = "10px";
			this.style.top = gallery.height/2 - this.height/2 + "px";
			this.style.visibility = "visible";

		}

		arrowRight.bitmap.onclick = function()
		{
			nextImage();
		}

		arrowRight.bkg = document.createElement("div");
		arrowRight.bkg.style.position = "absolute";
		arrowRight.bkg.style.width = "50px";
		arrowRight.bkg.style.height = "86px";
		arrowRight.bkg.style.top = gallery.height/2 - 86/2 + "px";
		arrowRight.bkg.style.right = "5px";
		arrowRight.bkg.style.backgroundColor = "rgba(255,255,255,0.5)";
		arrowRight.bkg.style.borderRadius = "5px";

		arrows.push(arrowLeft);
		arrows.push(arrowRight);

		gallery_.arrows = arrows;

		stageDiv.appendChild(arrowLeft.bkg);
		stageDiv.appendChild(arrowLeft.bitmap );
		stageDiv.appendChild(arrowRight.bkg);
		stageDiv.appendChild(arrowRight.bitmap);


		//=================================Description
		var descriptionDiv = document.createElement("div");
		descriptionDiv.style.height = "100px";
		descriptionDiv.style.position = "absolute";
		descriptionDiv.style.bottom = "0px";
		descriptionDiv.style.paddingLeft = "23px";
		descriptionDiv.style.paddingRight = "23px";
		descriptionDiv.style.width = gallery.width + "px";
		descriptionDiv.style.backgroundColor = "rgba(255,255,255,0.5)";

		var descriptionTitle = document.createElement("h3");
		descriptionTitle.style.color = "#1a4144";
		descriptionTitle.style.marginTop = "4px";
		descriptionTitle.style.marginBottom = "0px";
		descriptionTitle.innerHTML = gallery.photos[0].title;

		var horizontalBar = document.createElement("hr");
		horizontalBar.style.color = "#1a4144";
		horizontalBar.color = "#1a4144";
		horizontalBar.style.border = "none";	
		horizontalBar.style.borderTop = "1px #1a4144 solid";
		horizontalBar.style.height = "1px";
		horizontalBar.style.marginTop = "0px";
		horizontalBar.style.marginBottom = "0px";
		horizontalBar.style.top = "0px";

		var descriptionText = document.createElement("p");
		descriptionText.style.color = "#1a4144";
		descriptionText.style.position = "relative";
		descriptionText.style.top = "5px";
		descriptionText.innerHTML = gallery.photos[0].description;

		var description = new Object();
		description.div = descriptionDiv;
		description.title = descriptionTitle;
		description.text = descriptionText;
		gallery_.description = description;

		stageDiv.appendChild(descriptionDiv);
		descriptionDiv.appendChild(descriptionTitle);
		descriptionDiv.appendChild(horizontalBar);
		descriptionDiv.appendChild(descriptionText);
		//============================================

	}
}
