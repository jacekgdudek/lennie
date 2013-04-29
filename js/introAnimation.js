var timeForBarSlideIn = 0;
var timeForFadeIn = 30;
var delayForBarSlideIn = 0;
var delayForFadeIn = 10;

var counter = 0;

function IntroAnimation()
{
	var bkgImg;
	//var navBar;

	this.init = function()
	{
		//bkgImg = document.getElementById("main-background");
		//navBar = document.getElementById("nav-bar-div");

		//navBar.style.left = window.innerWidth + "px";

		if(timeForBarSlideIn == 0)
		{
			//navBar.style.left = "0px";
		}

	}

	this.update = function()
	{
		if(counter < timeForBarSlideIn+1+delayForBarSlideIn && counter > delayForBarSlideIn)
		{
			//navBar.style.left = (window.innerWidth*((timeForBarSlideIn-(counter-delayForBarSlideIn))/timeForBarSlideIn)) + "px";
		}
		if(counter < timeForFadeIn+1+delayForFadeIn && counter > delayForFadeIn)
		{
			//bkgImg.style.opacity = 1-0.5*((counter-delayForFadeIn)/timeForFadeIn);
			
		}

		if(counter < 300) counter++;
		
	}

	this.finalize = function()
	{


	}

	//=======================PRIV

}