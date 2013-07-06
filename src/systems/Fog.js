/* globals global.THREE */

(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("Fog")

  .initialize(function ()
  {
    this.space.Graphics.scene.fog = new global.THREE.FogExp2(0xffffff, 0.002);
  });


}(this, this.TANK = this.TANK ||
{}));