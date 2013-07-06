(function (global, TANK)
{
	"use strict";

	TANK.registerComponent("Physics")

	.initialize(function ()
	{
		this.colliders = {};

		this.addEventListener("OnEnterFrame", function (dt)
		{
			var colliders = [];
			for (var c in this.colliders)
			{
				if (this.colliders.hasOwnProperty(c))
				{
					colliders.push(this.colliders[c]);
				}
			}

			var i, j, a, b;
			for (i = 0; i < colliders.length; ++i)
			{
				for (j = i + 1; j < colliders.length; ++j)
				{
					a = colliders[i];
					b = colliders[j];

					if (isColliding(a, b))
					{
						a.material.color.setRGB(1, 0, 0);
						b.material.color.setRGB(1, 0, 0);
					}
				}
			}

		});
	});

	function isColliding(a, b)
	{
		var d = a.position.distanceTo(b.position);
		return d < a.radius + b.radius;
	}

}(this, this.TANK = this.TANK ||
{}));