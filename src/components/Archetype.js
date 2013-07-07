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
    cannon.Model.model = Boat;
    return cannon;
  }


  TANK.createCannonBall = function (position, direction)
  {
    var cannonBall = TANK.createEntity("Transform", "Model", "CannonBall");
    cannonBall.Transform.position = position.clone();
    cannonBall.Model.model = Boat;
    cannonBall.CannonBall.setVelocity(direction.clone());
    return cannonBall;
  }

  TANK.createWake = function (obj)
  {
  	var particles = TANK.createEntity("Transform", "ParticleEmitter", "ParticleForces", "ParticleGradient");
    if (typeof obj !== "undefined"){ obj.Hierarchy.attachNonRelative(particles);}
    particles.Transform.position.x = 0;
    particles.Transform.position.y = -15;
    particles.Transform.position.z = -40;
    particles.ParticleEmitter.emitCount = 0;
    particles.ParticleEmitter.emitRate = 0;
    particles.ParticleEmitter.color.setRGB(.7, .7, 1);
    particles.ParticleEmitter.randomLinearVelocity.x = 0.1;
    particles.ParticleEmitter.randomLinearVelocity.y = 0.1;
    particles.ParticleEmitter.randomLinearVelocity.z = 0.1;
    particles.ParticleEmitter.linearVelocity.x = 1.0;
    particles.ParticleEmitter.linearVelocity.y = 0.0;
    particles.ParticleEmitter.linearVelocity.z = 1.0;
    particles.ParticleEmitter.spawnArea.z = 15;
    particles.ParticleEmitter.maxParticlesInOneFrame = 1;
    particles.ParticleEmitter.size = 1;
    particles.ParticleForces.damping = 0.97;
    particles.ParticleForces.growth = 0.99;
    particles.ParticleForces.randomForce.x = 0.4;
    particles.ParticleForces.randomForce.y = 0.4;
    particles.ParticleForces.randomForce.z = 0.4;

    particles.ParticleGradient.gradient.add(new THREE.Color(0xffffff), 0.0);
    particles.ParticleGradient.gradient.add(new THREE.Color(0x2Dffff), 0.2);
    particles.ParticleGradient.gradient.add(new THREE.Color(0x1D8CC0), 0.5);
    particles.ParticleGradient.gradient.add(new THREE.Color(0x1C6BA0), 1.0);
  }

}(this, this.TANK = this.TANK ||
{}));