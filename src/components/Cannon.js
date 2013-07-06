(function (global, TANK)
{
	"use strict";

	TANK.registerComponent("Cannon")

	.requires("Transform")

	.construct(function ()
	{
	})

	.initialize(function ()
	{
		this.addEventListener("OnKeyRelease", function (key)
		{
			if (key === TANK.SPACE || key === TANK.F)
			{
				// fire a cannonball!
				this.space.addEntity(TANK.createCannonBall(this.parent.Transform));
			}
		});


	});

}(this, this.TANK = this.TANK ||
{}));
		