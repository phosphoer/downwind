"use strict";

function createBoat()
{
  var boat = TANK.createEntity("Transform", "Model", "Boat", "Box");

  boat.Model.model = PirateShip;

  boat.Boat.forwardSpeed = 8.2;
  boat.Boat.backwardSpeed = 4.4;
  boat.Boat.turnSpeed = .02;
  boat.Boat.friction = .95;

  return boat;
}

function main()
{
  var space = TANK.createSpace("InputManager", "Graphics", "Stats", "Gameplay");
  TANK.addSpace(space, "Game");

  var boat = createBoat();
  boat.addComponents("Skybox", "Controller");
  boat.Skybox.skyColor.setHex(0xCCFFFF);
  boat.Skybox.baseColor.setHex(0x2F4F8F);
  boat.Skybox.scale.set(5000, 5000, 5000);
  space.addEntity(boat, "Boat");

  var ocean = TANK.createEntity("Ocean");
  space.addEntity(ocean, "Ocean");

  var camera = TANK.createEntity("Transform", "Camera", "BoatCameraController");
  camera.Camera.target = "Boat";
  space.addEntity(camera, "Camera");
  camera.Camera.activate();

  TANK.start();

}