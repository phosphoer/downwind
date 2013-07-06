(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("Camera")

  .requires("Transform")

  .construct(function ()
  {
    var self = this;

    var fov = 45;
    var aspect = global.innerWidth / global.innerHeight;
    var near = 0.1;
    var far = 10000;

    self.minDistance = 40;
    self.maxDistance = 200;

    // Pitch is defined from the top (0), where horizontal is (90)
    self.minPitch = 5;
    self.maxPitch = 80;


    self.yaw = 0;
    self.pitch = 45;
    self.distance = 100;

    self.actualYaw = 0;
    self.actualPitch = 45;
    self.actualDistance = 100;
    self.smoothing = 0.15;

    self.target = "";
    self.shake = 0;
    self.shakeDamping = 0.95;

    self.camera = new global.THREE.PerspectiveCamera(fov, aspect, near, far);
  })

  .initialize(function ()
  {
    var self = this;

    self.space.Graphics.scene.add(self.camera);
    self.camera.position = self.parent.Transform.position;
    self.camera.rotation = self.parent.Transform.rotation;

    self.addEventListener("OnEnterFrame", function ()
    {
      var target = self.space.getEntity(self.target);

      var toRad = function (angle)
      {
        return angle * (Math.PI / 180);
      }

      if (self.pitch < self.minPitch)
      {
        self.pitch = self.minPitch;
      }
      else if (self.pitch > self.maxPitch)
      {
        self.pitch = self.maxPitch;
      }

      if (self.distance < self.minDistance)
      {
        self.distance = self.minDistance;
      }
      else if (self.distance > self.maxDistance)
      {
        self.distance = self.maxDistance;
      }

      var targetTx = target.Transform;

      self.actualYaw = TANK.Math.lerp(self.actualYaw, self.yaw, self.smoothing);
      self.actualPitch = TANK.Math.lerp(self.actualPitch, self.pitch, self.smoothing);
      self.actualDistance = TANK.Math.lerp(self.actualDistance, self.distance, self.smoothing);

      var yawRad = toRad(self.actualYaw) - targetTx.rotation.y;
      var pitchRad = toRad(self.actualPitch);

      var offsetX = self.actualDistance * global.Math.sin(pitchRad) * global.Math.cos(yawRad);
      var offsetY = self.actualDistance * global.Math.cos(pitchRad);
      var offsetZ = self.actualDistance * global.Math.sin(pitchRad) * global.Math.sin(yawRad);

      var generateShake = function ()
      {
        return (global.Math.random() - 0.5) * self.shake;
      };

      self.camera.position.copy(targetTx.position);

      self.camera.position.x += offsetX + generateShake();
      self.camera.position.y += offsetY + generateShake();
      self.camera.position.z += offsetZ + generateShake();
      self.camera.lookAt(targetTx.position);

      self.shake *= self.shakeDamping;
    });

    global.onresize = function (event)
    {
      var aspect = global.innerWidth / global.innerHeight;
      self.camera.aspect = aspect;
      self.camera.updateProjectionMatrix();
    };

    self.activate = function ()
    {
      this.space.Graphics.camera = self.camera;
    };
  });

}(this, this.TANK = this.TANK ||
{}));