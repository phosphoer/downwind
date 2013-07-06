(function (global, TANK)
{
    "use strict";

    TANK.registerComponent("Float")

    .requires("Transform")

    .construct(function ()
    {
        this.angle = 0.0;
        this.waveHeight = 0.25;
        this.intervalLength = 6;
        this.timer = 0;
    })

    .initialize(function ()
    {
        this.addEventListener("OnEnterFrame", function()
        {  
            this.timer += 1;
            if (this.timer >= this.intervalLength)
            {
                this.parent.Transform.position.y += Math.sin(this.angle) * this.waveHeight;
                this.angle += 0.1;
                this.timer -= this.intervalLength;
            }
        });
    });

}(this, this.TANK = this.TANK ||
{}));