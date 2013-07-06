#!/usr/bin/python
import sys


if __name__ == '__main__':
    
    #python model_builder.py raw\Boat.qef Boat > js\Boat.js

    lines = [line.strip() for line in open(sys.argv[1])]


    size = [int(x) for x in lines[3].split()]
    materialCount = int(lines[4])
    #print("size :", size)
    #print("material count:", materialCount)

    colors = []
    for i in range(0, materialCount):
        index = i + 5

        color = [round(float(x) * 255) for x in lines[index].split()]
        colors.append((color[0] << 16) | (color[1] << 8) | color[2])

    #print(colors)


    offset = 5 + materialCount 
    voxelCount = size[0] * size[1] * size[2]
    voxels = [-1] * voxelCount
    #print("voxel count:", voxelCount)

    for i in range(offset, len(lines)):
      
        line = lines[i].split();
        
        x = int(line[0])
        y = int(line[1])
        z = int(line[2])
        material = int(line[3])

        dest = x * size[1] * size[2] + y * size[2] + z

        voxels[dest] = material

    # output js object
    print("var " + sys.argv[2] + " = ");

    print("{ \n  sizeX: " + str(size[0]) +
           ",\n  sizeY: " + str(size[1]) + 
           ",\n  sizeZ: " + str(size[2]) + ",")

    # colors
    print("  colors : [ ", end="")
    for i in range(0, len(colors)):
        if i != len(colors) - 1:
            print("" + hex(colors[i]) + ",", end="")
        else:
            print("" + hex(colors[i]), end="")
    print(" ],")

    # data
    print("  data : [ ", end="")
    for i in range(0, len(voxels)):

        if i != len(voxels) - 1:
            print("" + str(voxels[i]) + ",", end = "")
        else:
            print("" + str(voxels[i]), end = "")
    print(" ]")

    print("};")


