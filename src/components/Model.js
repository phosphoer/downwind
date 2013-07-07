/*globals THREE */

(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("Model")

  .requires("Transform")

  .construct(function ()
  {
    this.model = null;
    this.bakeAmbientOcclusion = true;
    this.materialDiffuse = 0xFFFFFF;
  })

  .initialize(function ()
  {
    var i;
    var model = this.model;
    this.sizeX = model.sizeX;
    this.sizeY = model.sizeY;
    this.sizeZ = model.sizeZ;

    this.data = [];
    this.data.length = model.data.length;
    for (i = 0; i < this.data.length; ++i)
    {
      this.data[i] = model.data[i];
    }

    this.colors = [];
    this.colors.length = model.colors.length;
    for (i = 0; i < this.colors.length; ++i)
    {
      this.colors[i] = model.colors[i];
    }

    var transform = this.parent.Transform;

    this.mesh = new THREE.LOD();


    var mesh = BuildVoxelMesh(model,
    {
      materialColor: this.materialDiffuse,
      bakeAmbientOcclusion: this.bakeAmbientOcclusion
    });
    mesh.updateMatrix();
    mesh.matrixAutoUpdate = false;
    this.mesh.addLevel(mesh, 0);

    // generate up to 5 mip levels
    for (i = 1; i < 5; ++i)
    {
      if (model.sizeX < 10 || model.sizeY < 10 || model.sizeZ < 10)
      {
        break;
      }
      model = createHalfSizeModel(model);
      var mesh = BuildVoxelMesh(model,
      {
        materialColor: this.materialDiffuse,
        bakeAmbientOcclusion: this.bakeAmbientOcclusion
      });
      var scale = 1 << i;
      mesh.scale.set(scale, scale, scale);
      mesh.updateMatrix();
      mesh.matrixAutoUpdate = false;
      this.mesh.addLevel(mesh, i * 500);
    }

    transform.object3d.add(this.mesh);

  })

  .destruct(function ()
  {
    this.mesh.parent.remove(this.mesh);
  });

}(this, this.TANK = this.TANK ||
{}));