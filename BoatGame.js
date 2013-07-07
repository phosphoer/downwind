"use strict";

function main()
{
  var space = TANK.createSpace("InputManager", "Graphics", "Fog", "Physics", "Stats", "Gameplay");
  TANK.addSpace(space, "Game");

  var boat = TANK.createBoat();
  boat.addComponents("Skybox", "Controller", "Hierarchy", "Light");
  boat.Skybox.skyColor.setHex(0xCCFFFF);
  boat.Skybox.baseColor.setHex(0x2F4F8F);
  boat.Skybox.scale.set(5000, 5000, 5000);
  boat.Light.offset.y = 20;

  var starboardCannon = TANK.createCannon();
  boat.Hierarchy.attachNonRelative(starboardCannon);
  starboardCannon.Transform.position.set(13, -20, 0);
  starboardCannon.Transform.rotation.y = Math.PI * 0.5;
  starboardCannon.Transform.scale.set(0.2, 0.2, 0.2);

  // {
  //   var particles = TANK.createEntity("Transform", "ParticleEmitter", "ParticleForces", "ParticleGradient");
  //   boat.Hierarchy.attachNonRelative(particles);
  //   particles.Transform.position.y = -15;
  //   particles.Transform.position.z = -2;
  //   particles.ParticleEmitter.emitCount = 0;
  //   particles.ParticleEmitter.emitRate = 30;
  //   particles.ParticleEmitter.color.setRGB(1, 0, 0);
  //   particles.ParticleEmitter.randomLinearVelocity.x = 0.1;
  //   particles.ParticleEmitter.randomLinearVelocity.y = 0.1;
  //   particles.ParticleEmitter.randomLinearVelocity.z = 0.1;
  //   particles.ParticleEmitter.linearVelocity.y = 0.3;
  //   particles.ParticleEmitter.spawnArea.z = 25;
  //   particles.ParticleEmitter.size = 3;
  //   particles.ParticleForces.constantForce.y = 0.2;
  //   particles.ParticleForces.damping = 0.97;
  //   particles.ParticleForces.growth = 0.99;
  //   particles.ParticleForces.randomForce.x = 0.4;
  //   particles.ParticleForces.randomForce.y = 0.4;
  //   particles.ParticleForces.randomForce.z = 0.4;

  //   particles.ParticleGradient.gradient.add(new THREE.Color(0xffffff), 0.0);
  //   particles.ParticleGradient.gradient.add(new THREE.Color(0xffff00), 0.2);
  //   particles.ParticleGradient.gradient.add(new THREE.Color(0xff0000), 0.5);
  //   particles.ParticleGradient.gradient.add(new THREE.Color(0x000000), 1.0);
  // }


  {
    var particles = TANK.createEntity("Transform", "ParticleEmitter", "ParticleForces");
    boat.Hierarchy.attachNonRelative(particles);
    particles.Transform.position.y = 100;
    particles.Transform.position.z = 40;
    particles.ParticleEmitter.emitCount = 0;
    particles.ParticleEmitter.emitRate = 20;
    particles.ParticleEmitter.lifetime = 2;
    particles.ParticleEmitter.color.setRGB(0, 0, 1);
    particles.ParticleEmitter.randomLinearVelocity.x = 0.01;
    particles.ParticleEmitter.randomLinearVelocity.y = 0.05;
    particles.ParticleEmitter.randomLinearVelocity.z = 0.01;
    particles.ParticleEmitter.linearVelocity.y = -5;
    particles.ParticleEmitter.linearVelocity.x = -0.3;
    particles.ParticleEmitter.linearVelocity.z = -1.5;
    particles.ParticleEmitter.spawnArea.z = 300;
    particles.ParticleEmitter.spawnArea.x = 300;
    particles.ParticleEmitter.size = 2;
    particles.ParticleForces.constantForce.y = -0.05;
    particles.ParticleForces.damping = 1;
    particles.ParticleForces.growth = 0.99;

    // particles.ParticleGradient.gradient.add(new THREE.Color(0xffffff), 0.0);
    // particles.ParticleGradient.gradient.add(new THREE.Color(0xffff00), 0.2);
    // particles.ParticleGradient.gradient.add(new THREE.Color(0xff0000), 0.5);
    // particles.ParticleGradient.gradient.add(new THREE.Color(0x000000), 1.0);
  }

  space.addEntity(boat, "Boat");

  var ocean = TANK.createEntity("Ocean");
  space.addEntity(ocean, "Ocean");

  var camera = TANK.createEntity("Transform", "Camera", "BoatCameraController");
  camera.Camera.target = "Boat";
  space.addEntity(camera, "Camera");
  camera.Camera.activate();


  TANK.start();
}