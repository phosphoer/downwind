(function (global, TANK)
{
  "use strict";

  var sphere = new global.THREE.SphereGeometry(1.0, 22, 22);

  TANK.registerComponent("ModelCollider")

  .requires("Model")

  .construct(function ()
  {
    this.scale = 1;
  })

  .initialize(function ()
  {
    var g = this.space.Graphics;
    var p = this.space.Physics;
    var t = this.parent.Transform;

    p.colliders[this.parent.id] = this;

    this.material = new global.THREE.MeshBasicMaterial(
    {
      color: this.parent.Model.materialDiffuse,
      wireframe: true
    });
    this.mesh = new global.THREE.Mesh(sphere, this.material);

    this.mesh.rotation = t.rotation;
    this.mesh.position = t.position;
    g.scene.add(this.mesh);

    this.position = t.position;

    var temp = new THREE.Vector3();
    this.addEventListener("OnEnterFrame", function (dt)
    {
      temp.x = t.scale.x * this.parent.Model.model.sizeX;
      temp.y = t.scale.y * this.parent.Model.model.sizeY;
      temp.z = t.scale.z * this.parent.Model.model.sizeZ;

      this.radius = temp.length() / 2;
      this.mesh.scale.set(this.radius, this.radius, this.radius);
    });
  })

  .destruct(function ()
  {
    delete this.space.Physics.colliders[this.parent.id];
  });

}(this, this.TANK = this.TANK ||
{}));