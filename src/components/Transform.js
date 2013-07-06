(function (global, TANK)
{
    "use strict";

    TANK.registerComponent("Transform")

    .construct(function ()
    {
        this.position = new global.THREE.Vector3();
        this.rotation = new global.THREE.Vector3();
        this.scale = new global.THREE.Vector3(1, 1, 1);

        this.getFacing = function()
        {
          var facing = new global.THREE.Vector3(0, 0, 1);
	      var q = new global.THREE.Quaternion();
	      q.setFromEuler(this.rotation);
	      facing.applyQuaternion(q);
	      facing.normalize();
	      return facing;
        }
    });

}(this, this.TANK = this.TANK ||
{}));