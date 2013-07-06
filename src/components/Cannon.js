(function (global, TANK)
{
	"use strict";

	TANK.registerComponent("Cannon")

	.requires("Transform")

	.construct(function ()
	{
		this.offset = new global.THREE.Vector3(0,0,0);
		this.orientation = new global.THREE.Vector3(0,0,0);
	})

	.initialize(function ()
	{
		this.addEventListener("OnFiring", function (object)
		{
			if (object === this.parent)
			{
				// fire a cannonball!
				var t = this.parent.Transform;
				var cannon = {position: t.position.clone(), rotation: t.rotation.clone()};
				// add cannon specific positioning to the boat's transform
				var offset = this.offset.clone();
				cannon.position.add(offset);
				cannon.rotation.copy(this.orientation);
				this.space.addEntity(TANK.createCannonBall(cannon));
			}
		});


	});

}(this, this.TANK = this.TANK ||
{}));
		