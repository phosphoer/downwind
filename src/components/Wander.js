(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("Wander")

  .requires("Boat")

  .initialize(function ()
  {
    var turn = Math.random() > 0.5 ? 1 : -1;

    this.parent.Boat.turn = turn;
    this.parent.Boat.throttle = 1;
    this.addEventListener("OnEnterFrame", function (dt) {

    });
  });

}(this, this.TANK = this.TANK ||
{}));