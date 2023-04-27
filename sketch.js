// Pac Man Project
// Edvin Jouband
// Monday, April 24, 2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
// OpenGameArt.org

class Cell {
  constructor(i, j, wall) {
    this.x = i;
    this.y = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbors = [];
    this.previous = undefined;
    //this.isWall = wall;
    this.wall = false;

    if (random(1) < 0.3) {
      this.wall = true;
    }

    // if (this.isWall === 1) {
    //   this.wall = true;
    // }
  }

  display(cellColor) {
    fill(cellColor);
    if (this.wall) {
      fill(0);
    }
    noStroke();
    rect(this.x * cellSize, this.y * cellSize, cellSize - 1, cellSize - 1);
  }

  addNeighbor(grid) {
    let i = this.i;
    let j = this.j;
    if (i < COLS - 1) {
      this.neighbors.push(grid[i + 1][j]);
    }
    if (i > 0) {
      this.neighbors.push(grid[i - 1][j]);
    }
    if (j < ROWS - 1) {
      this.neighbors.push(grid[i][j + 1]);
    }
    if (j > 0) {
      this.neighbors.push(grid[i][j - 1]);
    }
  }
}

let closedSet = [], openSet = [];
let start, end;
let cellSize;
const ROWS = 25, COLS = 25;
//let grid = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0] ,[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
let grid = new Array(COLS);
let path = [];
let noSolution = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  createCellSize();

  createGrid();

  start = grid[0][0];
  end = grid[COLS - 1][ROWS - 1];

  start.wall = false;
  end.wall = false;

  openSet.push(start);
}

function draw() {
  background(220);
  A_star();
  displayGrid();
  displayCells();
}

function A_star() {
  if (openSet.length > 0) {

    let winner = 0;
    for (let i = 0; i < openSet.length; i ++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }

    let current = openSet[winner];

    if (current === end) {
      noLoop();
      console.log("DONE");
    }

    removeFromArray(openSet, current);
    closedSet.push(current);

    let neighbors = current.neighbors;
    for (let i = 0; i < neighbors.length; i ++) {
      let neighbor = neighbors[i];

      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        let tempG = current.g + 1;

        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
          }
        }
        else {
          neighbor.g = tempG;
          openSet.push(neighbor);
        }

        neighbor.h = heuristic(neighbor, end);

        neighbor.f = neighbor.g + neighbor.h;

        neighbor.previous = current;
      }
    }
  }
  else {
    // 
  }
}

function heuristic(a, b) {
  let d = abs(a.i - b.i) + abs(a.j - b.j);
  return d;
}

function removeFromArray(arr, elt) {
  for (let i = arr.length - 1; i >= 0; i --) {
    if (arr[i] === elt) {
      arr.splice(i, 1);
    }
  }
}

function createCellSize() {
  if (width < height) {
    cellSize = windowWidth/ROWS;
  }
  else {
    cellSize = windowHeight/ROWS;
  }
}

function displayGrid() {
  for (let i = 0; i < COLS; i ++) {
    for (let j = 0; j < ROWS; j ++) {
      grid[i][j].display(color(255));
    }
  }
}

function createGrid() {
  for (let i = 0; i < COLS; i ++) {
    grid[i] = new Array(ROWS);
  }

  for (let i = 0; i < COLS; i ++) {
    for (let j = 0; j < ROWS; j ++) {
      grid[i][j] = new Cell(i, j, grid[i][j]);  
    }
  }

  for (let i = 0; i < COLS; i ++) {
    for (let j = 0; j < ROWS; j ++) {
      grid[i][j].addNeighbor(grid);
    }
  }
}

function displayCells() {
  for (let i = 0; i < closedSet.length; i ++) {
    closedSet[i].display(color(255, 0, 0));
  }

  for (let i = 0; i < openSet.length; i ++) {
    closedSet[i].display(color(0, 255, 0));
  }

  if (!noSolution) {
    let winner = 0;
    for (let i = 0; i < openSet.length; i ++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }
    let current = openSet[winner];

    if (current === end) {
      path = [];
      let temp = current;
      path.push(temp);
      while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
      }
      noLoop();
      console.log("DONE");
    }

    path = [];
    let temp = current;
    path.push(temp);
    while (temp.previous) {
      path.push(temp.previous);
      temp = temp.previous;
    }
  }

  for (let i = 0; i < path.length; i ++) {
    path[i].display(color(0, 0, 255));
  }
}