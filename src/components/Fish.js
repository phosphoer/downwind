(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("Fish")

  .requires("Transform")

  .construct(function ()
  {
    this.velocity = new global.THREE.Vector3();
    this.angle = 0;
    this.jumping = false;
    this.tilNextJump = 0;
    this.timer = 0;
    this.jumpLength = 35;
    this.amplitude = 3;
  })

  .initialize(function ()
  {
    this.parent.Transform.getForward(this.velocity);
    this.velocity.multiplyScalar((global.Math.random() + 2) *8);
    // Swim on surface of Ocean
    this.addEventListener("OnEnterFrame", function (dt)
    {

      var t = this.parent.Transform;

      if (this.jumping)
      {
        this.amplitude = 15;
        ++this.timer;
        
        if (this.timer >= this.jumpLength)
        {
          this.jumping = false;
          this.timer = 0;
          this.tilNextJump = global.Math.random() * 4000;
          this.amplitude = 3;
        }
      }

      var obj = this.space.getEntity("Ocean");
      if (obj)
      {
        t.position.y = obj.Ocean.getHeight(t.position.x, t.position.z) + 
                       global.Math.sin(this.angle) * this.amplitude;
      }

      // Integrate position
      var vel = this.velocity.clone();
      vel.multiplyScalar(dt);
      t.position.add(vel);

      this.angle += .025;

      if (this.tilNextJump <= 0)
      {
        this.jumping = true;
      }
      else
      {
        --this.tilNextJump;
      }

      //orient the model the the position of direciton
    });
  });

}(this, this.TANK = this.TANK ||
{}));