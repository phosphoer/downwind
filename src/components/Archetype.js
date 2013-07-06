(function (global, TANK)
{
  "use strict";

  TANK.createBoat = function ()
  {
    var boat = TANK.createEntity("Transform", "Model", "Boat", "ModelCollider", "Cannon");

    boat.Model.model = PirateShip;

    boat.Boat.forwardSpeed = 8.2;
    boat.Boat.backwardSpeed = 4.4;
    boat.Boat.turnSpeed = .02;
    boat.Boat.friction = .95;

    return boat;
  }


  TANK.createCannonBall = function (transform)
  {
    var cannonBall = TANK.createEntity("Transform", "Model", "CannonBall");
    if (typeof transform !== "undefined")
    {
      cannonBall.Transform.rotation = transform.rotation.clone();
      cannonBall.Transform.position = transform.position.clone();
    }
    cannonBall.Model.model = Boat;
    cannonBall.CannonBall.setVelocity();
    return cannonBall;
  }

}(this, this.TANK = this.TANK ||
{}));