(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("Light")

  .requires("Transform")

  .construct(function ()
  {
    this.diffuse = 0xffffff;
    this.offset = new global.THREE.Vector3(0, 0, 0);
  })

  .initialize(function ()
  {
    var g = this.space.Graphics;

    this.light = new global.THREE.PointLight(this.diffuse, 1, 100);
    this.light.position = new global.THREE.Vector3(0, 0, 0);

    g.scene.add(this.light);

    this.addEventListener("OnEnterFrame", function (dt)
    {
      var t = this.parent.Transform;
      this.light.position.x = t.position.x + this.offset.x;
      this.light.position.y = t.position.y + this.offset.y;
      this.light.position.z = t.position.z + this.offset.z;
    });
  });

}(this, this.TANK = this.TANK ||
{}));