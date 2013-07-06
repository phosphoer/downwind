(function (global, TANK)
{
  "use strict";

  TANK.registerComponent("Hierarchy")

  .construct(function ()
  {
    // The children have to be stored by entity rather than id
    // because they can be added to the hierarchy uninitialized (before an id is assigned)
    this.children = new Array();

    this.attachNonRelative = function (entity)
    {
      if (this.parent._initialized != entity._initialized)
      {
        throw "When attaching/parenting an entity, both must be initialized or uninitialized";
      }

      if (entity.mother)
      {
        throw "An entity can't be attached to more than one object at a time";
      }

      this.children.push(entity);
      entity.mother = this.parent;
    };

    this.detachNonRelative = function (entity)
    {
      for (var index in this.children)
      {
        var child = this.children[index];

        if (child == entity)
        {
          entity.mother = undefined;
          this.children.splice(index, 1);
          return;
        }
      }

      throw "Unable to detach child; the entity you attempted to detach was not a child of this object";
    };
  })

  .initialize(function ()
  {
    for (var index in this.children)
    {
      var child = this.children[index];

      if (child._initialized)
      {
        throw "A child entity was initialized before its parent!";
      }

      this.space.addEntity(child);
    }

  })

  .destruct(function ()
  {
    for (var index in this.children)
    {
      var child = this.children[index];

      // The space will properly handle this if the child was already dead
      this.space.removeEntity(child.id);
    }
  });

}(this, this.TANK = this.TANK ||
{}));