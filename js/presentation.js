function PhotoPresentation(stage_)
{
	var stage = stage_;
	var presentation = new Object();
	var frame = new createjs.Shape();

	var currentPhoto = 0;
	var presentationDelay = 0;
	var presentationThreshold = 120;

	this.init = function()
	{
		constructPresentation(structure.presentation);
	}

	this.update = function()
	{
		presentationDelay++;
		if(presentationDelay > presentationThreshold)
		{
			getNextImage();
			presentationDelay = 0;
		}
		else
		{
			updateCurrentImage(presentationDelay, presentationThreshold);
		}

		//crossfade();

		stage.update();
	}

	function updateCurrentImage(delay, threshold)
	{
		//stage.removeChild(presentation.photos[currentPhoto]);

		presentation.photos[currentPhoto].x = -presentation.photos[currentPhoto].initX + delay*presentation.photos[currentPhoto].vector[0] ;
		presentation.photos[currentPhoto].y = -presentation.photos[currentPhoto].initY + delay*presentation.photos[currentPhoto].vector[1] ;

		//stage.addChild(presentation.photos[newPhotoId]);
	}

	function getNextImage()
	{
		var newPhotoId = currentPhoto+1;
		if(newPhotoId >= presentation.photos.length)
		{
			newPhotoId = 0;
		}
		stage.removeChild(presentation.photos[currentPhoto]);
		
		presentation.photos[newPhotoId].x = -presentation.photos[newPhotoId].initX;
		presentation.photos[newPhotoId].y = -presentation.photos[newPhotoId].initY;

		stage.addChild(presentation.photos[newPhotoId]);
		//frame = new createjs.Shape();
		//frame.graphics.beginBitmapFill(presentation.photos[newPhotoId]).drawRect(presentation.photos[newPhotoId].initX, presentation.photos[newPhotoId].initY, presentation.photos[newPhotoId].initW, presentation.photos[newPhotoId].initH);
		//stage.addChild(frame);


		currentPhoto = newPhotoId;
	}

	function constructPresentation(struct)
	{
		var photos = new Array();
		for(var i = 0; i < struct.photos.length ; i++)
		{
			var newPhoto = new createjs.Bitmap(struct.photos[i].src);
			//newPhoto.src = struct.photos[i].src;
			newPhoto.initX = struct.photos[i].initX;
			newPhoto.initY = struct.photos[i].initY;
			newPhoto.scaleX = struct.photos[i].scaleX;
			newPhoto.scaleY = struct.photos[i].scaleY;
			newPhoto.vector = struct.photos[i].vector;
			//newPhoto.alpha = 0;
			photos.push(newPhoto);
			//stage.addChild(newPhoto);
		}
		presentation.photos = photos;

		//setup new picture
		presentation.photos[0].x = -presentation.photos[0].initX;
		presentation.photos[0].y = -presentation.photos[0].initY;
		stage.addChild(presentation.photos[0]);
	}

	function crossfade()
	{
		var length = 0.2;

		var progress = presentationDelay/presentationThreshold;

		if (progress < length) {

			var previousId = currentPhoto - 1;
			if(previousId < 0) previousId = presentation.photos.length-1;
			//=================================================
			presentation.photos[previousId].alpha = (1-(progress))/(length);

			//fade out previous
			//presentation.photos[currentPhoto].alpha = (progress)/(length);
			//====================================fade in current
			//console.log("fading out");
			
		}
		else
		{
			var previousId = currentPhoto - 1;
			if(previousId < 0) previousId = presentation.photos.length-1;
			//=================================================
			presentation.photos[previousId].alpha = 0;

			var newId = currentPhoto + 1;
			if(newId >= presentation.photos.length) newId = 0;
			presentation.photos[newId].alpha = 0

		}
	}
}