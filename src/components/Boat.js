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

    this.isMother = false;

    this.forwardCache = new global.THREE.Vector3();
  })

  .initialize(function ()
  {
    if (typeof this.parent.Hierarchy !== "undefined")
    {
      this.isMother = true;
    }

    this.addEventListener("OnEnterFrame", function (dt)
    {
      var t = this.parent.Transform;
      t.getForward(this.forwardCache);

      var forwardForce = this.forwardCache.dot(this.velocity);

      if (this.throttle !== 0)
      {
        var accel = this.throttle > 0 ? this.forwardSpeed : -this.backwardSpeed;
        var force = this.forwardCache.clone();
        force.multiplyScalar(accel * dt);
        this.velocity.addVectors(this.velocity, force);
      }

      // Apply linear friction
      this.velocity.multiplyScalar(this.friction);


      // Integrate position
      var vel = this.velocity.clone();
      vel.multiplyScalar(dt);
      t.position.addVectors(t.position, vel);

      if (this.isMother) 
      {
          // terrible code, sorry
          var particleEmitter = this.parent.Hierarchy.children[0].ParticleEmitter;
          if (this.throttle !== 0)
          {
            particleEmitter.emitRate = 50 * vel.length() + 0.001;
            particleEmitter.linearVelocity.x = -vel.x;
            particleEmitter.linearVelocity.y = -1.0;
            particleEmitter.linearVelocity.z = -vel.z;
          }
          else
          {
            particleEmitter.emitRate = 0.001;
          }
      }

      if (this.turn !== 0)
      {
        this.angularVelocity += forwardForce * this.turnSpeed * this.turn * dt;
      }

      t.rotation.z = -this.angularVelocity;

      // Apply angular friction
      this.angularVelocity *= this.friction;

      t.rotation.y += this.angularVelocity * dt;

    });
  });

}(this, this.TANK = this.TANK ||
{}));