(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("Boat")

  .requires("Transform")

  .construct(function ()
  {
    this.turn = 0;
    this.throttle = 0;
    this.forwardSpeed = 0;
    this.backwardSpeed = 0;
    this.turnSpeed = 0;
    this.velocity = new THREE.Vector3();
    this.angularVelocity = 0;
  })

  .initialize(function ()
  {
    this.addEventListener("OnEnterFrame", function (dt)
    {
      var t = this.parent.Transform;

      if (this.throttle !== 0)
      {
        var facing = new global.THREE.Vector3(0, 0, 1);
        var q = new global.THREE.Quaternion();
        q.setFromEuler(t.rotation);
        facing.applyQuaternion(q);
        facing.normalize();

        var accel = this.throttle > 0 ? this.forwardSpeed : -this.backwardSpeed;
        facing.multiplyScalar(accel * dt);

        this.velocity.addVectors(this.velocity, facing);
      }

      // Apply linear friction
      this.velocity.multiplyScalar(this.friction);

      // Integrate position
      var vel = this.velocity.clone();
      vel.multiplyScalar(dt);
      t.position.addVectors(t.position, vel);

      if (this.turn !== 0)
      {
        this.angularVelocity += this.turnSpeed * this.turn * dt;
      }

      // Apply angular friction
      this.angularVelocity *= this.friction;

      t.rotation.y += this.angularVelocity * dt;

    });
  });

}(this, this.TANK = this.TANK ||
{}));