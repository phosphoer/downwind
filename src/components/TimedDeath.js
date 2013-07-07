(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("TimedDeath")

  .construct(function ()
  {
    this.time = 3;
    this.runOnDeath = null;
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

        if (this.runOnDeath)
        {
          this.runOnDeath(this.parent);
        }
      }
    });
  });

}(this, this.TANK = this.TANK ||
{}));