
var body;
var scenes = {};
var currentScene;

var mainTimer;
var refreshTime = 30;

function onLoad(){

	body = document.getElementById('body-content');

	console.log("starting");

	navBar = new NavigationBar();
	navBar.init();

	//var presentationStage = new createjs.Stage("presentation-canvas");
	//presentation = new PhotoPresentation(presentationStage);
	//presentation.init()

	//introAnimation = new IntroAnimation();
	//introAnimation.init();

	initScenes();
	swapScene("home");

	mainTimer = setInterval(function () {

		//introAnimation.update();
		navBar.update();
		//presentation.update();

		scenes[currentScene].update();

		}, refreshTime );

}

function initScenes()
{
	var homeScene = new HomeScene();
	scenes["home"] = homeScene;

	var blogScene = new BlogScene();
	scenes["blog"] = blogScene;

	var galleryScene = new GalleryScene();
	scenes["gallery"] = galleryScene;
}

function swapScene(scene)
{
	if(typeof currentScene === 'undefined')
	{
		//first
		currentScene = scene;
		scenes[currentScene].init();
	}
	else
	{
		//next
		if(scene != currentScene)
		{
			scenes[currentScene].finalize();
			currentScene = scene;
			scenes[currentScene].init();
		}
	}

	var id = 0;
	for(var key in scenes)
	{
		if(currentScene == key)
		{
			break;
		}
		id++;
	}

	document.getElementById("nav-bar-highlight-current").style.left = parseInt(document.getElementById("nav-bar-div").children[1+id].style.left, 10) -5 + "px";
	document.getElementById("nav-bar-highlight-current").style.width = document.getElementById("nav-bar-div").children[1+id].offsetWidth + 10 + "px";

	
}






