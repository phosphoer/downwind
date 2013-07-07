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
    }, 5000);

  });

}(this, this.TANK = this.TANK ||
{}));