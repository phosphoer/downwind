(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("OrientToVelocity")

  .requires("Transform")

  .initialize(function ()
  {
    if (!this.velocity)
    {
      throw "Currently the velocity property must be set to a shared Vector3 on OrientToVelocity";
    }

    this.OnEnterFrame = function ()
    {
      var yaw = global.Math.atan2(this.velocity.x, this.velocity.z);
      var pitch = 0;

      this.parent.Transform.rotation.y = yaw;
      this.parent.Transform.rotation.x = pitch;
    };

    // Update it right at the start
    this.OnEnterFrame();

    this.addEventListener("OnEnterFrame", this.OnEnterFrame);
  });

}(this, this.TANK = this.TANK ||
{}));