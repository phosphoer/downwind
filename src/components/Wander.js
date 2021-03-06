(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("Wander")

  .requires("Boat")

  .construct(function ()
  {
    this.et = 0;
    this.turnTime = 10;
  })

  .initialize(function ()
  {
    this.parent.Boat.throttle = 1;
    this.parent.Boat.forwardSpeed = 15;
    this.parent.Boat.turnSpeed = .003;

    this.addEventListener("OnEnterFrame", function (dt)
    {
      if (this.parent.Boat.health <= 0)
        this.parent.Boat.throttle = 0;

      this.et += dt;
      if (this.et > this.turnTime)
      {
        this.et = 0;
        this.turnTime = 10 + global.Math.random() * 20;
        this.parent.Boat.turn = global.Math.round(-1 + global.Math.random() * 2);
      }
    });
  });

}(this, this.TANK = this.TANK ||
{}));