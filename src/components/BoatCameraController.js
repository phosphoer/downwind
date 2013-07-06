(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("BoatCameraController")

  .requires("Camera")

  .construct(function ()
  {
    var self = this;

    self.yawSensativity = 1;
    self.pitchSensativity = 1;
    self.zoomSensativity = 10;
    self.smoothing = 0.9;
  })

  .initialize(function ()
  {
    var self = this;

    self.addEventListener("OnMouseMove", function (mouseEvent, keysHeld)
    {
      self.parent.Camera.yaw += mouseEvent.moveX * self.yawSensativity;
      self.parent.Camera.pitch += mouseEvent.moveY * self.pitchSensativity;
    });
  });

}(this, this.TANK = this.TANK ||
{}));