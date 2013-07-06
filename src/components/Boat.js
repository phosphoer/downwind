(function (global, TANK)
{
	"use strict";

	TANK.registerComponent("Boat")

	.construct(function ()
	{
		this.turn = 0;
	})

	.initialize(function ()
	{
		this.addEventListener("OnEnterFrame", function (dt)
		{
			this.parent.Transform.rotation.y += this.turn * dt;
		});
	});

}(this, this.TANK = this.TANK ||
{}));