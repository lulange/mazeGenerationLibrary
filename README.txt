This is a library that can be used to generate mazes.

Currently, the syntax to use it is very simple.
There is only one class in mazeGen.js named Maze.
To generate a maze, use:

let maze = new Maze(canvasID [, width] [, height] [, randomness] [, start]);

canvasID is the ID of the canvas that the maze should be drawn on.
Width is the width of the maze and defaults to 10.
Height is the height of the maze and defaults to the width.
Randomness is the percent randomness used to generate the maze and defaults to 10.
Start is an object in the form: {x: 0, y: 1} that is used to determine the maze starting point.
Start defaults to the value given in the form.
End is an object in the form: {x: -1, y: -2} that is used to determine the ending point.
End defaults to the value given in the form and its values are taken off the lengths of the 2d array.

The maze itself should be in the form of a 2d array in which every wall and every space is either a 0 (for empty) or a 1 (for a wall), and should be accessible at maze.maze.
For an example of the maze generator go to "https://lulange.github.io/projects/randomMazeGeneration/" and to see how it could be used see example.html.

NOTE: the length of the 2d array for the maze should be one more than double the width and height that you entered due to it holding all of the walls as well.


To display the maze, use maze.display(x, y, boxWidth, wallWidth, wallColor, passageColor);

X is the x coordinate of the starting point from which the maze will be drawn.
Y is the y coordinate of the starting point from which the maze will be drawn.
BoxWidth is the width of the spaces in the maze.
WallWidth is the width of the walls in the maze.
WallColor is the color of the walls in the form: "#000000".
PassageColor is color of the passages in the form: "#000000".


To find the total width of the maze when displayed use maze.getWidth(boxWidth, wallWidth).
This will return a pixel value equal to the width of the entire maze when displayed using the specified box width and wall width.
maze.getHeight(boxWidth, wallWidth) is the height equivalent to the width function. 


NOTE: The modular maze gen file has the Maze class as its default export.
