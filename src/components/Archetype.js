(function (global, TANK)
{
  "use strict";

  TANK.createBoat = function ()
  {
    var boat = TANK.createEntity("Transform", "Model", "Boat", "ModelCollider", "Cannon", "Hierarchy");

    boat.ModelCollider.debugDraw = false;
    boat.Model.model = PirateShip;

    TANK.createWake(boat);

    boat.Boat.forwardSpeed = 12.2;
    boat.Boat.backwardSpeed = 4.4;
    boat.Boat.turnSpeed = .01;
    boat.Boat.friction = .95;

    return boat;
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
    cannonBall.OrientToVelocity.velocity = cannonBall.CannonBall.velocity;
    return cannonBall;
  }

  TANK.createWake = function (obj)
  {
  	var particles = TANK.createEntity("Transform", "ParticleEmitter", "ParticleForces", "ParticleGradient");
    if (typeof obj !== "undefined"){ obj.Hierarchy.attachNonRelative(particles);}
    particles.Transform.position.x = 0;
    particles.Transform.position.y = -30;
    particles.Transform.position.z = -36;
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
    particles.ParticleEmitter.maxparticlesInOneFrame = 1;
    particles.ParticleEmitter.size = 8;
    particles.ParticleForces.damping = 0;
    particles.ParticleForces.growth = 1.005;
    particles.ParticleForces.randomForce.x = 0.4;
    particles.ParticleForces.randomForce.y = 0.0;
    particles.ParticleForces.randomForce.z = 0.4;
    particles.ParticleForces.constantForce.y = 0.05;

    particles.ParticleGradient.gradient.add(new THREE.Color(0xffffff), 1.0);
    particles.ParticleGradient.gradient.add(new THREE.Color(0x2Dffff), 0.5);
    particles.ParticleGradient.gradient.add(new THREE.Color(0x1D8CC0), 0.2);
    particles.ParticleGradient.gradient.add(new THREE.Color(0x1C6BA0), 0.0);

  }

}(this, this.TANK = this.TANK ||
{}));