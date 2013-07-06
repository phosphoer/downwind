(function (global, TANK)
{
    "use strict";

    TANK.registerComponent("Float")

    .requires("Transform")

    .construct(function ()
    {
        this.angle = 0.0;
        this.waveHeight = 0.25;  // how dramatic the y-value change is
        this.intervalLength = 6; // how quickly it happens, the higher the number the slower it is
        this.timer = 0;
    })

    .initialize(function ()
    {
        this.addEventListener("OnEnterFrame", function()
        {  
            this.timer += 1;
            if (this.timer >= this.intervalLength)
            {
                this.parent.Transform.position.y += global.Math.sin(this.angle) * this.waveHeight;
                this.angle += 0.1;
                this.timer -= this.intervalLength;
            }
        });
    });

}(this, this.TANK = this.TANK ||
{}));