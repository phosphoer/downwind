(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("ParticleForces")

  .requires("ParticleEmitter")

  .construct(function ()
  {
    var self = this;

    self.growth = 0.98;
    self.damping = 0.99;
    self.randomForce = new global.THREE.Vector3(0, 0, 0);
    self.constantForce = new global.THREE.Vector3(0, -0.5, 0);

    self.color = new global.THREE.Color();
  })

  .initialize(function ()
  {
    var self = this;

    self.addEventListener("OnEnterFrame", function (dt)
    {
      var particles = self.parent.ParticleEmitter.particles;

      // Update the lifetime of all of the particles
      for (var i = 0; i < particles.length; ++i)
      {
        var particle = particles[i];

        particle.scale.multiplyScalar(self.growth);
        particle._velocity.multiplyScalar(self.damping);

        particle._velocity.x += TANK.Math.variance(0, self.randomForce.x) * dt;
        particle._velocity.y += TANK.Math.variance(0, self.randomForce.y) * dt;
        particle._velocity.z += TANK.Math.variance(0, self.randomForce.z) * dt;

        particle._velocity.x += self.constantForce.x * dt;
        particle._velocity.y += self.constantForce.y * dt;
        particle._velocity.z += self.constantForce.z * dt;
      }
    });
  });

}(this, this.TANK = this.TANK ||
{}));