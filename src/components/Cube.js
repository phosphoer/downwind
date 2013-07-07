(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("Cube")

  .requires("Transform")

  .construct(function ()
  {
    this.material = new global.THREE.MeshBasicMaterial();
  })

  .initialize(function ()
  {
    this.mesh = new global.THREE.Mesh(this.space.Graphics.unitCube, this.material);
    this.parent.Transform.object3d.add(this.mesh);
  })

  .destruct(function ()
  {
    this.mesh.parent.remove(this.mesh);
  });

}(this, this.TANK = this.TANK ||
{}));