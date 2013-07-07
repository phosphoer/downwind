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

    self.size = 1;

    self.spawnArea = new global.THREE.Vector3(5, 5, 5);

    self.linearVelocity = new global.THREE.Vector3(0, 0, 0);
    self.randomLinearVelocity = new global.THREE.Vector3(1, 1, 1);

    self.angularVelocity = new global.THREE.Vector3(0, 0, 0);
    self.randomAngularVelocity = new global.THREE.Vector3(0.1, 0.1, 0.1);


    self.spawnAreaCache = new global.THREE.Vector3();
    self.vector3Cache = new global.THREE.Vector3();

    self.color = new global.THREE.Color();
  })

  .initialize(function ()
  {
    var self = this;

    self.emitTime = 0;
    self.particlesEmitted = 0;

    var g = self.space.Graphics;

    self.particles = new Array();

    self.recycled = new Array();

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

      // If we have no emit count, or we're below our emit count (and we have enough time to emit a particle!)
      while ((self.emitCount == 0 || self.particlesEmitted < self.emitCount) && self.emitTime > singleEmitTime)
      {
        self.emitTime -= singleEmitTime;

        var particle = null;

        if (self.recycled.length == 0)
        {
          var material = new global.THREE.MeshBasicMaterial(
          {
            color: self.color
          });

          particle = new global.THREE.Mesh(g.unitCube, material);
          g.scene.add(particle);
        }
        else
        {
          particle = self.recycled.pop();
          particle.visible = true;
        }

        self.spawnAreaCache.x = TANK.Math.variance(0, self.spawnArea.x);
        self.spawnAreaCache.y = TANK.Math.variance(0, self.spawnArea.y);
        self.spawnAreaCache.z = TANK.Math.variance(0, self.spawnArea.z);

        // We lazy compute the offset once, to avoid allocations
        tx.pointLocalToWorld(self.spawnAreaCache, self.spawnAreaCache);

        particle.position.copy(self.spawnAreaCache);
        particle.scale.x = self.size;
        particle.scale.y = self.size;
        particle.scale.z = self.size;
        particle._life = 0;
        particle._lifetime = TANK.Math.variance(self.lifetime, self.lifetimeVariance);
        particle._velocity = self.linearVelocity.clone();
        particle._velocity.x += TANK.Math.variance(0, self.randomLinearVelocity.x);
        particle._velocity.y += TANK.Math.variance(0, self.randomLinearVelocity.y);
        particle._velocity.z += TANK.Math.variance(0, self.randomLinearVelocity.z);
        particle._angularVelocity = self.angularVelocity.clone();
        particle._angularVelocity.x = TANK.Math.variance(0, self.randomAngularVelocity.x);
        particle._angularVelocity.y = TANK.Math.variance(0, self.randomAngularVelocity.y);
        particle._angularVelocity.z = TANK.Math.variance(0, self.randomAngularVelocity.z);

        self.particles.push(particle);
        ++self.particlesEmitted;
      }

      // Update the lifetime of all of the particles
      for (var i = 0; i < self.particles.length;)
      {
        var particle = self.particles[i];
        particle._life += dt;

        // Update the particles position by its velocity
        particle.position.add(particle._velocity);
        particle.rotation.add(particle._angularVelocity);

        if (particle._life > particle._lifetime)
        {
          // Remove the particle from the list
          self.particles.splice(i, 1);
          particle.visible = false;

          self.recycled.push(particle);
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
  })

  .destruct(function ()
  {
    self = this;

    // Remove the particles leftover from the scene
    for (var i = 0; i < self.particles.length; ++i)
    {
      var particle = self.particles[i];

      self.space.Graphics.scene.remove(particle);
    }
  });

}(this, this.TANK = this.TANK ||
{}));