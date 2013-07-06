(function (global, TANK)
{
	"use strict";

	TANK.registerComponent("Boat")

	.construct(function ()
	{
		this.turn = 0;
		this.throttle = false;
		this.velocity = new THREE.Vector3();
	})

	.initialize(function ()
	{
		this.addEventListener("OnEnterFrame", function (dt)
		{
			var t = this.parent.Transform;
			t.rotation.y += this.turn * dt;

			if (this.throttle)
			{
				var facing = new global.THREE.Vector3(0, 0, 1);
				var q = new global.THREE.Quaternion();
				q.setFromEuler(t.rotation);
				facing.applyQuaternion(q);
				facing.normalize();
				facing.multiplyScalar(this.acceleration * dt);

				this.velocity.addVectors(this.velocity, facing);
			}

			// Apply linear friction
			this.velocity.multiplyScalar(this.friction);

			// Integrate position
			var vel = this.velocity.clone();
			vel.multiplyScalar(dt);
			t.position.addVectors(t.position, vel);
		});
	});

}(this, this.TANK = this.TANK ||
{}));