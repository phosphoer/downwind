(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("Cube")

  .requires("Transform")

  .construct(function ()
  {
    this.material = new global.THREE.MeshBasicMaterial();

    this.mesh = new global.THREE.Mesh(g.unitCube, this.material);
  });

  .initialize(function ()
  {
    var g = self.space.Graphics;

    this.parent.Transform.object3d.add(this.mesh);

    g.scene.add(this.mesh);
  })

  .destruct(function ()
  {
    this.parent.Transform.object3d.remove(this.mesh);
  });

}(this, this.TANK = this.TANK ||
{}));