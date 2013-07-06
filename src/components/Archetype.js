(function (global, TANK)
{
  "use strict";

  TANK.createBoat = function ()
  {
    var boat = TANK.createEntity("Transform", "Model", "Boat", "ModelCollider", "Cannon");

    boat.ModelCollider.debugDraw = false;
    boat.Model.model = PirateShip;

    boat.Boat.forwardSpeed = 12.2;
    boat.Boat.backwardSpeed = 4.4;
    boat.Boat.turnSpeed = .01;
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
    cannonBall.Transform.position.copy(position);
    cannonBall.Model.model = Boat;
    cannonBall.CannonBall.setVelocity(direction.clone());
    return cannonBall;
  }

}(this, this.TANK = this.TANK ||
{}));