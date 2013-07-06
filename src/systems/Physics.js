(function (global, TANK)
{
	"use strict";

	TANK.registerComponent("Physics")

	.initialize(function ()
	{
		this.world = new CANNON.World();

		var solver = new CANNON.GSSolver();
		solver.iterations = 7;
		solver.tolerance = 0.1;
		this.world.solver = solver;

		this.world.gravity.set(0, 0, 0);
		this.world.broadphase = new CANNON.NaiveBroadphase();

	});

}(this, this.TANK = this.TANK ||
{}));