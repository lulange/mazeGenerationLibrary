export default class Maze {
  constructor(canvasID, width, height, randomness, start, end) {
    this.canvas = document.getElementById(canvasID);
    this.ctx = canvas.getContext("2d");
    this.width = width || 10;
    this.height = height || this.width;
    this.randomness = randomness || 10;
    this.start = start || {x: 0, y: 1};
    this.end = end || {x: -1, y: -2};
    this.maze = [];
    let stack = [];
    for (let i=0; i<this.height*2 + 1; i++) {
      this.maze.push([]);
      for (let j=0; j<this.width*2 + 1; j++) {
        this.maze[i].push(1);
      }
    }
    let xAndYStart = Math.floor(this.width/2);
    if (xAndYStart % 2 !== 1) {
      xAndYStart++;
    }
    this.maze[xAndYStart][xAndYStart] = 0;
    stack = [{x: xAndYStart, y: xAndYStart}];



    while (stack.length > 0) {
      let randomSelector = Math.random();
      let selectedVertexIndex;
      if (randomSelector > this.randomness/100) {
        selectedVertexIndex = stack.length - 1;
      } else {
        selectedVertexIndex = Math.floor(Math.random() * stack.length);
      }
      let selectedVertex = stack[selectedVertexIndex];

      let possibleExt = [];
      // left
      if (selectedVertex.x !== 1) {
        if (this.maze[selectedVertex.y][selectedVertex.x - 2] === 1) {
          possibleExt.push({x: selectedVertex.x - 2, y: selectedVertex.y});
        }
      }
      // right
      if (selectedVertex.x !== this.maze[0].length - 2) {
        if (this.maze[selectedVertex.y][selectedVertex.x + 2] === 1) {
          possibleExt.push({x: selectedVertex.x + 2, y: selectedVertex.y});
        }
      }
      // down
      if (selectedVertex.y !== 1) {
        if (this.maze[selectedVertex.y - 2][selectedVertex.x] === 1) {
          possibleExt.push({x: selectedVertex.x, y: selectedVertex.y - 2});
        }
      }
      // up
      if (selectedVertex.y !== this.maze.length - 2) {
        if (this.maze[selectedVertex.y + 2][selectedVertex.x] === 1) {
          possibleExt.push({x: selectedVertex.x, y: selectedVertex.y + 2});
        }
      }

      // check possible extensions
      if (possibleExt.length === 0) {
        stack.splice(selectedVertexIndex, 1);
      } else {
        let randomNum = Math.floor(Math.random() * possibleExt.length);
        this.maze[possibleExt[randomNum].y][possibleExt[randomNum].x] = 0;
        // below
        if (possibleExt[randomNum].y > selectedVertex.y) {
          this.maze[possibleExt[randomNum].y-1][possibleExt[randomNum].x] = 0;
        // above
        } else if (possibleExt[randomNum].y < selectedVertex.y) {
          this.maze[possibleExt[randomNum].y+1][possibleExt[randomNum].x] = 0;
        // left
        } else if (possibleExt[randomNum].x > selectedVertex.x) {
          this.maze[possibleExt[randomNum].y][possibleExt[randomNum].x-1] = 0;
        // right
        } else if (possibleExt[randomNum].x < selectedVertex.x) {
          this.maze[possibleExt[randomNum].y][possibleExt[randomNum].x+1] = 0;
        }
        stack.push(possibleExt[randomNum]);
      }
    }

    if (this.start.x >= this.maze[0].length || this.start.y >= this.maze.length || this.maze.length + this.end.y < 0 || this.maze[0].length + this.end.x < 0) {
      console.log("invalid start/end object: exceeds the maze variable length");
    } else {
      if ((this.start.x+2) % 2 === 1 || (this.start.y+2) % 2 === 1) {
        if (((this.end.x*-1)+2) % 2 === 1 || ((this.end.y*-1)+2) % 2 === 1) {
          this.maze[this.start.y][this.start.x] = 0;
          this.maze[this.maze.length+this.end.y][this.maze[0].length+this.end.x] = 0;
        } else {
          console.log("invalid start/end object: must contain an odd number");
        }
      } else {
        console.log("invalid start/end object: must contain an odd number");
      }
    }
  }

  display(x, y, boxWidth, wallWidth, wallColor, passageColor) {
    if (passageColor === undefined || passageColor === null) {
      passageColor = "white";
    }
    if (wallColor === undefined || wallColor === null) {
      wallColor = "black";
    }
    this.ctx.fillStyle = wallColor;
    let totalHeight = Math.round(this.maze.length/2) * wallWidth + Math.floor(this.maze.length/2) * boxWidth;
    let totalWidth = Math.round(this.maze[0].length/2) * wallWidth + Math.floor(this.maze[0].length/2) * boxWidth;
    this.ctx.fillRect(x, y, totalWidth, totalHeight);
    this.ctx.fillStyle = passageColor;
    for (let i=0; i<this.maze.length; i++) {
      for (let j=0; j<this.maze[0].length; j++) {
        if (this.maze[i][j] === 0) {
          let horizontalWall = i % 2 === 0 ? true : false;
          let verticalWall = j % 2 === 0 ? true : false;

          if (!verticalWall && !horizontalWall) {
            let pixelX = (j+1)/2 * wallWidth + (j-1)/2 * boxWidth;
            let pixelY = (i+1)/2 * wallWidth + (i-1)/2 * boxWidth;
            this.ctx.fillRect(pixelX, pixelY, boxWidth, boxWidth);
          } else if (verticalWall) {
            let pixelX = (j/2) * wallWidth + (j/2) * boxWidth;
            let pixelY = (i+1)/2 * wallWidth + (i-1)/2 * boxWidth;
            this.ctx.fillRect(pixelX, pixelY, wallWidth, boxWidth);
          } else {
            let pixelX = (j+1)/2 * wallWidth + (j-1)/2 * boxWidth;
            let pixelY = (i/2) * wallWidth + (i/2) * boxWidth;
            this.ctx.fillRect(pixelX, pixelY, boxWidth, wallWidth);
          }
        }
      }
    }
  }

  getWidth(boxWidth, wallWidth) {
    return Math.round(this.maze[0].length/2) * wallWidth + Math.floor(this.maze[0].length/2) * boxWidth;
  }

  getHeight(boxWidth, wallWidth) {
    return Math.round(this.maze.length/2) * wallWidth + Math.floor(this.maze.length/2) * boxWidth;
  }
}
