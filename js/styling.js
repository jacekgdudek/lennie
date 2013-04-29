function mouseOver(object)
{
	var oldSize = object.clientWidth;
	object.style.fontSize = "24px";
	document.body.style.cursor = "pointer";
	object.parentNode.style.left = parseInt(object.parentNode.style.left, 10) + (oldSize/2-object.clientWidth/2) + "px";

	//move highlight
	moveHighlight(object);
}

function mouseOut(object)
{
	var oldSize = object.clientWidth;
	object.style.fontSize = "24px";
	document.body.style.cursor = "auto";
	object.parentNode.style.left = parseInt(object.parentNode.style.left, 10) + (oldSize/2-object.clientWidth/2) + "px";
}

function moveHighlight(object)
{
	var highlight = document.getElementById("nav-bar-highlight");

	//get child id
	var id = object.parentNode.id.replace(/nav-bar-child-/gi, '');

	highlight.state = "moveTo" + id;
}