(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("Gameplay")

  .initialize(function ()
  {
    var i, j;
    var scale = 100;
    for (i = 0; i <= 1; ++i)
    {
      for (j = 0; j <= 1; ++j)
      {
        var boat = global.createBoat();
        boat.addComponents("Wander");
        boat.Model.materialDiffuse = 0x404040;
        boat.Transform.position.set(i * scale, 0, j * scale);
        boat.Transform.scale.set(0.5, 0.5, 0.5);
        boat.Transform.rotation.y = Math.random();
        this.parent.addEntity(boat);
      }
    }

  });

}(this, this.TANK = this.TANK ||
{}));