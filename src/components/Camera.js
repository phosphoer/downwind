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

    self.yaw = 0;
    self.pitch = 45;
    self.distance = 100;

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

      var offsetX = self.distance * global.Math.sin(toRad(self.pitch)) * global.Math.cos(toRad(self.yaw));
      var offsetY = self.distance * global.Math.cos(toRad(self.pitch));
      var offsetZ = self.distance * global.Math.sin(toRad(self.pitch)) * global.Math.sin(toRad(self.yaw));

      var generateShake = function ()
      {
        return (global.Math.random() - 0.5) * self.shake;
      };

      self.camera.position.copy(target.Transform.position);

      self.camera.position.x += offsetX + generateShake();
      self.camera.position.y += offsetY + generateShake();
      self.camera.position.z += offsetZ + generateShake();
      self.camera.lookAt(target.Transform.position);

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