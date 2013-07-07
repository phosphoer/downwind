(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("Gameplay")

  .initialize(function ()
  {
    $("#fullscreen").animate(
    {
      opacity: 0.0
    },
    {
      duration: 6000
    });

    var enemyBoat = TANK.createBoat();
    enemyBoat.addComponent("Wander");
    enemyBoat.Model.model = EnemyShip;
    enemyBoat.Transform.position.x = 200;
    enemyBoat.Transform.position.z = 800;
    TANK.Game.addEntity(enemyBoat, "EnemyShip");

    for (var i = 0; i < 15; ++i)
    {
      var crate = TANK.createCrate();
      crate.Transform.position.x = (i / 13) * enemyBoat.Transform.position.x + global.Math.random() * 200 - 100;
      crate.Transform.position.z = (i / 13) * enemyBoat.Transform.position.z + global.Math.random() * 200 - 100;
      TANK.Game.addEntity(crate);
    }

    this.addEventListener("OnKeyPress", function (key)
    {
      if (key === TANK.Q)
      {
        $("#ending").animate(
        {
          opacity: 0.8
        },
        {
          duration: 8000
        });
      }
    });
  });

}(this, this.TANK = this.TANK ||
{}));