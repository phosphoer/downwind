(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("TimedDeath")

  .construct(function ()
  {
    this.time = 3;
  })

  .initialize(function ()
  {
    this.timer = 0;

    this.addEventListener("OnEnterFrame", function (dt)
    {
      this.timer += dt;

      if (this.timer > this.time)
      {
        this.space.removeEntity(this.parent);
      }
    });
  });

}(this, this.TANK = this.TANK ||
{}));