(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("Bouyant")

  .requires("Transform")

  .construct(function ()
  {
    this.percent = 0.8;
  })

  .initialize(function ()
  {
    // Float on Ocean
    this.addEventListener("OnEnterFrame", function (dt)
    {
      var t = this.parent.Transform;
      var obj = this.space.getEntity("Ocean");
      if (obj)
      {
        var height = obj.Ocean.getHeight(t.position.x, t.position.z);
        height += (this.parent.Model.sizeY * this.parent.Transform.scale.y) * 0.5 * this.percent;
        t.position.y += (height - t.position.y) * 0.08;
      }
    });
  });

}(this, this.TANK = this.TANK ||
{}));