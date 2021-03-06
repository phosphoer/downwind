(function (global, TANK)
{
  "use strict";

  function displayPopup(name, text, fadeTime, displayTime)
  {
    $(name).text(text);

    $(name).animate(
    {
      opacity: 1.0,
    },
    {
      duration: fadeTime,
      complete: function ()
      {
        setTimeout(function ()
        {
          $(name).animate(
          {
            opacity: 0.0,
          },
          {
            duration: fadeTime
          });
        }, displayTime);
      }
    });
  }

  TANK.registerComponent("Gameplay")

  .initialize(function ()
  {
    this.gameover = false;
    this.inrange = false;
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

    this.music = new Audio("res/BoatGameSong.mp3");
    this.music.play();
    this.music.addEventListener("ended", function ()
    {
      this.currentTime = 0;
      this.play();
    }, false);

    $("#fullscreen").animate(
    {
      opacity: 0.0
    },
    {
      duration: 6000,
      complete: function()
      {
        $(this).remove();
      }
    });

    setTimeout(function ()
    {
      displayPopup("#splashtext", "WASD to navigate", 4000, 1000);
    }, 4000);

    var enemyBoat = TANK.createBoat();
    enemyBoat.addComponent("Light");
    enemyBoat.Light.diffuse = 0xFFE0E0;
    enemyBoat.addComponent("Wander");
    enemyBoat.Model.model = EnemyShip;
    enemyBoat.Transform.position.x = 200;
    enemyBoat.Transform.position.z = 800;
    enemyBoat.Light.offset.y = 20;
    TANK.Game.addEntity(enemyBoat, "EnemyShip");

    for (var i = 0; i < 15; ++i)
    {
      var crate = TANK.createCrate();
      crate.Transform.position.x = (i / 13) * enemyBoat.Transform.position.x + global.Math.random() * 200 - 100;
      crate.Transform.position.z = (i / 13) * enemyBoat.Transform.position.z + global.Math.random() * 200 - 100;
      TANK.Game.addEntity(crate);
    }

    // for (var i = 0; i < 2; ++i)
    // {
    //   var fish = TANK.createFish();
    //   var spawnPoint = new global.THREE.Vector3(Math.random() * 600 - 200,
    //     Math.random() * 600 - 200,
    //     15 + Math.random() * 8);
    //   fish.Transform.position.copy(spawnPoint);
    //   TANK.Game.addEntity(fish);
    // }

    this.addEventListener("OnEnterFrame", function (dt)
    {
      if (this.inrange === false)
      {
        var enemy = TANK.Game.getEntity("EnemyShip");
        var player = TANK.Game.getEntity("Boat");

        var d = enemy.Transform.position.distanceTo(player.Transform.position);
        if (d < 300)
        {
          this.inrange = true;
          enemy.Boat.canfire = true;
          player.Boat.canfire = true;
          displayPopup("#splashtext", "Spacebar to fire cannons", 4000, 1000);
        }
      }

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