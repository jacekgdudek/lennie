function GalleryScene()
{
	var stageCanvas;
	var stage;
	var gallery = new Object();
	var currentImage;

	this.init = function()
	{
		currentImage = 0;
		//newsList = structure.news;
		constructCanvas(structure.gallery);
		constructGallery(structure.gallery);
	}

	this.update = function()
	{
		stage.update();
	}

	this.finalize = function()
	{
		while (body.hasChildNodes()) {
    		body.removeChild(body.lastChild);
		}

		stageCanvas = {};

		body.style.visibility = "hidden";

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
		stageCanvas = document.createElement("canvas");
		stageCanvas.id = "galleryCanvas";
		stageCanvas.width = gallery.width;
		stageCanvas.height = gallery.height;
		stageCanvas.style.paddingLeft = (800-gallery.width)/2;
		stageCanvas.style.position = "absolute";
		stageCanvas.style.top = gallery.height/2 - parseInt(body.style.height,10)/2 + "px";// - gallery.height/2 + "px";
		stageCanvas.style.left = parseInt(body.style.width,10)/2 - gallery.width/2 + "px";;
		//stageCanvas.style.position = "absolute";
		body.appendChild(stageCanvas);

		stage = new createjs.Stage("galleryCanvas");

		stage.onMouseMove = function(mousePos) {
			//hintsOnMove(mousePos);
		}

		stage.onMouseDown = function(mousePos) {
			//hintsOnDown(mousePos);
		}

	}


	function constructGallery(gallery)
	{
		//load images
		var images = new Array();
		for(var i = 0; i < 8 ; i++)
		{
			var newImage = new createjs.Bitmap(gallery.photos + i + ".JPG");
			images.push(newImage);
		}
		gallery.images = images;

		//prepare arrows
		var arrows = new Array();

		var arrowLeft = new Object();
		arrowLeft.bitmap = new createjs.Bitmap(gallery.arrows + ".png");
		arrowLeft.bkg = new createjs.Shape();
		arrowLeft.bkg.graphics.beginFill("rgba(0,0,0,0.5)").drawRect(0,0,80,600);
		arrowLeft.bitmap.x = 10;
		arrowLeft.bitmap.y = 200;
		arrowLeft.bitmap.scaleX = 0.1;
		arrowLeft.bitmap.scaleY = arrowLeft.bitmap.scaleX;

		var arrowRight = new Object();//createjs.Bitmap(gallery.arrows);
		arrowRight.bitmap = new createjs.Bitmap(gallery.arrows + ".png");
		arrowRight.bkg = new createjs.Shape();
		arrowRight.bkg.graphics.beginFill("rgba(0,0,0,0.5)").drawRect(620,0,80,600);
		arrowRight.bitmap.x = 690;
		arrowRight.bitmap.y = 235;
		arrowRight.bitmap.rotation = 180;
		arrowRight.bitmap.scaleX = 0.1;
		arrowRight.bitmap.scaleY = arrowRight.bitmap.scaleX;

		arrows.push(arrowLeft);
		arrows.push(arrowRight);

		gallery.arrows = arrows;
		stage.addChild(arrowLeft.bkg , arrowLeft.bitmap , arrowRight.bkg , arrowRight.bitmap);
	}
}
