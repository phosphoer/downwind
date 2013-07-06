(function (global, TANK)
{
	"use strict";

	TANK.registerComponent("Controller")

	.requires("Boat")

	.construct(function ()
	{
		this.left = 0;
		this.right = 0;
	})

	.initialize(function ()
	{
		this.addEventListener("OnKeyPress", function (key)
		{
			if (key === TANK.LEFT_ARROW || key === TANK.A)
			{
				this.left = 1;
			}
			else if (key === TANK.RIGHT_ARROW || key === TANK.D)
			{
				this.right = 1;
			}

		});

		this.addEventListener("OnKeyRelease", function (key)
		{
			if (key === TANK.LEFT_ARROW || key === TANK.A)
			{
				this.left = 0;
			}
			else if (key === TANK.RIGHT_ARROW || key === TANK.D)
			{
				this.right = 0;
			}
		});

		this.addEventListener("OnEnterFrame", function (dt)
		{
			this.parent.Boat.turn = this.left - this.right;
		});
	});

}(this, this.TANK = this.TANK ||
{}));