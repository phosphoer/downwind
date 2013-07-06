(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("BoatCameraController")

  .requires("Camera")

  .construct(function ()
  {
    var self = this;

    self.yawSensativity = 0.1;
    self.pitchSensativity = -0.1;
    self.zoomSensativity = 0.5;
  })

  .initialize(function ()
  {
    var self = this;

    self.addEventListener("OnMouseMove", function (mouseEvent, keysHeld, mouseButtons)
    {
      if (mouseButtons[TANK.LEFT_MOUSE])
      {
        self.parent.Camera.yaw += mouseEvent.moveX * self.yawSensativity;
        self.parent.Camera.pitch += mouseEvent.moveY * self.pitchSensativity;
      }
      if (mouseButtons[TANK.MIDDLE_MOUSE])
      {
        self.parent.Camera.distance += mouseEvent.moveY * self.zoomSensativity;
      }
    });
  });

}(this, this.TANK = this.TANK ||
{}));