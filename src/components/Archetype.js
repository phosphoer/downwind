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
    particles.ParticleEmitter.emitRate = 30;
    particles.ParticleEmitter.lifetime = 0.6;
    particles.ParticleEmitter.randomLinearVelocity.x = 0.5;
    particles.ParticleEmitter.randomLinearVelocity.y = 0.5;
    particles.ParticleEmitter.randomLinearVelocity.z = 0.5;
    particles.ParticleEmitter.linearVelocity.z = 10;
    particles.ParticleEmitter.spawnArea.x = 0.3;
    particles.ParticleEmitter.spawnArea.y = 0.3;
    particles.ParticleEmitter.spawnArea.z = 0.3;
    particles.ParticleEmitter.size = 2;
    particles.ParticleForces.constantForce.y = -0.001;
    particles.ParticleForces.damping = 0.995;
    particles.ParticleForces.growth = 0.99;

    particles.ParticleGradient.gradient.add(new THREE.Color(0xffffff), 0.0);
    particles.ParticleGradient.gradient.add(new THREE.Color(0xffff00), 0.2);
    particles.ParticleGradient.gradient.add(new THREE.Color(0xff0000), 0.5);
    particles.ParticleGradient.gradient.add(new THREE.Color(0x000000), 1.0);

    return particles;
  }


  TANK.createCannonBall = function (position, direction)
  {
    var cannonBall = TANK.createEntity("Transform", "Model", "CannonBall", "OrientToVelocity", "TimedDeath");
    cannonBall.Transform.position.copy(position);
    cannonBall.Model.model = Fish1;
    cannonBall.CannonBall.setVelocity(direction.clone());
    cannonBall.OrientToVelocity.velocity = cannonBall.CannonBall.velocity;
    return cannonBall;
  }

  TANK.createWake = function (obj)
  {
  	var particlesPort = TANK.createEntity("Transform", "ParticleEmitter", "ParticleForces", "ParticleGradient");
    if (typeof obj !== "undefined"){ obj.Hierarchy.attachNonRelative(particlesPort);}
    particlesPort.Transform.position.x = 15;
    particlesPort.Transform.position.y = -15;
    particlesPort.Transform.position.z = -40;
    particlesPort.ParticleEmitter.emitCount = 0;
    particlesPort.ParticleEmitter.emitRate = 0.001;
    particlesPort.ParticleEmitter.color.setRGB(.7, .7, 1);
    particlesPort.ParticleEmitter.randomLinearVelocity.x = 0.1;
    particlesPort.ParticleEmitter.randomLinearVelocity.y = 0.1;
    particlesPort.ParticleEmitter.randomLinearVelocity.z = 0.1;
    particlesPort.ParticleEmitter.linearVelocity.x = 1.0;
    particlesPort.ParticleEmitter.linearVelocity.y = 0.001;
    particlesPort.ParticleEmitter.linearVelocity.z = 1.0;
    particlesPort.ParticleEmitter.spawnArea.z = 15;
    particlesPort.ParticleEmitter.maxparticlesInOneFrame = 3;
    particlesPort.ParticleEmitter.size = 1;
    particlesPort.ParticleForces.damping = 0.97;
    particlesPort.ParticleForces.growth = 0.99;
    particlesPort.ParticleForces.randomForce.x = 0.4;
    particlesPort.ParticleForces.randomForce.y = 0.4;
    particlesPort.ParticleForces.randomForce.z = 0.4;

    particlesPort.ParticleGradient.gradient.add(new THREE.Color(0xffffff), 0.0);
    particlesPort.ParticleGradient.gradient.add(new THREE.Color(0x2Dffff), 0.2);
    particlesPort.ParticleGradient.gradient.add(new THREE.Color(0x1D8CC0), 0.5);
    particlesPort.ParticleGradient.gradient.add(new THREE.Color(0x1C6BA0), 1.0);

    var particlesStarboard = TANK.createEntity("Transform", "ParticleEmitter", "ParticleForces", "ParticleGradient");
    if (typeof obj !== "undefined"){ obj.Hierarchy.attachNonRelative(particlesStarboard);}
    particlesStarboard.Transform.position.x = -15;
    particlesStarboard.Transform.position.y = -15;
    particlesStarboard.Transform.position.z = -40;
    particlesStarboard.ParticleEmitter.emitCount = 0;
    particlesStarboard.ParticleEmitter.emitRate = 0.001;
    particlesStarboard.ParticleEmitter.color.setRGB(.7, .7, 1);
    particlesStarboard.ParticleEmitter.randomLinearVelocity.x = 0.1;
    particlesStarboard.ParticleEmitter.randomLinearVelocity.y = 0.1;
    particlesStarboard.ParticleEmitter.randomLinearVelocity.z = 0.1;
    particlesStarboard.ParticleEmitter.linearVelocity.x = 1.0;
    particlesStarboard.ParticleEmitter.linearVelocity.y = 0.001;
    particlesStarboard.ParticleEmitter.linearVelocity.z = 1.0;
    particlesStarboard.ParticleEmitter.spawnArea.z = 15;
    particlesStarboard.ParticleEmitter.maxparticlesInOneFrame = 3;
    particlesStarboard.ParticleEmitter.size = 1;
    particlesStarboard.ParticleForces.damping = 0.97;
    particlesStarboard.ParticleForces.growth = 0.99;
    particlesStarboard.ParticleForces.randomForce.x = 0.4;
    particlesStarboard.ParticleForces.randomForce.y = 0.4;
    particlesStarboard.ParticleForces.randomForce.z = 0.4;

    particlesStarboard.ParticleGradient.gradient.add(new THREE.Color(0xffffff), 0.0);
    particlesStarboard.ParticleGradient.gradient.add(new THREE.Color(0x2Dffff), 0.2);
    particlesStarboard.ParticleGradient.gradient.add(new THREE.Color(0x1D8CC0), 0.5);
    particlesStarboard.ParticleGradient.gradient.add(new THREE.Color(0x1C6BA0), 1.0);

  }

}(this, this.TANK = this.TANK ||
{}));