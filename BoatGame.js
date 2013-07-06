"use strict";
function main()
{
  var space = TANK.createSpace("InputManager", "Graphics", "Stats", "Gameplay");
  TANK.addSpace(space, "Game");

  var boat = TANK.createBoat();
  boat.addComponents("Skybox", "Controller");
  boat.Cannon.offset = new THREE.Vector3(5, 2.5, 0);
  boat.Cannon.orientation = new THREE.Vector3(0,THREE.PI,0);
  boat.Skybox.skyColor.setHex(0xCCFFFF);
  boat.Skybox.baseColor.setHex(0x2F4F8F);
  boat.Skybox.scale.set(5000, 5000, 5000);
  space.addEntity(boat, "Boat");


  var ocean = TANK.createEntity("Ocean");
  ocean.Transform.position.y = -20;
  space.addEntity(ocean, "Ocean");

  var camera = TANK.createEntity("Transform", "Camera", "BoatCameraController");
  camera.Camera.target = "Boat";
  space.addEntity(camera, "Camera");
  camera.Camera.activate();

  // var light = TANK.createEntity("Light");
  // space.addEntity(light);


  TANK.start();
}