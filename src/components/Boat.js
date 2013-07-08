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
    this.health = 100;

    this.isMother = false;

    this.forwardCache = new global.THREE.Vector3();

    this.fireTime = 1.5;
    this.fireCount = 0;

    // Let the user shoot when the game starts
    this.timer = this.fireTime;

    this.cannonsPerSide = 3;

    this.canfire = false;
  })

  .initialize(function ()
  {
    if (typeof this.parent.Hierarchy !== "undefined")
    {
      this.isMother = true;
    }

    this.attemptFire = function ()
    {
      if (this.canfire && this.timer > this.fireTime)
      {
        var camera = this.space.getEntity("Camera");
        var yaw = camera.Camera.yaw;
        this.space.dispatchEvent("OnAttemptFire", this.parent, yaw, this.fireCount % this.cannonsPerSide);
        this.timer = 0;
        ++this.fireCount;
      }
    }

    this.onCollide = function (other)
    {
      if (other.parent.CannonBall && other.parent.CannonBall.owner != this.parent)
      {
        this.health -= 20;
        other.parent.CannonBall.explode();
      }
    }

    this.addEventListener("OnEnterFrame", function (dt)
    {
      this.timer += dt;

      var t = this.parent.Transform;
      t.getForward(this.forwardCache);

      if (this.health <= 0)
      {
        this.parent.Bouyant.sinking = true;
        if (this.parent.Controller)
          this.parent.removeComponent("Controller");
      }

      var wind = this.space.Wind;

      var windComponent = wind ? wind.direction.dot(this.forwardCache) : 1;
      var forwardForce = this.forwardCache.dot(this.velocity);

      if (windComponent < 0.5)
        windComponent = 0.5;

      if (wind && this.flagObject)
      {
        this.flagObject.Transform.rotation.y = global.Math.atan2(wind.direction.z, wind.direction.x) - this.parent.Transform.rotation.y + global.Math.PI / 2;
      }

      if (this.throttle !== 0)
      {
        var accel = this.throttle > 0 ? this.forwardSpeed : -this.backwardSpeed;
        var force = this.forwardCache.clone();
        force.multiplyScalar(accel * dt * windComponent);
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
        if (this.velocity.length() > 0.001)
        {

          particleEmitter.emitRate = 16 * vel.length() + 1.001;

          vel.normalize();
          particleEmitter.linearVelocity.x = -vel.x * 2;
          particleEmitter.linearVelocity.y = 0;
          particleEmitter.linearVelocity.z = -vel.z * 2;
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

      t.rotation.z = 0.3 * -this.angularVelocity;

      // Apply angular friction
      this.angularVelocity *= this.friction;
      t.rotation.y += this.angularVelocity * dt;
    });
  });

}(this, this.TANK = this.TANK ||
{}));