(function (global, TANK)
{
  "use strict";

  var rightConstant = new global.THREE.Vector3(1, 0, 0);
  var upConstant = new global.THREE.Vector3(0, 1, 0);
  var forwardConstant = new global.THREE.Vector3(0, 0, 1);
  var zeroConstant = new global.THREE.Vector3(0, 0, 0);

  TANK.registerComponent("Transform")

  .construct(function ()
  {
    this.position = new global.THREE.Vector3();
    this.rotation = new global.THREE.Vector3();
    this.scale = new global.THREE.Vector3(1, 1, 1);

    // This matrix is only built upon request (cached to avoid temporaries)
    this.toWorldCache = new global.THREE.Matrix4();
    this.toLocalCache = new global.THREE.Matrix4();
    this.vector4Cache = new global.THREE.Vector4();

    this.getRight = function (vector3Out)
    {
      this.vectorLocalToWorld(rightConstant, vector3Out);
    };

    this.getUp = function (vector3Out)
    {
      this.vectorLocalToWorld(upConstant, vector3Out);
    };

    this.getForward = function (vector3Out)
    {
      this.vectorLocalToWorld(forwardConstant, vector3Out);
    };

    this.getWorldPosition = function (vector3Out)
    {
      this.pointLocalToWorld(zeroConstant, vector3Out);
    };

    this.vectorLocalToWorld = function (vector3, vector3Out)
    {
      this.localToWorld(vector3, vector3Out, 0.0);
    };

    this.pointLocalToWorld = function (vector3, vector3Out)
    {
      this.localToWorld(vector3, vector3Out, 1.0);
    };

    this.vectorWorldToLocal = function (vector3, vector3Out)
    {
      this.worldToLocal(vector3, vector3Out, 0.0);
    };

    this.pointWorldToLocal = function (vector3, vector3Out)
    {
      this.worldToLocal(vector3, vector3Out, 1.0);
    };

    this.buildToWorldMatrix = function (matrix4)
    {
      matrix4.makeFromPositionEulerScale(this.position, this.rotation, 'XYZ', this.scale);

      // Check if we have a hierarchy mother
      var mother = this.parent.mother;
      if (mother)
      {
        var motherTx = mother.Transform;
        if (motherTx)
        {
          motherTx.buildToWorldMatrix(motherTx.toWorldCache);
          matrix4.multiplyMatrices(motherTx.toWorldCache, matrix4);
        }
      }
    };

    this.localToWorld = function (vector3, vector3Out, w)
    {
      this.buildToWorldMatrix(this.toWorldCache);

      var v4 = this.vector4Cache;

      v4.x = vector3.x;
      v4.y = vector3.y;
      v4.z = vector3.z;
      v4.w = w;

      v4.applyMatrix4(this.toWorldCache);

      vector3Out.x = v4.x;
      vector3Out.y = v4.y;
      vector3Out.z = v4.z;
    };

    this.worldToLocal = function (vector3, vector3Out, w)
    {
      this.buildToWorldMatrix(this.toWorldCache);
      this.toLocalCache.getInverse(this.toWorldCache);

      var v4 = this.vector4Cache;

      v4.x = vector3.x;
      v4.y = vector3.y;
      v4.z = vector3.z;
      v4.w = w;

      v4.applyMatrix4(this.toLocalCache);

      vector3Out.x = v4.x;
      vector3Out.y = v4.y;
      vector3Out.z = v4.z;
    };
  });

}(this, this.TANK = this.TANK ||
{}));