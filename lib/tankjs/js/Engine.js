// The MIT License (MIT)
//
// Copyright (c) 2013 David Evans, Killian Koenig
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.


// The `TANK` namespace provides access to the core functionality of the engine.
// This includes creating entities and spaces, and registering components
(function (TANK)
{
  "use strict";

  // ### Enable/Disable error messages
  TANK.errorsEnabled = true;

  // ### Enable/Disable warning messages
  TANK.warningsEnabled = true;

  // ### Enable/Disable logging messages
  TANK.logsEnabled = true;

  // ### Create an Entity
  // Creates a new entity and returns it. The parameters to the function are
  // passed directly to `Entity.addComponents` after construction.
  // Components can be given as a string of comma seperated values, a list of strings, or some combination of the above.

  // `Entity TANK.createEntity(...)`

  // - `...` a string of comma seperated values, a list of strings, or some combination of the above.
  // - `return` A new entity.
  TANK.createEntity = function ()
  {
    var entity = new TANK.Entity(-1);
    return entity.addComponents.apply(entity, arguments);
  };

  // ### Create Entity from prefab
  // Creates a new `Entity` using a given prefab.

  // `Entity TANK.createEntityFromPrefab(prefabName)`

  // - `prefabName` Name of the prefab to clone.
  // - `return` A new `Entity`.
  TANK.createEntityFromPrefab = function (prefabName)
  {
    var prefab = TANK.getPrefab(prefabName);
    if (!prefab)
    {
      TANK.warning("Could not find a prefab named " + prefabName);
      return;
    }

    var entity = TANK.createEntity();
    var component;
    var componentData;
    var componentName, propertyName;
    for (componentName in prefab)
    {
      if (prefab.hasOwnProperty(componentName))
      {
        entity.addComponent(componentName);

        // Copy over fields from prefab into new component
        component = entity[componentName];
        componentData = prefab[componentName];
        for (propertyName in componentData)
        {
          if (componentData.hasOwnProperty(propertyName))
          {
            component[propertyName] = componentData[propertyName];
          }
        }
      }
    }

    return entity;
  };

  // ### Create a space
  // Creates a new `Space` and returns it. The parameters to the function are passed
  // directly to `Space.addComponents` after construction.

  // `Space TANK.createSpace(...)

  // - `...` a string of comma seperated values, a list of strings, or some combination of the above.
  // - `return` A new space.
  TANK.createSpace = function ()
  {
    var space = new TANK.Space();
    space.addComponents.apply(space, arguments);
    return space;
  }

  // ### Add a space to the engine
  // Adds the given space to the engine, which will initialize all of its components.

  // `void TANK.addSpace(space, name)`

  // - `space` The space object to add.
  // - `name` The name to refer to the space by. The space will then be accessible through `TANK.SpaceName`.
  TANK.addSpace = function (space, name)
  {
    TANK._spaces[name] = space;
    TANK[name] = space;

    for (var i in space._components)
    {
      if (space._components.hasOwnProperty(i))
        space._components[i].initialize();
    }

    for (var i in space._components)
    {
      if (space._components.hasOwnProperty(i))
        space.dispatchEvent("OnComponentInitialized", space._components[i]);
    }

    space._initialized = true;
  }

  // ### Remove a space from the engine
  // Removes the given space from the engine, uninitializing all its components.

  // `void TANK.removeSpace(space)`

  // - `space` Either the name of the space or the space object.
  TANK.removeSpace = function (space)
  {
    if (typeof space === "string")
    {
      if (TANK[space])
      {
        TANK._spacesDeleted.push(TANK[space]);
      }
      else
      {
        TANK.error("Attempting to remove Space " + space + " which doesn't exist.");
      }
    }
    else if (space instanceof TANK.Space)
    {
      TANK._spacesDeleted.push(space);
    }
    else
    {
      TANK.error("Attemping to remove a Space with neither a string name, nor Space reference: " + arg);
    }
  }

  // ### Register an object prefab
  // Use this to define an entity with a set of components that
  // can be instantiated later, like a blueprint.

  // `void TANK.addPrefab(name, data)`

  // - `name` The name of the prefab to store it under.
  // - `data` A JSON object describing the components the prefab should contain,
  // with the following format:

  //         {
  //             "Pos2D": { x: 0, y: 42 },
  //             "Velocity": {},
  //             "Collider": { width: 5, height: 5 },
  //         }
  TANK.addPrefab = function (name, data)
  {
    TANK._prefabs[name] = data;
  };

  // ### Get a prefab object

  // `Object TANK.getPrefab(name)`

  // - `name` The name of the prefab to find.
  // - `return` A prefab JSON object in the same format as given to `TANK.addPrefab`.
  TANK.getPrefab = function (name)
  {
    return TANK._prefabs[name];
  };

  // ### Register a new component type
  // Creates a new component instance which defines a blueprint
  // for a type of component.

  // `Component TANK.registerComponent(componentName)`

  // - `componentName` The name of the component type to register. This must be a valid identifier.
  // - `return` A new instance of type `Component`.
  TANK.registerComponent = function (componentName)
  {
    // Warn about components with invalid identifiers
    if (componentName[0] >= 0 && componentName[0] <= 9 || componentName.search(" ") >= 0)
    {
      TANK.error(componentName + " is an invalid identifier and won't be accessible without [] operator");
      return;
    }

    var c = new TANK.Component(componentName);
    TANK._registeredComponents[componentName] = c;
    return c;
  };

  // ### Start the engine main loop

  // `void TANK.start()`
  TANK.start = function ()
  {
    TANK._lastTime = new Date();
    TANK._running = true;

    update()
  };

  // ### Stop the engine

  // `void TANK.stop()`
  TANK.stop = function ()
  {
    TANK._running = false
  };

  // ### Reset the engine
  // This deletes all game objects and resets the state of the engine.
  // Things like prefabs and component definitions are preserved.

  // `void TANK.reset()`
  TANK.reset = function ()
  {
    TANK._resetting = true;
    for (var i in TANK._spaces)
    {
      TANK._spaces[i].removeAllEntities();
    }
  };

  // ### Log a message to console

  // `void TANK.log(text)`

  // `text` - Text to display.
  TANK.log = function (text)
  {
    if (!TANK.logsEnabled)
      return;

    console.log(text);
  };


  // ### Log a warning message to console

  // `void TANK.warn(text)`

  // `text` - Text to display.
  TANK.warn = function (text)
  {
    if (!TANK.warningsEnabled)
      return;

    console.warn(text);
  };

  // ### Log an error message to console

  // `void TANK.error(text)`

  // `text` - Text to display.
  TANK.error = function (text)
  {
    if (!TANK.errorsEnabled)
      return;

    console.error(text);
  };

  function update()
  {
    // Get dt
    var new_time = new Date();
    var dt = (new_time - TANK._lastTime) / 1000.0;
    if (dt > 0.05)
      dt = 0.05;

    // Cleanup each space
    for (var i in TANK._spaces)
    {
      if (TANK._spaces.hasOwnProperty(i))
      {
        TANK._spaces[i].clearDeletedObjects();
      }
    }

    // If we are resetting the engine, stop updating before the next frame but after
    // we've cleared up the deleted objects
    if (TANK._resetting)
    {
      // Remove all engine components
      for (var i in TANK._spaces)
      {
        TANK._spaces[i].destruct();
        delete TANK[i];
      }
      TANK._spaces = {};
      TANK._resetting = false;
      TANK._running = false;
      main();
      return;
    }

    // Update each space
    for (var i in TANK._spaces)
    {
      if (TANK._spaces.hasOwnProperty(i))
      {
        TANK._spaces[i].update(dt);
      }
    }

    // Queue next frame
    if (TANK._running)
      requestAnimFrame(update);
  };

  // Map of prefabs with name as key
  TANK._prefabs = {};

  // Map of spaces by name
  TANK._spaces = {};

  // Array of spaces to delete
  TANK._spacesDeleted = [];

  // Map of current registered component types
  // Key is the name of the component
  TANK._registeredComponents = {};

  // Current ID for game objects
  TANK._currentID = 0;

  // Last update time
  TANK._lastTime = new Date();

  // Whether or not the engine is running
  TANK._running = false;

  // Whether or not the engine is in the resetting state
  TANK._resetting = false;

}(this.TANK = this.TANK ||
{}));