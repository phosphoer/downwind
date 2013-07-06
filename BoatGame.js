"use strict";

function createBoat()
{
  var boat = TANK.createEntity("Transform", "Model", "Boat");

  boat.Model.model = Boat;
  boat.Model.materialDiffuse = 0xFF0000;

  boat.Boat.forwardSpeed = 8.2;
  boat.Boat.backwardSpeed = 4.4;
  boat.Boat.turnSpeed = .7;
  boat.Boat.friction = .95;

  return boat;
}

function main()
{
  var space = TANK.createSpace("InputManager", "Graphics", "Stats");
  TANK.addSpace(space, "Game");

  var boat = createBoat();
  boat.addComponents("Skybox", "Controller");
  boat.Skybox.skyColor.setHex(0xCCFFFF);
  boat.Skybox.baseColor.setHex(0x2F4F8F);
  boat.Skybox.scale.set(5000, 5000, 5000);

  boat.Model.materialDiffuse = 0xFF00FF;
  space.addEntity(boat, "Boat");

  var ocean = TANK.createEntity("Ocean");
  //space.addEntity(ocean, "Ocean");

  TANK.start();

}