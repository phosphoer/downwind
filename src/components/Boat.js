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
    this.velocity = new global.THREE.Vector3();
    this.angularVelocity = 0;
  })

  .initialize(function ()
  {
    this.addEventListener("OnEnterFrame", function (dt)
    {
      var t = this.parent.Transform;
      var facing = t.getForward();

      if (this.throttle !== 0)
      {
        var accel = this.throttle > 0 ? this.forwardSpeed : -this.backwardSpeed;
        var force = facing.clone();
        force.multiplyScalar(accel * dt);
        this.velocity.addVectors(this.velocity, force);
      }

      // Apply linear friction
      this.velocity.multiplyScalar(this.friction);

      var forwardForce = facing.dot(this.velocity);

      // Integrate position
      var vel = this.velocity.clone();
      vel.multiplyScalar(dt);
      t.position.addVectors(t.position, vel);

      if (this.turn !== 0)
      {
        this.angularVelocity += forwardForce * this.turnSpeed * this.turn * dt;
      }

      t.rotation.z = -this.angularVelocity;

      // Apply angular friction
      this.angularVelocity *= this.friction;

      t.rotation.y += this.angularVelocity * dt;

      // Float on Ocean
      var obj = this.space.getEntity("Ocean");
      if (obj)
      {
        var height = obj.Ocean.getHeight(t.position.x, t.position.z);
        height += (this.parent.Model.sizeY * this.parent.Model.mesh.scale.y) * 0.75;
        t.position.y += (height - t.position.y) * 0.05;
      }

    });
  });

}(this, this.TANK = this.TANK ||
{}));