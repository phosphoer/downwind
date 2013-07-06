(function (global, TANK)
{
	"use strict";

	TANK.registerComponent("Cannon")

	.requires("Transform")
	.requires("Model")

	.construct(function ()
	{
	})

	.initialize(function ()
	{
		this.addEventListener("OnFiring", function (object)
		{
			if (object === this.parent.mother)
			{
				// fire a cannonball!
				 var t = this.parent.Transform;

				// // add cannon specific positioning to the boat's transform
				// var worldOffset = t.pointLocalToWorld(this.offset);

				// var direction = this.orientation;
				// direction.add(t.getForward());

				this.space.addEntity(TANK.createCannonBall(t.position, t.getForward()));
			}
		});


	});

}(this, this.TANK = this.TANK ||
{}));
		