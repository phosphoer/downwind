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
    this.sinking = false;
  })

  .initialize(function ()
  {
    // Float on Ocean
    this.addEventListener("OnEnterFrame", function (dt)
    {
      this.et += dt;

      var t = this.parent.Transform;
      var obj = this.space.getEntity("Ocean");
      if (obj && !this.sinking)
      {
        var height = obj.Ocean.getHeight(t.position.x, t.position.z);
        height += (this.parent.Model.sizeY * this.parent.Transform.scale.y) * 0.5 * this.percent;
        t.position.y += (height - t.position.y) * 0.08;
      }

      if (this.wobble && !this.sinking)
      {
        t.rotation.x = global.Math.sin((this.et + this.wobbleOffset) * this.wobbleSpeed) * this.wobbleAmount;
      }

      if (this.sinking)
      {
        t.position.y -= dt;
        if (t.rotation.x > -Math.PI / 3)
          t.rotation.x -= dt * 0.03;
      }

    });
  });

}(this, this.TANK = this.TANK ||
{}));