(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("Cannon")

  .requires("Transform, Model")

  .construct(function ()
  {
    this.lift = 0.35;
    this.returnSmoothing = 0.1;
    this.recoil = 2;
    this.cannonIndex = 0;
    this.isLeft = true;
  })

  .initialize(function ()
  {
    this.initialPosition = this.parent.Transform.position.clone();

    this.addEventListener("OnEnterFrame", function (dt)
    {
      var t = this.parent.Transform;

      t.position.lerp(this.initialPosition, this.returnSmoothing);
    });

    this.addEventListener("OnAttemptFire", function (object, yaw, count)
    {
      if (object !== this.parent.mother)
        return;

      if (this.cannonIndex != count)
        return;

      if (this.isLeft != (yaw < 0))
        return;

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

      var boatVelocity = object.Boat.velocity;

      var ball = TANK.createCannonBall(worldPosition, forward);
      ball.CannonBall.owner = object;
      this.space.addEntity(ball);

      var blastEffect = TANK.createCannonBlast(worldPosition, boatVelocity);
      var originalMagnitude = blastEffect.ParticleEmitter.linearVelocity.length();
      blastEffect.ParticleEmitter.linearVelocity.copy(forward);
      blastEffect.ParticleEmitter.linearVelocity.multiplyScalar(originalMagnitude);

      var partialVelocity = boatVelocity.clone();
      partialVelocity.multiplyScalar(0.5 * (1 / 60.0));
      blastEffect.ParticleEmitter.linearVelocity.add(partialVelocity);

      this.space.addEntity(blastEffect);
    });


  });

}(this, this.TANK = this.TANK ||
{}));