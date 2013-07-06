"use strict";

function main()
{
  var space = TANK.createSpace("InputManager");
  TANK.addSpace(space, "Game");
  space.addComponent("Graphics");

  TANK.start();
}