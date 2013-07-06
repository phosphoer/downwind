/*global THREE, Float32Array, Uint16Array */

(function (global)
{
    "use strict";

    // used as index offsets so we can loop through all
    // vertices on a given face
    var offsetOtherAxisA = [0, 1, 1, 0];
    var offsetOtherAxisB = [0, 0, 1, 1];

    // max vertex index since three.js uses shorts internally
    var MAX_INDEX = 60000;

    // utility function to convex hex color to float color
    var convertHexToFloatColor = function (array, hex)
    {
        hex = Math.floor(hex);

        array[0] = (hex >> 16 & 255) / 255;
        array[1] = (hex >> 8 & 255) / 255;
        array[2] = (hex & 255) / 255;

        return array;
    };

    global.BuildVoxelMesh = function (model, config)
    {
        var materialColor = config.materialColor || 0xFFFFFF;
        var bakeao = config.bakeAmbientOcclusion;

        // gets the material index of cube
        // returns null if cube is outside model bounds
        var getMaterial = function (x, y, z)
        {
            if (x < 0 || x >= model.sizeX ||
                y < 0 || y >= model.sizeY ||
                z < 0 || z >= model.sizeZ)
            {
                return null;
            }

            var index = x * model.sizeY * model.sizeZ + y * model.sizeZ + z;
            return model.data[index];
        };

        // iterate through the 3 axis for each cube that is either empty
        // or 1 position outside the border of the model
        var forEachAxisOnEmptyCell = function (callback)
        {
            var x, y, z, material, axis;
            for (x = -1; x <= model.sizeX; ++x)
            {
                for (y = -1; y <= model.sizeY; ++y)
                {
                    for (z = -1; z <= model.sizeZ; ++z)
                    {
                        material = getMaterial(x, y, z);
                        if (material === null || material === -1)
                        {
                            for (axis = 0; axis < 3; ++axis)
                            {
                                callback(x, y, z, axis);
                            }
                        }
                    }
                }
            }
        };

        // we need to allocate fixed buffers, so precompute the
        // size of the index buffer
        var indexCount = 0;
        forEachAxisOnEmptyCell(function (x, y, z, axis)
        {
            // check the front and back face on this axis
            var s, coords, material;
            for (s = -1; s <= 1; s += 2)
            {
                coords = [x, y, z];
                coords[axis] += s;

                // if the adjacent face is filled will need to generate a quad
                material = getMaterial(coords[0], coords[1], coords[2]);
                if (material !== null && material !== -1)
                {
                    indexCount += 6;
                }
            }
        });


        // compute index buffer
        var i, j;
        var temp;
        var geometries = [],
            curr;

        var vertexCount = Math.round(indexCount * 2 / 3);
        var geometryCount = Math.ceil(vertexCount / MAX_INDEX);
        for (i = 0; i < geometryCount; ++i)
        {
            temp = i === geometryCount - 1 ? vertexCount % MAX_INDEX : MAX_INDEX;
            geometries[i] = {};
            curr = geometries[i];
            curr.indices = new Uint16Array(temp / 2 * 3);
            for (j = 0; j < temp / 3; ++j)
            {
                curr.indices[j * 6] = j << 2;
                curr.indices[j * 6 + 1] = (j << 2) + 1;
                curr.indices[j * 6 + 2] = (j << 2) + 2;
                curr.indices[j * 6 + 3] = (j << 2) + 3;
                curr.indices[j * 6 + 4] = (j << 2);
                curr.indices[j * 6 + 5] = (j << 2) + 2;
            }

            // there are 6 indices (2 triangles) per quad
            // each quad has 4 positions with 3 components each
            // so we need (indices * 2) position elements
            curr.positions = new Float32Array(temp * 3);
            curr.normals = new Float32Array(temp * 3);
            curr.colors = new Float32Array(temp * 3);
        }

        // position offset added to each vertex so model is centered
        var offset = [model.sizeX * 0.5, model.sizeY * 0.5, model.sizeZ * 0.5];

        // track size of total positions/normals/colors
        var size = 0;

        // track size of total positions/normals/colors on current mesh
        var currentSize = 0;

        // for each empty face, if adjacent faces are not empty add them
        forEachAxisOnEmptyCell(function (x, y, z, axis)
        {
            var otherA = (axis + 1) % 3,
                otherB = (axis + 2) % 3,
                m, q, coords, material, w, aa, normal, adj, r,
                neighbors, neighbor, scale, scratch = [],
                curr;

            for (m = 0; m < 2; ++m)
            {
                q = m ? 1 : -1;
                coords = [x, y, z];
                coords[axis] += q;

                material = getMaterial(coords[0], coords[1], coords[2]);
                if (material !== null && material !== -1)
                {
                    coords[axis] += -q + m;



                    normal = [0, 0, 0];
                    normal[axis] = -q;
                    for (w = 0; w < 4; ++w)
                    {
                        aa = m ? 3 - w : w;

                        // Computing ambient occlusion for this vertex
                        adj = [coords[0], coords[1], coords[2]];
                        adj[axis] -= m;
                        adj[otherA] += offsetOtherAxisA[aa];
                        adj[otherB] += offsetOtherAxisB[aa];

                        neighbors = 0;
                        for (r = 0; r < 4; ++r)
                        {
                            adj[otherA] -= offsetOtherAxisA[r];
                            adj[otherB] -= offsetOtherAxisB[r];

                            neighbor = getMaterial(adj[0], adj[1], adj[2]);
                            if (neighbor !== null && neighbor !== -1)
                            {
                                ++neighbors;
                            }

                            adj[otherA] += offsetOtherAxisA[r];
                            adj[otherB] += offsetOtherAxisB[r];
                        }

                        //scale = 1.0;
                        scale = bakeao ? 1.0 - neighbors * 0.25 : 1.0;


                        curr = geometries[Math.floor((size / 3) / MAX_INDEX)];
                        currentSize = (Math.floor(size) % (MAX_INDEX * 3));


                        // lookup cube color
                        convertHexToFloatColor(scratch, model.colors[material]);

                        // set vertex position
                        curr.positions[currentSize] = coords[0] - offset[0];
                        curr.positions[currentSize + 1] = coords[1] - offset[1];
                        curr.positions[currentSize + 2] = coords[2] - offset[2];
                        curr.positions[currentSize + otherA] += offsetOtherAxisA[aa];
                        curr.positions[currentSize + otherB] += offsetOtherAxisB[aa];

                        // set vertex normal
                        curr.normals[currentSize] = normal[0];
                        curr.normals[currentSize + 1] = normal[1];
                        curr.normals[currentSize + 2] = normal[2];

                        // set vertex color          
                        curr.colors[currentSize] = scale * scratch[0];
                        curr.colors[currentSize + 1] = scale * scratch[1];
                        curr.colors[currentSize + 2] = scale * scratch[2];

                        size += 3;
                    }

                }
            }
        });

        var base = new THREE.Object3D();
        var geometry, material;
        for (i = 0; i < geometries.length; ++i)
        {
            curr = geometries[i];

            // create three.js objects
            geometry = new THREE.BufferGeometry();
            geometry.attributes = {
                index:
                {
                    itemSize: 1,
                    array: curr.indices,
                    numItems: curr.indices.length
                },
                position:
                {
                    itemSize: 3,
                    array: curr.positions,
                    numItems: curr.positions.length
                },
                normal:
                {
                    itemSize: 3,
                    array: curr.normals,
                    numItems: curr.normals.length
                },
                color:
                {
                    itemSize: 3,
                    array: curr.colors,
                    numItems: curr.colors.length
                }
            };

            geometry.offsets = [
                {
                    start: 0,
                    count: curr.indices.length,
                    index: 0
                }
            ];

            material = new THREE.MeshBasicMaterial(
            {
                vertexColors: true,
                color: materialColor
            });

            base.add(new THREE.Mesh(geometry, material));
        }

        return base;
    };

    function getColor(model, x, y, z)
    {
        var index = x * model.sizeY * model.sizeZ + y * model.sizeZ + z;
        var material = model.data[index];
        var color = null;
        if (material != -1)
        {
            color = model.colors[material];
        }

        return color;
    }

    function blendColors(colors)
    {
        var count = 0,
            red = 0,
            green = 0,
            blue = 0;
        for (var i = 0; i < colors.length; ++i)
        {
            var color = colors[i];
            if (color !== null)
            {
                ++count;
                red += (color >> 16) & 0xFF;
                green += (color >> 8) & 0xFF;
                blue += color & 0xFF;
            }
        }
        if (count <= 2)
        {
            return null;
        }

        return Math.round(red / count) << 16 |
            Math.round(green / count) << 8 |
            Math.round(blue / count);
    }

    global.createHalfSizeModel = function (model)
    {
        var result = {};

        result.sizeX = Math.ceil(model.sizeX * .5);
        result.sizeY = Math.ceil(model.sizeY * .5);
        result.sizeZ = Math.ceil(model.sizeZ * .5);

        var size = result.sizeX * result.sizeY * result.sizeZ;
        result.data = [];
        result.data.length = size;
        for (var i = 0; i < size; ++i)
        {
            result.data[i] = -1;
        }
        result.colors = [];

        var x, y, z;
        var colors = [];
        for (x = 0; x < model.sizeX - 1; x += 2)
        {
            for (y = 0; y < model.sizeY - 1; y += 2)
            {
                for (z = 0; z < model.sizeZ - 1; z += 2)
                {
                    colors[0] = getColor(model, x, y, z);
                    colors[1] = getColor(model, x + 1, y, z);
                    colors[2] = getColor(model, x, y + 1, z);
                    colors[3] = getColor(model, x, y, z + 1);
                    colors[4] = getColor(model, x + 1, y + 1, z);
                    colors[5] = getColor(model, x + 1, y, z + 1);
                    colors[6] = getColor(model, x, y + 1, z + 1);
                    colors[7] = getColor(model, x + 1, y + 1, z + 1);

                    var color = blendColors(colors);
                    //color = colors[0];

                    if (color === null)
                    {
                        continue;
                    }
                    result.colors.push(color);

                    var xx = x / 2,
                        yy = y / 2,
                        zz = z / 2;

                    result.data[xx * result.sizeY * result.sizeZ + yy * result.sizeZ + zz] = result.colors.length - 1;

                }
            }
        }

        return result;
    }

}(this));