(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("Cannon")

  .requires("Transform")
    .requires("Model")

  .construct(function () {})

  .initialize(function ()
  {
    this.addEventListener("OnFiring", function (object)
    {
      if (object === this.parent.mother)
      {
        // fire a cannonball!
        var t = this.parent.Transform;

        var forward = new global.THREE.Vector3();
        t.getForward(forward);

        var worldPosition = new global.THREE.Vector3();
        t.getWorldPosition(worldPosition);


        this.space.addEntity(TANK.createCannonBall(worldPosition, forward));

        var blastEffect = TANK.createCannonBlast(worldPosition);
        blastEffect.ParticleEmitter.linearVelocity.copy(forward);
        blastEffect.ParticleEmitter.linearVelocity.multiplyScalar(5);
        this.space.addEntity(blastEffect);
      }
    });


  });

}(this, this.TANK = this.TANK ||
{}));