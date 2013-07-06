(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("Transform")

  .construct(function ()
  {
    this.position = new global.THREE.Vector3();
    this.rotation = new global.THREE.Vector3();
    this.scale = new global.THREE.Vector3(1, 1, 1);

    // This matrix is only built upon request (cached to avoid temporaries)
    this.toWorldCache = new global.THREE.Matrix4();
    this.toLocalCache = new global.THREE.Matrix4();

    var self = this;

    self.buildToWorldMatrix = function (matrix)
    {
      matrix.makeFromPositionEulerScale(self.position, self.rotation, 'XYZ', this.scale);
    };

    self.localToWorld = function (vector)
    {
      self.buildToWorldMatrix(self.toWorldCache);

      var transformed = vector.clone();
      transformed.applyMatrix4(self.toWorldCache);
      return transformed;
    };

    self.worldToLocal = function (vector)
    {
      self.buildToWorldMatrix(self.toWorldCache);
      self.toLocalCache.getInverse(self.toWorldCache);

      var transformed = vector.clone();
      transformed.applyMatrix4(self.toLocalCache);
      return transformed;
    };
  });

}(this, this.TANK = this.TANK ||
{}));