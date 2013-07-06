(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("Ocean")

  .requires("Transform")

  .construct(function ()
  {
    this.node = new THREE.Object3D();;
    this.cubeScale = 10;
    this.patchSize = 10;
    this.numPatches = 3;
    this.patches = {};
  })

  .initialize(function ()
  {
    var g = this.space.Graphics;

    this.node.position = this.parent.Transform.position;
    g.scene.add(this.node);

    for (var x = 0; x < this.numPatches; ++x)
    {
      this.patches[x] = {};
      for (var z = 0; z < this.numPatches; ++z)
      {
        this.patches[x][z] = {};
        var patch = this.patches[x][z];
        patch.node = new THREE.Object3D();
        patch.node.position = new THREE.Vector3(x * this.patchSize * this.cubeScale, 0, z * this.patchSize * this.cubeScale);
        patch.cubes = {};
        this.node.add(patch.node);

        for (var i = 0; i < this.patchSize; ++i)
        {
          patch.cubes[i] = {};
          for (var j = 0; j < this.patchSize; ++j)
          {
            patch.cubes[i][j] = new global.THREE.Mesh(g.unitCube, new global.THREE.MeshBasicMaterial(
            {
              color: new THREE.Color(0x1133ee),
              wireframe: true
            }));
            patch.cubes[i][j].position = new THREE.Vector3(i * this.cubeScale, 0, j * this.cubeScale);
            patch.cubes[i][j].scale = new THREE.Vector3(this.cubeScale, this.cubeScale, this.cubeScale);
            patch.node.add(patch.cubes[i][j]);
          }
        }
      }
    }


    this.addEventListener("OnEnterFrame", OnEnterFrame);
  });

  function OnEnterFrame(dt)
  {
    var camera = TANK.Game.getEntity("Boat");
    var myPos = this.parent.Transform.position;
  }

}(this, this.TANK = this.TANK ||
{}));