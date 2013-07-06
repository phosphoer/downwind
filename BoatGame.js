"use strict";

function main()
{
  var space = TANK.createSpace("InputManager", "Graphics", "Stats");
  TANK.addSpace(space, "Game");

  var boat = TANK.createEntity("Transform", "Box", "Skybox", "Model", "Controller");
  boat.Box.diffuse.setRGB(0.9, 0.9, 0.9);
  boat.Skybox.skyColor.setHex(0xCCFFFF);
  boat.Skybox.baseColor.setHex(0x2F4F8F);
  boat.Skybox.scale.set(5000, 5000, 5000);
  boat.Model.model = Boat;
  space.addEntity(boat, "Boat");

  var ocean = TANK.createEntity("Ocean");
  space.addEntity(ocean, "Ocean");

  TANK.start();

}