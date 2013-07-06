(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("Skybox")

  .construct(function ()
  {
    this.skyColor = new global.THREE.Color();
    this.baseColor = new global.THREE.Color();
    this.scale = new global.THREE.Vector3(1, 1, 1);
  })

  .initialize(function ()
  {
    var skyGeometry = new global.THREE.CubeGeometry(this.scale.x, this.scale.y, this.scale.z);

    skyGeometry.faces[0].vertexColors[0] = new global.THREE.Color(this.skyColor);
    skyGeometry.faces[0].vertexColors[1] = new global.THREE.Color(this.baseColor);
    skyGeometry.faces[0].vertexColors[2] = new global.THREE.Color(this.baseColor);
    skyGeometry.faces[0].vertexColors[3] = new global.THREE.Color(this.skyColor);

    skyGeometry.faces[1].vertexColors[0] = new global.THREE.Color(this.skyColor);
    skyGeometry.faces[1].vertexColors[1] = new global.THREE.Color(this.baseColor);
    skyGeometry.faces[1].vertexColors[2] = new global.THREE.Color(this.baseColor);
    skyGeometry.faces[1].vertexColors[3] = new global.THREE.Color(this.skyColor);

    skyGeometry.faces[3].vertexColors[0] = new global.THREE.Color(this.baseColor);
    skyGeometry.faces[3].vertexColors[1] = new global.THREE.Color(this.baseColor);
    skyGeometry.faces[3].vertexColors[2] = new global.THREE.Color(this.baseColor);
    skyGeometry.faces[3].vertexColors[3] = new global.THREE.Color(this.baseColor);

    skyGeometry.faces[5].vertexColors[0] = new global.THREE.Color(this.skyColor);
    skyGeometry.faces[5].vertexColors[1] = new global.THREE.Color(this.baseColor);
    skyGeometry.faces[5].vertexColors[2] = new global.THREE.Color(this.baseColor);
    skyGeometry.faces[5].vertexColors[3] = new global.THREE.Color(this.skyColor);

    skyGeometry.faces[4].vertexColors[0] = new global.THREE.Color(this.skyColor);
    skyGeometry.faces[4].vertexColors[1] = new global.THREE.Color(this.baseColor);
    skyGeometry.faces[4].vertexColors[2] = new global.THREE.Color(this.baseColor);
    skyGeometry.faces[4].vertexColors[3] = new global.THREE.Color(this.skyColor);

    skyGeometry.faces[2].vertexColors[0] = new global.THREE.Color(this.skyColor);
    skyGeometry.faces[2].vertexColors[1] = new global.THREE.Color(this.skyColor);
    skyGeometry.faces[2].vertexColors[2] = new global.THREE.Color(this.skyColor);
    skyGeometry.faces[2].vertexColors[3] = new global.THREE.Color(this.skyColor);

    var material = new global.THREE.MeshBasicMaterial(
    {
      side: global.THREE.BackSide,
      vertexColors: global.THREE.VertexColors
    });

    this.skybox = new global.THREE.Mesh(skyGeometry, material);
    this.skybox.position = this.parent.Transform.position;
    this.space.Graphics.scene.add(this.skybox);
  });

}(this, this.TANK = this.TANK ||
{}));