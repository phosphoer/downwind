"use strict";

function main()
{
  var space = TANK.createSpace("InputManager", "Graphics");
  TANK.addSpace(space, "Game");

  var boat = TANK.createEntity();
  boat.addComponents("Transform", "Box");
  boat.Box.diffuse.setRGB(0.9, 0.9, 0.9);
  boat.Transform.scale.set(10, 10, 20);
  //boat.Transform.rotation.set(Math.random(), Math.random(), Math.random());
  space.addEntity(boat, "Boat");

  var ocean = TANK.createEntity("Ocean");
  space.addEntity(ocean, "Ocean");

  TANK.start();

}