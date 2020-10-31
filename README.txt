This is a library that can be used to generate mazes.

Currently, the syntax to use it is very simple.
There is only one class in mazeGen.js named Maze.
To generate a maze, use:

let maze = new Maze([width] [, height] [, randomness] [, start]);

Width is the width of the maze and defaults to 10.
Height is the height of the maze and defaults to the width.
Randomness is the percent randomness used to generate the maze and defaults to 10.
Start is an object in the form: {x: 0, y: 1} that is used to determine the maze starting point.
Start defaults to the value given in the form.

the maze itself should be in the form of a 2d array in which every wall and every space is either a 0 (for empty) or a 1 (for a wall).
For an example of the maze generator go to "https://lulange.github.io/projects/randomMazeGeneration/".

NOTE: the 2d array for the maze should be one more than double the width and height that you entered due to it holding all of the walls as well.

At the moment, it is up to you to display the maze, but those features will be coming soon.
