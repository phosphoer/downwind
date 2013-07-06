"use strict";

function main()
{
    var space = TANK.createSpace("InputManager", "Graphics");
    TANK.addSpace(space, "Game");

    var boat = TANK.createEntity();
    boat.addComponents("Transform", "Box", "Skybox");
    boat.Box.diffuse.setRGB(0.9, 0.9, 0.9);
    boat.Transform.scale.set(10, 10, 20);
    boat.Skybox.skyColor.setHex(0xCCFFFF);
    boat.Skybox.baseColor.setHex(0x2F4F8F);
    boat.Skybox.scale.set(2000, 2000, 2000);
    space.addEntity(boat, "Boat");

    TANK.start();

}