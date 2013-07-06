(function (global, TANK)
{
	"use strict";

	TANK.registerComponent("Stats")

	.initialize(function ()
	{
		this.stats = new global.Stats();
		this.stats.setMode(0);

		this.stats.domElement.style.position = 'absolute';
		this.stats.domElement.style.left = '0px';
		this.stats.domElement.style.top = '0px';

		global.document.body.appendChild(this.stats.domElement);

		this.addEventListener("OnEnterFrame", function (dt)
		{
			this.stats.update();
		});
	});

}(this, this.TANK = this.TANK ||
{}));