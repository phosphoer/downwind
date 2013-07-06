(function (global, TANK)
{
	"use strict";

	TANK.createCannonBall = function()
	{
		var cannonBall = TANK.createEntity("Transform", "Model", "CannonBall");
		cannonBall.Model.model = Boat;
		cannonBall.Model.model.sizeX = 10;
		cannonBall.Model.model.sizeY = 10;
		cannonBall.Model.model.sizeZ = 10;
		cannonBall.CannonBall.setVelocity(new global.THREE.Vector3(1, 0, 0));
		return cannonBall;
	}

}(this, this.TANK = this.TANK ||
{}));