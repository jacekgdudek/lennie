var collider = new Collider();

function Collider()
{
	this.collidePointEasel = function(object, mousePos)
	{
		if(object.hitTest(mousePos.stageX - object.x, mousePos.stageY - object.y)) return true;
		return false;
	}
}