(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("CannonBall")

  .requires("Transform, TimedDeath")

  .construct(function ()
  {
    this.velocity = new THREE.Vector3();
    this.defaultSpeed = 180;
    this.gravity = -90;

    this.setVelocity = function (direction, speed)
    {
      if (typeof speed === "undefined")
      {
        speed = this.defaultSpeed;
      }

      // make the velocity incorporate the positioning
      this.velocity.copy(direction);
      this.velocity.multiplyScalar(speed);
    }
  })

  .initialize(function ()
  {
    this.parent.TimedDeath.runOnDeath = function (entity)
    {
      var explosion = TANK.createExplosion(entity.Transform.position);
      this.space.addEntity(explosion);
    };

    // add movement
    this.addEventListener("OnEnterFrame", function (dt)
    {
      var t = this.parent.Transform;

      this.velocity.y += this.gravity * dt;

      // Integrate position
      var vel = this.velocity.clone();


      vel.multiplyScalar(dt);
      t.position.add(vel);
    });


  });

}(this, this.TANK = this.TANK ||
{}));