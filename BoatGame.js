"use strict";

function main()
{
  var space = TANK.createSpace("InputManager", "Graphics");
  TANK.addSpace(space, "Game");

  var boat = TANK.createEntity();
  boat.addComponents("Transform");
  space.addEntity(boat, "Boat");

  TANK.start();

}