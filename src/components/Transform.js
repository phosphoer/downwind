(function (global, TANK)
{
	"use strict";

	TANK.registerComponent("Transform")

	.construct(function ()
	{
		this.position = new global.THREE.Vector3();
		this.rotation = new global.THREE.Vector3();
	});

}(this, this.TANK = this.TANK ||
{}));