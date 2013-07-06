(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("Camera")

  .requires("Transform")

  .construct(function ()
  {
    self = this;

    var fov = 45;
    var aspect = global.innerWidth / global.innerHeight;
    var near = 0.1;
    var far = 10000;

    self.offset = global.THREE.Vector3(0, 20, 20);
    self.target = "";
    self.shake = 0;
    self.shakeDamping = 0.95;

    self.camera = new global.THREE.PerspectiveCamera(fov, aspect, near, far);
  })

  .initialize(function ()
  {
    self = this;

    TANK.Graphics.scene.add(self.camera);
    self.camera.position = self.parent.Transform.position;
    self.camera.rotation = self.parent.Transform.rotation;

    self.addEventListener("OnEnterFrame", function ()
    {
      var target = TANK.getEntity(self.target);

      self.camera.position.addVectors(target.parent.Transform.position, self.offset);

      var generateShake = function ()
      {
        return (Math.random() - 0.5) * self.shake;
      };

      self.camera.position.x += generateShake();
      self.camera.position.y += generateShake();
      self.camera.position.z += generateShake();

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
      TANK.Graphics.camera = self.camera;
    };
  });

}(this, this.TANK = this.TANK ||
{}));