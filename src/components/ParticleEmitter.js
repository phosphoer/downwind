(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("ParticleEmitter")

  .requires("Transform")

  .construct(function ()
  {
    var self = this;

    // Set to 0 to continue emitting forever
    self.emitCount = 300;

    // Particles per second (set to 0 to emit all particles instantly)
    self.emitRate = 0;

    self.lifetime = 5;
    self.lifetimeVariance = 1;

    self.offset = new global.THREE.Vector3(0, 0, 0);

    self.spawnArea = new global.THREE.Vector3(5, 5, 5);

    self.linearVelocity = new global.THREE.Vector3(0, 0, 0);
    self.randomVelocity = new global.THREE.Vector3(1, 1, 1);


    self.spawnAreaCache = new global.THREE.Vector3();

    self.color = new global.THREE.Color();
  })

  .initialize(function ()
  {
    var self = this;

    self.emitTime = 0;
    self.particlesEmitted = 0;

    var g = self.space.Graphics;

    self.particles = new Array();

    self.material = new global.THREE.MeshBasicMaterial(
    {
      color: self.color
    });


    self.addEventListener("OnEnterFrame", function (dt)
    {
      var tx = self.parent.Transform;

      var singleEmitTime = 0;
      if (self.emitRate != 0)
      {
        singleEmitTime = 1.0 / self.emitRate;
      }
      else if (self.emitCount == 0)
      {
        throw "The 'emitCount' and 'emitRate' cannot both be 0";
      }

      self.emitTime += dt;

      var worldOffset = null;

      // If we have no emit count, or we're below our emit count (and we have enough time to emit a particle!)
      while ((self.emitCount == 0 || self.particlesEmitted < self.emitCount) && self.emitTime > singleEmitTime)
      {
        self.emitTime -= singleEmitTime;

        var particle = new global.THREE.Mesh(g.unitCube, self.material);

        self.spawnAreaCache.x = TANK.Math.variance(0, self.spawnArea.x);
        self.spawnAreaCache.y = TANK.Math.variance(0, self.spawnArea.y);
        self.spawnAreaCache.z = TANK.Math.variance(0, self.spawnArea.z);

        // We lazy compute the offset once, to avoid allocations
        if (worldOffset == null)
        {
          worldOffset = tx.pointLocalToWorld(self.offset);
          var worldSpawnArea = tx.vectorLocalToWorld(self.spawnAreaCache);
        }

        particle.position.addVectors(worldOffset, worldSpawnArea);

        particle._life = 0;
        particle._lifetime = TANK.Math.variance(self.lifetime, self.lifetimeVariance);
        particle._velocity = self.linearVelocity.clone();
        particle._velocity.x += TANK.Math.variance(0, self.randomVelocity.x);
        particle._velocity.y += TANK.Math.variance(0, self.randomVelocity.y);
        particle._velocity.z += TANK.Math.variance(0, self.randomVelocity.z);

        self.particles.push(particle);
        g.scene.add(particle);
        ++self.particlesEmitted;
      }

      // Update the lifetime of all of the particles
      for (var i = 0; i < self.particles.length;)
      {
        var particle = self.particles[i];
        particle._life += dt;

        // Update the particles position by its velocity
        particle.position.add(particle._velocity);

        if (particle._life > particle._lifetime)
        {
          // Remove the particle from the list
          self.particles.splice(i, 1);
          g.scene.remove(particle);
        }
        else
        {
          ++i;
        }
      }
    });

    // var t = self.parent.Transform;
    // self.mesh.rotation = t.rotation;
    // self.mesh.position = t.position;
    // self.mesh.scale = self.scale;
    // 
  });

}(this, this.TANK = this.TANK ||
{}));