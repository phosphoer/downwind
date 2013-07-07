/* globals global.THREE */

(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("Fog")

  .construct(function ()
  {
    this.dayLengthSeconds = 520;
    this.time = 0;

    this.sunDistance = 2000;

    this.gradient = new TANK.Gradient();

    this.gradient.add(new global.THREE.Color(0x99BBDD), 0.0);
    this.gradient.add(new global.THREE.Color(0x88AACC), 0.1);
    this.gradient.add(new global.THREE.Color(0x557799), 0.2);
    this.gradient.add(new global.THREE.Color(0x111122), 0.4);
    this.gradient.add(new global.THREE.Color(0x101020), 0.5);
    this.gradient.add(new global.THREE.Color(0x111122), 0.7);
    this.gradient.add(new global.THREE.Color(0x557799), 0.8);
    this.gradient.add(new global.THREE.Color(0x88AACC), 0.9);
    this.gradient.add(new global.THREE.Color(0x99BBDD), 1.0);


    this.sunMaterial = new global.THREE.MeshBasicMaterial(
    {
      color: new global.THREE.Color(0xFFFFAA),
      fog: false,
    });

    this.sunMaterial2 = new global.THREE.MeshBasicMaterial(
    {
      color: new global.THREE.Color(0xFFDDAA),
      fog: false,
      transparent: true,
      opacity: 0.8
    });

    this.sunMaterial3 = new global.THREE.MeshBasicMaterial(
    {
      color: new global.THREE.Color(0xDD9955),
      fog: false,
      transparent: true,
      opacity: 0.5
    });

    this.sunMaterial4 = new global.THREE.MeshBasicMaterial(
    {
      color: new global.THREE.Color(0xAA5522),
      fog: false,
      transparent: true,
      opacity: 0.1
    });
  })

  .initialize(function ()
  {
    var g = this.space.Graphics;

    this.fog = new global.THREE.FogExp2(0x111122, 0.002);
    g.scene.fog = this.fog;


    this.sunMesh = new global.THREE.Mesh(g.unitCube, this.sunMaterial);
    this.sunMesh.scale.set(100, 100, 100);
    g.scene.add(this.sunMesh);

    this.sunMesh2 = new global.THREE.Mesh(g.unitCube, this.sunMaterial2);
    this.sunMesh2.scale.set(1.4, 1.4, 0.8);
    this.sunMesh.add(this.sunMesh2);

    this.sunMesh3 = new global.THREE.Mesh(g.unitCube, this.sunMaterial3);
    this.sunMesh3.scale.set(1.4, 1.4, 0.8);
    this.sunMesh2.add(this.sunMesh3);

    this.sunMesh4 = new global.THREE.Mesh(g.unitCube, this.sunMaterial4);
    this.sunMesh4.scale.set(1.4, 1.4, 0.8);
    this.sunMesh3.add(this.sunMesh4);


    this.light = new global.THREE.HemisphereLight(0xCCFFFF, 0x2F4F8F, 0.5);
    g.scene.add(this.light);

    this.addEventListener("OnEnterFrame", function (dt)
    {
      this.time += dt;
      this.time %= this.dayLengthSeconds;


      var normalizedTime = this.time / this.dayLengthSeconds;

      var boat = this.space.getEntity("Boat");
      var boatTx = boat.Transform;

      this.sunMesh.position.y = global.Math.cos(normalizedTime * global.Math.PI * 2) * this.sunDistance;
      this.sunMesh.position.z = global.Math.sin(normalizedTime * global.Math.PI * 2) * this.sunDistance + boatTx.position.z;
      this.sunMesh.position.x = boatTx.position.x;

      this.gradient.sample(this.fog.color, normalizedTime)

      // Just simply get the blue component as our overall lighting value
      //this.light.color = this.fog.color;
      this.light.intensity = this.fog.color.b;
    });

  });


}(this, this.TANK = this.TANK ||
{}));