"use strict";

function main()
{
  var space = TANK.createSpace("InputManager", "Graphics", "Stats", "Gameplay");
  TANK.addSpace(space, "Game");

  var boat = TANK.createBoat();
  boat.addComponents("Skybox", "Controller", "ParticleEmitter", "ParticleForces", "Cannon");
  boat.Cannon.offset = new THREE.Vector3(5, 2.5, 0);
  boat.Cannon.orientation = new THREE.Vector3(0, THREE.PI, 0);
  boat.Skybox.skyColor.setHex(0xCCFFFF);
  boat.Skybox.baseColor.setHex(0x2F4F8F);
  boat.Skybox.scale.set(5000, 5000, 5000);
  boat.ParticleEmitter.emitCount = 0;
  boat.ParticleEmitter.emitRate = 1;
  boat.ParticleEmitter.color.setRGB(1, 0, 0);
  boat.ParticleEmitter.randomVelocity.x = 0.1;
  boat.ParticleEmitter.randomVelocity.y = 0.1;
  boat.ParticleEmitter.randomVelocity.z = 0.1;
  boat.ParticleEmitter.linearVelocity.y = 0.3;
  boat.ParticleEmitter.spawnArea.z = 25;
  boat.ParticleEmitter.offset.y = -6;
  boat.ParticleForces.constantForce.y = 0.2;
  boat.ParticleForces.damping = 0.97;
  boat.ParticleForces.growth = 0.99;
  boat.ParticleForces.randomForce.x = 0.4;
  boat.ParticleForces.randomForce.y = 0.4;
  boat.ParticleForces.randomForce.z = 0.4;
  space.addEntity(boat, "Boat");


  var ocean = TANK.createEntity("Ocean");
  ocean.Transform.position.y = -25;
  space.addEntity(ocean, "Ocean");

  var camera = TANK.createEntity("Transform", "Camera", "BoatCameraController");
  camera.Camera.target = "Boat";
  space.addEntity(camera, "Camera");
  camera.Camera.activate();

  // var light = TANK.createEntity("Light");
  // space.addEntity(light);


  TANK.start();
}