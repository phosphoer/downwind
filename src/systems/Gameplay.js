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
      duration: 5000
    });

    var self = this;

    setTimeout(function ()
    {
      this.splash = $("<div class='Splash' />").appendTo($("body"));
      setTimeout(function ()
      {
        this.splash.remove();
        this.splash = $("<div class='SplashFadeOut' />").appendTo($("body"));

        setTimeout(function ()
        {
          this.splash.remove();
        }, 6000);
      }, 6000);

    }, 4000);

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

  });

}(this, this.TANK = this.TANK ||
{}));