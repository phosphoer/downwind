(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("Ocean")

  .requires("Transform")

  .construct(function ()
  {
    this.node = new THREE.Object3D();
    this.cubeScale = 50;
    this.patchSize = 15;
    this.numPatches = 3;
    this.speedX = 0.3;
    this.speedY = 0.4;
    this.freqX = 0.01;
    this.freqY = 0.01;
    this.heightX = 2;
    this.heightY = 2.5;
    this.totalSize = this.numPatches * this.patchSize * this.cubeScale;
    this.patches = {};
    this.et = 0;
  })

  .initialize(function ()
  {
    var g = this.space.Graphics;

    this.node.position = this.parent.Transform.position;
    g.scene.add(this.node);

    var light = new global.THREE.HemisphereLight(0xCCFFFF, 0x2F4F8F, 0.5);
    g.scene.add(light);

    var mat = new global.THREE.MeshLambertMaterial(
    {
      color: 0x1C6BA0
    });

    var cubeGeometry = new global.THREE.CubeGeometry(1, 1, 1);

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
            patch.cubes[i][j] = new global.THREE.Mesh(cubeGeometry, mat);
            patch.cubes[i][j].position = new THREE.Vector3(i * this.cubeScale, 0, j * this.cubeScale);
            patch.cubes[i][j].scale = new THREE.Vector3(this.cubeScale, 30, this.cubeScale);
            patch.node.add(patch.cubes[i][j]);
          }
        }
      }
    }

    this.node.position.x = -this.numPatches * this.patchSize * this.cubeScale * 0.5;
    this.node.position.z = -this.numPatches * this.patchSize * this.cubeScale * 0.5;

    this.scrollLeft = function ()
    {
      for (var i = 0; i < this.numPatches; ++i)
      {
        var fromPatch = this.patches[this.numPatches - 1][i];

        for (var j = this.numPatches - 1; j > 0; --j)
        {
          this.patches[j][i] = this.patches[j - 1][i];
        }

        this.patches[0][i] = fromPatch;
        fromPatch.node.position.x -= this.numPatches * this.patchSize * this.cubeScale;
      }
    };

    this.scrollRight = function ()
    {
      for (var i = 0; i < this.numPatches; ++i)
      {
        var fromPatch = this.patches[0][i];

        for (var j = 0; j < this.numPatches - 1; ++j)
        {
          this.patches[j][i] = this.patches[j + 1][i];
        }

        this.patches[this.numPatches - 1][i] = fromPatch;
        fromPatch.node.position.x += this.numPatches * this.patchSize * this.cubeScale;
      }
    };

    this.scrollUp = function ()
    {
      for (var i = 0; i < this.numPatches; ++i)
      {
        var fromPatch = this.patches[i][this.numPatches - 1];

        for (var j = this.numPatches - 1; j > 0; --j)
        {
          this.patches[i][j] = this.patches[i][j - 1];
        }

        this.patches[i][0] = fromPatch;
        fromPatch.node.position.z -= this.numPatches * this.patchSize * this.cubeScale;
      }
    };

    this.scrollDown = function ()
    {
      for (var i = 0; i < this.numPatches; ++i)
      {
        var fromPatch = this.patches[i][0];

        for (var j = 0; j < this.numPatches - 1; ++j)
        {
          this.patches[i][j] = this.patches[i][j + 1];
        }

        this.patches[i][this.numPatches - 1] = fromPatch;
        fromPatch.node.position.z += this.numPatches * this.patchSize * this.cubeScale;
      }
    };

    this.animateWaves = function (dt)
    {
      this.et += dt;

      var cubePos = new THREE.Vector3(0, 0, 0);
      for (var x = 0; x < this.numPatches; ++x)
      {
        for (var z = 0; z < this.numPatches; ++z)
        {
          var patch = this.patches[x][z];
          for (var i = 0; i < this.patchSize; ++i)
          {
            for (var j = 0; j < this.patchSize; ++j)
            {
              var cube = patch.cubes[i][j];
              cubePos.x = cube.position.x + patch.node.position.x + this.node.position.x;
              cubePos.z = cube.position.z + patch.node.position.z + this.node.position.z;
              cube.position.y = global.Math.cos(this.et * this.speedX + cubePos.x * this.freqX) * this.heightX *
                global.Math.sin(this.et * this.speedY + cubePos.z * this.freqY) * this.heightY;
            }
          }
        }
      }
    };

    this.getHeight = function (x, z)
    {
      x -= this.parent.Transform.position.x;
      z -= this.parent.Transform.position.z;

      x -= this.patches[0][0].node.position.x;
      z -= this.patches[0][0].node.position.z;

      var patchX = Math.floor(x / (this.patchSize * this.cubeScale));
      var patchZ = Math.floor(z / (this.patchSize * this.cubeScale));

      x += this.patches[0][0].node.position.x;
      z += this.patches[0][0].node.position.z;

      var patch = this.patches[patchX][patchZ];
      x -= patch.node.position.x;
      z -= patch.node.position.z;
      x = Math.floor(x / this.cubeScale);
      z = Math.floor(z / this.cubeScale);

      var cube = patch.cubes[x][z];
      return cube.position.y;
    }

    this.addEventListener("OnEnterFrame", OnEnterFrame);
  });

  function OnEnterFrame(dt)
  {
    var camera = TANK.Game.getEntity("Boat");
    var camPos = camera.Transform.position;
    var myPos = this.parent.Transform.position;

    this.animateWaves(dt);

    // Scroll the map
    if (camPos.x - myPos.x < this.patches[this.numPatches - 1][0].node.position.x - this.patchSize * this.cubeScale)
      this.scrollLeft();
    if (camPos.x - myPos.x > this.patches[0][0].node.position.x + 2 * this.patchSize * this.cubeScale)
      this.scrollRight();
    if (camPos.z - myPos.z < this.patches[0][this.numPatches - 1].node.position.z - this.patchSize * this.cubeScale)
      this.scrollUp();
    if (camPos.z - myPos.z > this.patches[0][0].node.position.z + 2 * this.patchSize * this.cubeScale)
      this.scrollDown();
  }

}(this, this.TANK = this.TANK ||
{}));