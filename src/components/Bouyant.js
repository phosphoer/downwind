(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("Bouyant")

  .requires("Transform")

  .construct(function ()
  {
    this.percent = 0.8;
    this.wobble = false;
    this.et = 0;
    this.wobbleOffset = global.Math.random() * 3;
    this.wobbleSpeed = global.Math.random() * 0.3;
    this.wobbleAmount = global.Math.random() * 0.5;
  })

  .initialize(function ()
  {
    // Float on Ocean
    this.addEventListener("OnEnterFrame", function (dt)
    {
      this.et += dt;

      var t = this.parent.Transform;
      var obj = this.space.getEntity("Ocean");
      if (obj)
      {
        var height = obj.Ocean.getHeight(t.position.x, t.position.z);
        height += (this.parent.Model.sizeY * this.parent.Transform.scale.y) * 0.5 * this.percent;
        t.position.y += (height - t.position.y) * 0.08;
      }

      if (this.wobble)
      {
        t.rotation.x = global.Math.sin((this.et + this.wobbleOffset) * this.wobbleSpeed) * this.wobbleAmount;
      }

    });
  });

}(this, this.TANK = this.TANK ||
{}));