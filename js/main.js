
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

	var presentationStage = new createjs.Stage("presentation-canvas");
	presentation = new PhotoPresentation(presentationStage);
	presentation.init()

	introAnimation = new IntroAnimation();
	introAnimation.init();

	initScenes();
	swapScene("home");

	mainTimer = setInterval(function () {

		introAnimation.update();
		navBar.update();
		presentation.update();

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
	
}