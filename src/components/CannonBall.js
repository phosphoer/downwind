(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("CannonBall")

  .requires("Transform")

  .construct(function ()
  {

    this.velocity = new THREE.Vector3();
    this.defaultSpeed = 100;

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