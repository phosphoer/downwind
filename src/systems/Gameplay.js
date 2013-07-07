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
          }, 4000);
        }, 4000);

      }, 4000);

    }, 5000);

  });

}(this, this.TANK = this.TANK ||
{}));