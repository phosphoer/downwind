"use strict";

function main()
{
  var space = TANK.createSpace("InputManager", "Graphics", "Fog", "Wind", "Physics", "Gameplay");
  TANK.addSpace(space, "Game");

  var boat = TANK.createBoat(true);
  boat.addComponents("Skybox", "Controller", "Hierarchy", "Light");
  boat.Skybox.skyColor.setHex(0xCCFFFF);
  boat.Skybox.baseColor.setHex(0x2F4F8F);
  boat.Skybox.scale.set(5000, 5000, 5000);
  boat.Light.offset.y = 20;

  var flagProxy = TANK.createEntity("Transform, Hierarchy");
  boat.Hierarchy.attachNonRelative(flagProxy);
  flagProxy.Transform.position.y = 22;
  flagProxy.Transform.position.z = -1.8;
  flagProxy.Transform.position.x = 0.7;

  var flag = TANK.createEntity("Model");
  flag.Model.model = Flag;
  flag.Transform.position.z = -3.5;
  flag.Transform.position.x = -0.5;
  flagProxy.Hierarchy.attachNonRelative(flag);

  // Hack to access flag
  boat.Boat.flagObject = flagProxy;

  var particles = TANK.createEntity("Transform", "ParticleEmitter", "ParticleForces");
  boat.Hierarchy.attachNonRelative(particles);
  particles.Transform.position.y = 100;
  particles.Transform.position.z = 40;
  particles.ParticleEmitter.emitCount = 0;
  particles.ParticleEmitter.emitRate = 20;
  particles.ParticleEmitter.lifetime = 2;
  particles.ParticleEmitter.color.setRGB(0.2, 0.2, 0.7);
  particles.ParticleEmitter.randomLinearVelocity.x = 0.01;
  particles.ParticleEmitter.randomLinearVelocity.y = 0.08;
  particles.ParticleEmitter.randomLinearVelocity.z = 0.01;
  particles.ParticleEmitter.linearVelocity.y = -10;
  particles.ParticleEmitter.linearVelocity.x = -0.3;
  particles.ParticleEmitter.linearVelocity.z = -1.5;
  particles.ParticleEmitter.spawnArea.z = 300;
  particles.ParticleEmitter.spawnArea.x = 300;
  particles.ParticleEmitter.size = 2;
  particles.ParticleForces.constantForce.y = -0.05;
  particles.ParticleForces.damping = 1;
  particles.ParticleForces.growth = 0.99;

  space.addEntity(boat, "Boat");

  var ocean = TANK.createEntity("Ocean");
  space.addEntity(ocean, "Ocean");

  var camera = TANK.createEntity("Transform", "Camera", "BoatCameraController");
  camera.Camera.target = "Boat";
  space.addEntity(camera, "Camera");
  camera.Camera.activate();

  TANK.start();
}