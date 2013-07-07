(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("Gameplay")

  .initialize(function ()
  {
    this.fade = $("<div class='Fade' />").appendTo($("body"));

    var self = this;
    setTimeout(function ()
    {
      self.fade.remove();

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

    }, 5000);

    var enemyBoat = TANK.createBoat();
    enemyBoat.Model.model = EnemyShip;
    enemyBoat.Transform.position.x = 200;
    enemyBoat.Transform.position.z = 700;
    enemyBoat.Boat.throttle = 1;
    enemyBoat.Boat.forwardSpeed = 10;
    TANK.Game.addEntity(enemyBoat, "EnemyShip");

    for (var i = 0; i < 10; ++i)
    {
      var crate = TANK.createCrate();
      crate.Transform.position.x = Math.random() * 200;
      crate.Transform.position.z = Math.random() * 200;
      crate.Bouyant.percent = 0.3 + Math.random() * 0.3;
      TANK.Game.addEntity(crate);
    }

  });

}(this, this.TANK = this.TANK ||
{}));