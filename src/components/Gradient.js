(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("Gradient")

  .construct(function ()
  {
    this.colors = new Array();
  })

  .initialize(function ()
  {
    this.addColor = function (color, t)
    {
      this.colors.push(
      {
        color: color,
        t: t
      });
    };

    this.sampleSetColor = function (colorOut, t)
    {
      if (this.colors.length == 0)
      {
        colorOut.setRGB(1, 1, 1);
        return;
      }

      var left = this.colors[0];
      var right = this.colors[this.colors.length - 1];

      for (var i in this.colors)
      {
        var colorT = this.colors[i];

        // If we're greater than the current left, but less than the given t, then we're closer!
        if (colorT.t > left.T && colorT.t <= t)
        {
          left = colorT;
        }
      }
    };
  });

}(this, this.TANK = this.TANK ||
{}));