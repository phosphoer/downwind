(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("Cannon")

  .requires("Transform")
    .requires("Model")

  .construct(function ()
  {
    this.lift = 0.15;
    this.returnSmoothing = 0.1;
    this.recoil = 2;
  })

  .initialize(function ()
  {
    this.initialPosition = this.parent.Transform.position.clone();

    this.addEventListener("OnEnterFrame", function (dt)
    {
      var t = this.parent.Transform;

      t.position.lerp(this.initialPosition, this.returnSmoothing);
    });

    this.addEventListener("OnFiring", function (object)
    {
      if (object === this.parent.mother)
      {
        // fire a cannonball!
        var t = this.parent.Transform;

        var recoilVec = new global.THREE.Vector3(-this.recoil, 0, 0);
        t.position.add(recoilVec);

        var forward = new global.THREE.Vector3();
        t.getForward(forward);
        // Now we normalize it, to ignore any scaling from before
        forward.normalize();

        forward.y += this.lift;
        forward.normalize();

        var worldPosition = new global.THREE.Vector3();
        t.getWorldPosition(worldPosition);


        this.space.addEntity(TANK.createCannonBall(worldPosition, forward));

        var blastEffect = TANK.createCannonBlast(worldPosition);
        var originalMagnitude = blastEffect.ParticleEmitter.linearVelocity.length();
        blastEffect.ParticleEmitter.linearVelocity.copy(forward);
        blastEffect.ParticleEmitter.linearVelocity.multiplyScalar(originalMagnitude);
        this.space.addEntity(blastEffect);
      }
    });


  });

}(this, this.TANK = this.TANK ||
{}));