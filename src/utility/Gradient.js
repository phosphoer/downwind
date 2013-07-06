(function (global, TANK)
{
  "use strict";

  TANK.Gradient = function ()
  {
    this.colors = new Array();
  };

  TANK.Gradient.prototype.add = function (color, t)
  {
    this.colors.push(
    {
      color: color,
      t: t
    });
  };

  TANK.Gradient.prototype.sample = function (colorOut, t)
  {
    if (this.colors.length == 0)
    {
      colorOut.setRGB(1, 1, 1);
      return;
    }

    if (this.colors.length == 1)
    {
      colorOut.copy(this.colors[0].color);
      return;
    }

    var left = this.colors[0];
    var right = this.colors[this.colors.length - 1];

    for (var i in this.colors)
    {
      var colorT = this.colors[i];

      // If we're greater than the current left, but less than the given t, then we're closer!
      if (colorT.t > left.t && colorT.t <= t)
      {
        left = colorT;
      }

      // If we're less than the current right, but greater than the given t, then we're closer!
      if (colorT.t < right.t && colorT.t >= t)
      {
        right = colorT;
      }
    }

    var range = right.t - left.t;

    var tInRange = t - left.t;

    var interpolant = 0;

    if (range != 0)
    {
      interpolant = tInRange / range;
    }

    if (interpolant < 0)
    {
      interpolant = 0;
    }

    if (interpolant > 1)
    {
      interpolant = 1;
    }

    colorOut.copy(left.color);
    colorOut.lerp(right.color, interpolant);
  };

}(this, this.TANK = this.TANK ||
{}));