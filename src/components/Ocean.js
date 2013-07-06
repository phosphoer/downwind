(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("Ocean")

  .construct(function ()
  {
    this.node = new THREE.Object3D();;
    this.cubeScale = 10;
    this.patchSize = 10;
    this.cubes = {};
  })

  .initialize(function ()
  {
    var g = this.space.Graphics;

    this.node.position = new THREE.Vector3(0, 0, 0);
    g.scene.add(this.node);

    for (var i = 0; i < this.patchSize; ++i)
    {
      this.cubes[i] = {};
      for (var j = 0; j < this.patchSize; ++j)
      {
        this.cubes[i][j] = new global.THREE.Mesh(g.unitCube, new global.THREE.MeshBasicMaterial(
        {
          color: new THREE.Color(0x1133ee),
          wireframe: true
        }));
        this.cubes[i][j].position = new THREE.Vector3(i * this.cubeScale, 0, j * this.cubeScale);
        this.cubes[i][j].scale = new THREE.Vector3(this.cubeScale, this.cubeScale, this.cubeScale);
        this.node.add(this.cubes[i][j]);
      }
    }

    this.addEventListener("OnEnterFrame", OnEnterFrame);
  });

  function OnEnterFrame(dt)
  {

  }

}(this, this.TANK = this.TANK ||
{}));