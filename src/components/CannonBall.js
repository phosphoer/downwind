(function (global, TANK)
{
	"use strict";

	TANK.registerComponent("CannonBall")

	.requires("Transform")

	.construct(function ()
	{

		this.velocity = new THREE.Vector3();
		this.defaultSpeed = 100;

		this.setVelocity = function(orientation, speed)
		{
			if (typeof speed === "undefined")
			{
				speed = this.defaultSpeed;
			}
			if (typeof orientation === "undefined")
			{
				orientation = this.parent.Transform.getFacing();
			}
			// make the velocity incorporate the positioning
			this.velocity.copy(orientation);
			this.velocity.multiplyScalar(speed);
		}
	})

	.initialize(function ()
	{
		// add movement
		this.addEventListener("OnEnterFrame", function (dt)
		{
			var t = this.parent.Transform;

			// Integrate position
			var vel = this.velocity.clone();
			vel.multiplyScalar(dt);
			t.position.add(vel);
		});


	});

}(this, this.TANK = this.TANK ||
{}));