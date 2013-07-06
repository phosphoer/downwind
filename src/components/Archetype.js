(function (global, TANK)
{
  "use strict";

  TANK.createBoat = function ()
  {
    var boat = TANK.createEntity("Transform", "Model", "Boat", "Box");

    boat.Model.model = PirateShip;

    boat.Boat.forwardSpeed = 8.2;
    boat.Boat.backwardSpeed = 4.4;
    boat.Boat.turnSpeed = .02;
    boat.Boat.friction = .95;

    return boat;
  }

  TANK.createCannon = function ()
  {
    var cannon = TANK.createEntity("Transform", "Model", "Cannon");
    cannon.Model.model = Boat;
    return cannon;
  }


  TANK.createCannonBall = function (position, direction)
  {
    var cannonBall = TANK.createEntity("Transform", "Model", "CannonBall");
    cannonBall.Transform.position = position.clone();
    cannonBall.Model.model = Boat;
    cannonBall.Model.model.sizeX = 10;
    cannonBall.Model.model.sizeY = 10;
    cannonBall.Model.model.sizeZ = 10;
    cannonBall.CannonBall.setVelocity(direction.clone());
    return cannonBall;
  }

}(this, this.TANK = this.TANK ||
{}));