"use strict";

function main()
{
    var space = TANK.createSpace("InputManager", "Graphics");
    TANK.addSpace(space, "Game");

    var boat = TANK.createEntity();
    boat.addComponents("Transform", "Box");
    boat.Box.diffuse.setRGB(.9, .9, .9);
    boat.Transform.scale.set(10, 10, 10);
    boat.Transform.rotation.set(Math.random(), Math.random(), Math.random());
    space.addEntity(boat, "Boat");

    TANK.start();

}