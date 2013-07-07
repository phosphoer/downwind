(function (global, TANK)
{
  "use strict";

  TANK.createBoat = function ()
  {
    var boat = TANK.createEntity("Transform", "Model", "Boat", "ModelCollider", "Cannon");

    boat.ModelCollider.debugDraw = false;
    boat.Model.model = PirateShip;

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
    cannonBall.Model.model = Boat;
    cannonBall.CannonBall.setVelocity(direction.clone());
    cannonBall.OrientToVelocity.velocity = cannonBall.CannonBall.velocity;
    return cannonBall;
  }

}(this, this.TANK = this.TANK ||
{}));