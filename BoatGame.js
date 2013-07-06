"use strict";

function main()
{
  var space = TANK.createSpace("InputManager", "Graphics", "Fog", "Stats", "Gameplay");
  TANK.addSpace(space, "Game");

  var boat = TANK.createBoat();
  boat.addComponents("Skybox", "Controller", "Hierarchy", "Light");
  boat.Skybox.skyColor.setHex(0xCCFFFF);
  boat.Skybox.baseColor.setHex(0x2F4F8F);
  boat.Skybox.scale.set(5000, 5000, 5000);
  boat.Light.offset.y = 20;

  var starboardCannon = TANK.createCannon();
  boat.Hierarchy.attachNonRelative(starboardCannon);
  starboardCannon.Transform.position = new THREE.Vector3(0, 5, 0);
  starboardCannon.Transform.rotation = new THREE.Vector3(0, THREE.PI * 1.5, 0);

  {
    var particles = TANK.createEntity("Transform", "ParticleEmitter", "ParticleForces");
    boat.Hierarchy.attachNonRelative(particles);
    particles.Transform.position.x = 40;
    particles.ParticleEmitter.emitCount = 0;
    particles.ParticleEmitter.emitRate = 100;
    particles.ParticleEmitter.color.setRGB(1, 0, 0);
    particles.ParticleEmitter.randomVelocity.x = 0.1;
    particles.ParticleEmitter.randomVelocity.y = 0.1;
    particles.ParticleEmitter.randomVelocity.z = 0.1;
    particles.ParticleEmitter.linearVelocity.y = 0.3;
    particles.ParticleEmitter.spawnArea.z = 25;
    particles.ParticleEmitter.offset.y = -6;
    particles.ParticleForces.constantForce.y = 0.2;
    particles.ParticleForces.damping = 0.97;
    particles.ParticleForces.growth = 0.99;
    particles.ParticleForces.randomForce.x = 0.4;
    particles.ParticleForces.randomForce.y = 0.4;
    particles.ParticleForces.randomForce.z = 0.4;
  }

  {
    var particles = TANK.createEntity("Transform", "ParticleEmitter", "ParticleForces");
    boat.Hierarchy.attachNonRelative(particles);
    particles.Transform.position.x = -40;
    particles.ParticleEmitter.emitCount = 0;
    particles.ParticleEmitter.emitRate = 100;
    particles.ParticleEmitter.color.setRGB(0, 0, 1);
    particles.ParticleEmitter.randomVelocity.x = 0.1;
    particles.ParticleEmitter.randomVelocity.y = 0.1;
    particles.ParticleEmitter.randomVelocity.z = 0.1;
    particles.ParticleEmitter.linearVelocity.y = 0.3;
    particles.ParticleEmitter.spawnArea.z = 25;
    particles.ParticleEmitter.offset.y = -6;
    particles.ParticleForces.constantForce.y = 0.2;
    particles.ParticleForces.damping = 0.97;
    particles.ParticleForces.growth = 0.99;
    particles.ParticleForces.randomForce.x = 0.4;
    particles.ParticleForces.randomForce.y = 0.4;
    particles.ParticleForces.randomForce.z = 0.4;
  }

  space.addEntity(boat, "Boat");


  var ocean = TANK.createEntity("Ocean");
  space.addEntity(ocean, "Ocean");

  var camera = TANK.createEntity("Transform", "Camera", "BoatCameraController");
  camera.Camera.target = "Boat";
  space.addEntity(camera, "Camera");
  camera.Camera.activate();

  // var light = TANK.createEntity("Light");
  // space.addEntity(light);


  TANK.start();
}