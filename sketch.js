// Pac Man Project
// Edvin Jouband
// Monday, April 24, 2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Cell {
  constructor(i, j) {
    this.x = i;
    this.y = j;
  }
}

let cellSize;
const ROWS = 25, COLS = 25;

function setup() {
  createCanvas(windowWidth, windowHeight);
  createCellSize();
}

function draw() {
  background(220);
}

function createCellSize() {
  if (width < height) {
    cellSize = width/ROWS;
  }
  else {
    cellSize = height/ROWS;
  }
}