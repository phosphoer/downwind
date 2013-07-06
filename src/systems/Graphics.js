/* globals global.THREE */

(function (global, TANK)
{
	"use strict";

	TANK.registerComponent("Graphics")

	.initialize(function ()
	{
		this.scene = new global.THREE.Scene();

		var fov = 45,
			aspect = global.innerWidth / global.innerHeight,
			near = 0.1,
			far = 10000;
		this.camera = new global.THREE.PerspectiveCamera(fov, aspect, near, far);
		this.scene.add(this.camera);

		this.renderer = new global.THREE.WebGLRenderer(
		{
			antialias: true
		});
		this.renderer.setSize(global.innerWidth, global.innerHeight);
		this.renderer.setClearColor(0xE3E3E3, 1);
		this.renderer.gammaInput = true;
		this.renderer.gammaOutput = true;

		this.container = document.createElement('div');
		document.body.appendChild(this.container);

		this.container.appendChild(this.renderer.domElement);

		this.camera.position.set(0, 100, 34);
		this.camera.lookAt(this.scene.position);

		this.cameraDir = this.camera.position.clone();
		this.cameraDir.sub(this.scene.position);
		this.cameraDir.normalize();

		this.unitCube = new global.THREE.CubeGeometry(1, 1, 1);

		TANK.addEventListener("OnEnterFrame", this);

		global.addEventListener('DOMMouseScroll', wheel, false);

		var that = this;
		global.onresize = function (event)
		{
			that.camera.aspect = global.innerWidth / global.innerHeight;
			that.camera.updateProjectionMatrix();
			that.renderer.setSize(global.innerWidth, global.innerHeight);
		} * /
	});


}(this, this.TANK = this.TANK ||
{}));