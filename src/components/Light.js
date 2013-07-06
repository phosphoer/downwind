(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("Light")

  .requires("Transform")

  .construct(function ()
  {
    this.diffuse = 0xffffff;
  })

  .initialize(function ()
  {
    var g = this.space.Graphics;

    this.light = new global.THREE.PointLight(0xffffff, 1, 50);

    // var t = this.space.getEntity("Boat").Transform;
    // this.light.position = new THREE.Vector3(0, 0, 0);

    g.scene.add(this.light);
  });

}(this, this.TANK = this.TANK ||
{}));