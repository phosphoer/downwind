(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("Box")

  .requires("Model")

  .construct(function ()
  {
    this.diffuse = new global.THREE.Color();
    this.scale = new global.THREE.Vector3(1, 1, 1);
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
    this.mesh.scale = this.scale;
    g.scene.add(this.mesh);

    this.addEventListener("OnEnterFrame", function (dt)
    {
      this.scale.x = t.scale.x * this.parent.Model.model.sizeX;
      this.scale.y = t.scale.y * this.parent.Model.model.sizeY;
      this.scale.z = t.scale.z * this.parent.Model.model.sizeZ;

    });
  });

}(this, this.TANK = this.TANK ||
{}));