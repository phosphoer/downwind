(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("ParticleGradient")

  .requires("ParticleEmitter")

  .construct(function ()
  {
    var self = this;

    self.gradient = new TANK.Gradient();
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

        var percentLife = particle._life / particle._lifetime;

        self.gradient.sample(particle.material.color, percentLife);
      }
    });
  });

}(this, this.TANK = this.TANK ||
{}));