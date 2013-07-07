(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("Wind")

  .construct(function ()
  {
    this.et = 0;
    this.direction = new global.THREE.Vector3(1, 0, 0);
  })

  .initialize(function ()
  {
    this.addEventListener("OnEnterFrame", function (dt)
    {
      this.et += dt;
    });
  });

}(this, this.TANK = this.TANK ||
{}));