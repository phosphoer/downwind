(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("Box")

  .requires("Transform")

  .construct(function ()
  {
    this.diffuse = new THREE.Color();
  })

  .initialize(function ()
  {
    var g = this.space.Graphics;

    this.mesh = new global.THREE.Mesh(g.unitCube, new global.THREE.MeshBasicMaterial(
    {
      color: this.diffuse,
      wireframe: true
    }));

    var t = this.parent.Transform;
    this.mesh.rotation = t.rotation;
    this.mesh.position = t.position;
    this.mesh.scale = t.scale;
    g.scene.add(this.mesh);
  });

}(this, this.TANK = this.TANK ||
{}));