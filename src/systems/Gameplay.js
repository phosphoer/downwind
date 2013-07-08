(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("Gameplay")

  .initialize(function ()
  {
    this.gameover = false;
    this.seagullTimer = 0;
    this.seagullInterval = 10;
    this.seagullSound = new Audio("res/seagull.wav");
    this.splashSound = new Audio("res/splash.wav");
    this.explode1Sound = new Audio("res/explode1.wav");
    this.explode2Sound = new Audio("res/explode2.wav");
    this.seaSound = new Audio("res/sea.mp3");
    this.seaSound.play();
    this.seaSound.addEventListener("ended", function ()
    {
      this.currentTime = 0;
      this.play();
    }, false);

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
    enemyBoat.Transform.position.z = 100;
    TANK.Game.addEntity(enemyBoat, "EnemyShip");

    for (var i = 0; i < 15; ++i)
    {
      var crate = TANK.createCrate();
      crate.Transform.position.x = (i / 13) * enemyBoat.Transform.position.x + global.Math.random() * 200 - 100;
      crate.Transform.position.z = (i / 13) * enemyBoat.Transform.position.z + global.Math.random() * 200 - 100;
      TANK.Game.addEntity(crate);
    }

    this.addEventListener("OnEnterFrame", function (dt)
    {
      this.seagullTimer += dt;

      if (this.seagullTimer > this.seagullInterval)
      {
        this.seagullSound.play();
        this.seagullTimer = 0;
        this.seagullInterval = 10 + global.Math.random() * 20;
      }

      if (enemyBoat.Bouyant.sinking && !this.gameover)
      {
        this.gameover = true;

        $("#ending").animate(
        {
          opacity: 0.8
        },
        {
          duration: 25000
        });
      }
    });

  });

}(this, this.TANK = this.TANK ||
{}));