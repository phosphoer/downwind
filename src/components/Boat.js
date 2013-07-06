(function (global, TANK)
{
	"use strict";

	TANK.registerComponent("Boat")

	.construct(function ()
	{
		this.turn = 0;
		this.throttle = false;
		this.speed = .2;
	})

	.initialize(function ()
	{
		this.addEventListener("OnEnterFrame", function (dt)
		{
			var t = this.parent.Transform;
			t.rotation.y += this.turn * dt;

			var facing = new global.THREE.Vector3(0, 0, 1);
			var q = new global.THREE.Quaternion();
			q.setFromEuler(t.rotation);
			q.multiplyVector3(facing);
			facing.normalize();
			facing.multiplyScalar(this.speed);

			t.position.addVectors(t.position, facing);
		});
	});

}(this, this.TANK = this.TANK ||
{}));