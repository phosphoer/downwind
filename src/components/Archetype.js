(function (global, TANK)
{
  "use strict";

  TANK.createBoat = function ()
  {
    var boat = TANK.createEntity("Transform", "Model", "Boat", "ModelCollider", "Bouyant", "Hierarchy");

    boat.ModelCollider.debugDraw = false;
    boat.Model.model = PirateShip;

    TANK.createWake(boat);

    boat.Boat.forwardSpeed = 100;
    boat.Boat.backwardSpeed = 40;
    boat.Boat.turnSpeed = .008;
    boat.Boat.friction = .95;
    boat.Bouyant.wobble = true;
    boat.Bouyant.wobbleAmount = 0.1;

    return boat;
  }

  TANK.createCrate = function ()
  {
    var crate = TANK.createEntity("Transform", "Model", "Bouyant");

    crate.Model.model = Crate;
    crate.Transform.rotation.x = Math.random() * Math.PI * 2;
    crate.Transform.rotation.y = Math.random() * Math.PI * 2;
    crate.Transform.rotation.z = Math.random() * Math.PI * 2;
    crate.Bouyant.wobble = true;
    crate.Bouyant.percent = 0;

    var size = 0.3 + Math.random() * 1;
    crate.Transform.scale.x = size;
    crate.Transform.scale.y = size;
    crate.Transform.scale.z = size;

    return crate;
  }

  TANK.createCannon = function ()
  {
    var cannon = TANK.createEntity("Transform", "Model", "Cannon");
    cannon.Model.model = Cannon;

    //defaults to work with current boat size, scale as necessary?
    return cannon;
  }

  TANK.createExplosion = function (position)
  {
    var particles = TANK.createEntity("Transform", "ParticleEmitter", "ParticleForces", "ParticleGradient", "TimedDeath");
    particles.Transform.position.copy(position);
    particles.ParticleEmitter.emitCount = 100;
    particles.ParticleEmitter.emitRate = 0;
    particles.ParticleEmitter.randomLinearVelocity.x = 2;
    particles.ParticleEmitter.randomLinearVelocity.y = 2;
    particles.ParticleEmitter.randomLinearVelocity.z = 2;
    particles.maxparticlesInOneFrame = 1;
    particles.ParticleEmitter.spawnArea.z = 1;
    particles.ParticleEmitter.size = 3;
    particles.ParticleForces.damping = 0.97;
    particles.ParticleForces.growth = 0.99;
    particles.ParticleForces.randomForce.x = 0.4;
    particles.ParticleForces.randomForce.y = 0.4;
    particles.ParticleForces.randomForce.z = 0.4;

    particles.ParticleGradient.gradient.add(new THREE.Color(0xffffff), 0.0);
    particles.ParticleGradient.gradient.add(new THREE.Color(0xffff00), 0.2);
    particles.ParticleGradient.gradient.add(new THREE.Color(0xff0000), 0.5);
    particles.ParticleGradient.gradient.add(new THREE.Color(0x000000), 1.0);

    return particles;
  }

  TANK.createCannonBlast = function (position)
  {
    var particles = TANK.createEntity("Transform", "ParticleEmitter", "ParticleForces", "ParticleGradient", "TimedDeath");
    particles.Transform.position.copy(position);
    particles.ParticleEmitter.emitCount = 10;
    particles.ParticleEmitter.emitRate = 0;
    particles.ParticleEmitter.lifetime = 0.6;
    particles.ParticleEmitter.randomLinearVelocity.x = 0.5;
    particles.ParticleEmitter.randomLinearVelocity.y = 0.5;
    particles.ParticleEmitter.randomLinearVelocity.z = 0.5;
    particles.ParticleEmitter.linearVelocity.z = 3;
    particles.ParticleEmitter.spawnArea.x = 0.3;
    particles.ParticleEmitter.spawnArea.y = 0.3;
    particles.ParticleEmitter.spawnArea.z = 0.3;
    particles.ParticleEmitter.size = 1;
    particles.ParticleForces.constantForce.y = -0.004;
    particles.ParticleForces.damping = 0.99;
    particles.ParticleForces.growth = 0.99;

    particles.ParticleGradient.gradient.add(new THREE.Color(0xffffff), 0.0);
    particles.ParticleGradient.gradient.add(new THREE.Color(0xffff00), 0.2);
    particles.ParticleGradient.gradient.add(new THREE.Color(0xff0000), 0.5);
    particles.ParticleGradient.gradient.add(new THREE.Color(0x000000), 1.0);

    return particles;
  }


  TANK.createCannonBall = function (position, direction)
  {
    var cannonBall = TANK.createEntity("Transform", "Cube", "CannonBall", "OrientToVelocity", "TimedDeath");
    cannonBall.Transform.position.copy(position);
    cannonBall.CannonBall.setVelocity(direction.clone());
    cannonBall.Cube.material.color.setRGB(0, 0, 0);
    cannonBall.OrientToVelocity.velocity = cannonBall.CannonBall.velocity;
    return cannonBall;
  }

  TANK.createWake = function (obj)
  {
    var particles = TANK.createEntity("Transform", "ParticleEmitter", "ParticleForces", "ParticleGradient", "ParticleWake");
    if (typeof obj !== "undefined")
    {
      obj.Hierarchy.attachNonRelative(particles);
    }
    particles.Transform.position.x = 0;
    particles.Transform.position.y = -30;
    particles.Transform.position.z = -25;
    particles.ParticleEmitter.emitCount = 0;
    particles.ParticleEmitter.emitRate = 0.001;
    particles.ParticleEmitter.color.setRGB(.7, .7, 1);
    particles.ParticleEmitter.randomLinearVelocity.x = 0.0;
    particles.ParticleEmitter.randomLinearVelocity.y = 0.0;
    particles.ParticleEmitter.randomLinearVelocity.z = 0.0;
    particles.ParticleEmitter.linearVelocity.x = 1.0;
    particles.ParticleEmitter.linearVelocity.y = 0.1;
    particles.ParticleEmitter.linearVelocity.z = 1.0;
    particles.ParticleEmitter.spawnArea.z = 10;
    particles.ParticleEmitter.maxParticlesInOneFrame = 1;
    particles.ParticleEmitter.size = 9;
    particles.ParticleForces.damping = 0;
    particles.ParticleForces.growth = 1.002;
    particles.ParticleForces.randomForce.x = 0.4;
    particles.ParticleForces.randomForce.y = 0.0;
    particles.ParticleForces.randomForce.z = 0.4;
    particles.ParticleForces.constantForce.y = 0.05;
    particles.ParticleForces.lifetime = 3;
    particles.ParticleForces.lifetimeVariance = 0.5;

    particles.ParticleGradient.gradient.add(new THREE.Color(0x1C6BA0), 0.0);
    particles.ParticleGradient.gradient.add(new THREE.Color(0x1D8CC0), 0.2);
    particles.ParticleGradient.gradient.add(new THREE.Color(0x2D96ff), 0.5);
    particles.ParticleGradient.gradient.add(new THREE.Color(0xffffff), 1.0);


  }

}(this, this.TANK = this.TANK ||
{}));