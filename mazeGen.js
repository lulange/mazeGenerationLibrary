class Maze {
  constructor(canvasID, width, height, randomness, start) {
    this.canvas = document.getElementById(canvasID);
    this.width = width || 10;
    this.height = height || 10;
    this.randomness = randomness || 10;
    this.start = start || {x: 0, y: 1};


    let boxes = [];
    let stack = [];
    for (let i=0; i<this.height; i++) {
      boxes.push([]);
      for (let j=0; j<this.width; j++) {
        boxes[i].push(1);
      }
    }
    let xAndYStart = Math.floor(width/2);
    if (xAndYStart % 2 !== 1) {
      xAndYStart++;
    }
    boxes[xAndYStart][xAndYStart] = 0;
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
        if (boxes[selectedVertex.y][selectedVertex.x - 2] === 1) {
          possibleExt.push({x: selectedVertex.x - 2, y: selectedVertex.y});
        }
      }
      // right
      if (selectedVertex.x !== boxes[0].length - 2) {
        if (boxes[selectedVertex.y][selectedVertex.x + 2] === 1) {
          possibleExt.push({x: selectedVertex.x + 2, y: selectedVertex.y});
        }
      }
      // down
      if (selectedVertex.y !== 1) {
        if (boxes[selectedVertex.y - 2][selectedVertex.x] === 1) {
          possibleExt.push({x: selectedVertex.x, y: selectedVertex.y - 2});
        }
      }
      // up
      if (selectedVertex.y !== boxes.length - 2) {
        if (boxes[selectedVertex.y + 2][selectedVertex.x] === 1) {
          possibleExt.push({x: selectedVertex.x, y: selectedVertex.y + 2});
        }
      }

      // check possible extensions
      if (possibleExt.length === 0) {
        stack.splice(selectedVertexIndex, 1);
      } else {
        let randomNum = Math.floor(Math.random() * possibleExt.length);
        boxes[possibleExt[randomNum].y][possibleExt[randomNum].x] = 0;
        // below
        if (possibleExt[randomNum].y > selectedVertex.y) {
          boxes[possibleExt[randomNum].y-1][possibleExt[randomNum].x] = 0;
        // above
        } else if (possibleExt[randomNum].y < selectedVertex.y) {
          boxes[possibleExt[randomNum].y+1][possibleExt[randomNum].x] = 0;
        // left
        } else if (possibleExt[randomNum].x > selectedVertex.x) {
          boxes[possibleExt[randomNum].y][possibleExt[randomNum].x-1] = 0;
        // right
        } else if (possibleExt[randomNum].x < selectedVertex.x) {
          boxes[possibleExt[randomNum].y][possibleExt[randomNum].x+1] = 0;
        }
        stack.push(possibleExt[randomNum]);
      }
    }

    this.maze = boxes;
  }
}

let maze = new Maze("hello", 25, 25, 100);
