// Pac Man Project
// Edvin Jouband
// Monday, April 24, 2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
// OpenGameArt.org

let closedSet = [], openSet = [];
let start, end;
let cellSize;
const ROWS = 25, COLS = 25;
let grid = new Array(COLS);
let path = [];
let noSolution = false;

class Cell {
  constructor(i, j) {
    this.x = i;
    this.y = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbor = [];
    this.previous = undefined;
    this.wall = false;
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

  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  createCellSize();

  createGrid();

  start = grid[0][0];
  end = grid[COLS - 1][ROWS - 1];

  openSet.push(start);
}

function draw() {
  background(220);
  A_star();
  displayGrid();
  displayCells();
}

function A_star() {

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
      grid[i][j] = new Cell(i, j);  
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
}