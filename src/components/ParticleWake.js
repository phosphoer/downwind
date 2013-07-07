(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("ParticleWake")

  .requires("ParticleEmitter")

  .construct(function ()
  {
    var self = this;
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
        var ocean = this.parent.space.getEntity("Ocean").Ocean;
        particle.position.y = ocean ? ocean.getHeight(particle.position.x, particle.position.z) : 0;
      }
    });
  });

}(this, this.TANK = this.TANK ||
{}));