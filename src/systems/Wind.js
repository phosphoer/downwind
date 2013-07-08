(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("Wind")

  .construct(function ()
  {
    this.et = 0;
    this.windChangeInterval = 10;
    this.direction = new global.THREE.Vector3(0, 0, 1);
    this.newDirection = new global.THREE.Vector3(0, 0, 1);
  })

  .initialize(function ()
  {
    this.addEventListener("OnEnterFrame", function (dt)
    {
      this.et += dt;

      if (this.et > this.windChangeInterval)
      {
        var angle = global.Math.random() * global.Math.PI * 2;
        this.newDirection.x = global.Math.cos(angle);
        this.newDirection.z = global.Math.sin(angle);
        this.et = 0;
        this.windChangeInterval = 10 + global.Math.random() * 20;
      }

      this.direction.lerp(this.newDirection, 0.005);
    });
  });

}(this, this.TANK = this.TANK ||
{}));