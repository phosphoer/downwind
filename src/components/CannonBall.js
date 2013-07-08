(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("CannonBall")

  .requires("Transform")

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
    this.explode = function ()
    {
      var explosion = TANK.createExplosion(this.parent.Transform.position);
      this.space.addEntity(explosion);
      this.space.removeEntity(this.parent);
      if (global.Math.random() < 0.5)
        this.space.Gameplay.explode1Sound.play();
      else
        this.space.Gameplay.explode2Sound.play();
    }

    this.splash = function ()
    {
      this.space.removeEntity(this.parent);
      this.space.Gameplay.splashSound.play();
    }

    // add movement
    this.addEventListener("OnEnterFrame", function (dt)
    {
      var t = this.parent.Transform;

      this.velocity.y += this.gravity * dt;

      // Integrate position
      var vel = this.velocity.clone();


      vel.multiplyScalar(dt);
      t.position.add(vel);

      // Check for collision with ocean
      var obj = this.space.getEntity("Ocean");
      if (obj)
      {
        if (t.position.y < obj.Ocean.getHeight(t.position.x, t.position.z))
          this.splash();
      }
    });


  });

}(this, this.TANK = this.TANK ||
{}));