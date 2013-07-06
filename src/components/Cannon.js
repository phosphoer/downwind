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

				// add cannon specific positioning to the boat's transform
				var worldOffset = t.pointLocalToWorld(this.offset);

				var direction = this.orientation;
				direction.add(t.getForward());

				this.space.addEntity(TANK.createCannonBall(worldOffset, direction));
			}
		});


	});

}(this, this.TANK = this.TANK ||
{}));
		