// Pac Man Project
// Edvin Jouband
// Monday, April 24, 2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
// OpenGameArt.org
// https://dev.to/code2bits/pac-man-patterns--ghost-movement-strategy-pattern-1k1a

let openSet = [], closedSet = [];
let start, end;
const ROWS = 31, COLS = 28;
let cellSize;
// let grid = new Array(COLS);
let pelletArray = [];
let path = [], tempPath = [];
let nosolution = false;
let playerX = 0, playerY = 0, gohstX = 0, gohstY = 0;
let playerRadius, playerDiameter;
let gameState = "game", ghostSate = "attack";
let startTime = 0, currentTime = 0;
let superPelletCount = 0, superPelletsLeft = 4;
let blinky;
let pathFindingState = "START";
let playerCell, ghostCell;
let grid = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
            [1, 0, 0, 3, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 3, 1, 1, 0, 0, 0, 0, 1], 
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1], 
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 2, 1, 2, 2, 2, 1, 2, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 2, 1, 2, 2, 2, 1, 2, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 2, 1, 2, 2, 2, 1, 2, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 2, 1, 2, 2, 2, 1, 2, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 0, 3, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 3, 1, 1, 0, 0, 0, 0, 1], 
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];

// stores all the nessessairy values for the cells in objects
class Cell {
  constructor(i, j, cellValue) {
    this.i = i;
    this.j = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbors = [];
    this.previous = undefined;
    this.wall = false;
    this.cellValue = cellValue;

    // there is a 30% chance of a cell being generated as a wall/obstacle
    // if (random(1) < 0.3) {
    //   this.wall = true;
    // }

    if (this.cellValue === 1) {
      this.wall = true;
    }
  }

  show(cellColor) {
    fill(cellColor);
    if (this.wall) {
      fill(0);
    }
    noStroke();
    rect(this.i * cellSize, this.j * cellSize, cellSize - 1, cellSize - 1);
  }
  
  addNeighbors(grid) {
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

class Pellet {
  constructor(i, j, cellValue2, empty) {
    this.i = i;
    this.j = j;
    this.cellValue2 = cellValue2;
    this.pelletSize = 5;
    this.pelletColor = "red";
    this.empty = empty;
  }

  display() {
    // display regular pellets
    if(this.cellValue2 === 0) {
      fill(this.pelletColor);
      circle(this.i*cellSize + cellSize/2, this.j*cellSize + cellSize/2, this.pelletSize);
    }

    // display super pellets
    if(this.cellValue2 === 3) {
      fill(this.pelletColor);
      circle(this.i*cellSize + cellSize/2, this.j*cellSize + cellSize/2, this.pelletSize*3);
    }

  }
}

class Ghost {
  constructor(ghostSate1) {
    // the - 1 for the positions is so that the ghost doesint start between cells
    this.ghostX = cellSize*COLS/2 - 1;
    this.ghostY = cellSize*ROWS*14/31 + cellSize/2;
    this.gohstSate1 = ghostSate1;

  }

  update() {
    // move towards the first cell in the path
    if (ghostSate === "attack" && tempPath[1] !== undefined) {
      for (let i = tempPath.length - 1; i >= 0; i --) {

        if (this.ghostY !== tempPath[i].j*cellSize + cellSize/2) {

          let difference = this.ghostY - tempPath[i].j*cellSize + cellSize/2;

          if (difference < 0) {
            this.ghostY ++;
          }
          else if (difference > 0) {
            this.ghostY --;
          }
        }
      }
    }

  }

  display() {
    fill("red");
    circle(this.ghostX, this.ghostY, playerDiameter);
  }

  setup() {
    if (this.ghostX < 0) {
      this.ghostX = cellSize*COLS;
    }

    if (this.ghostX > cellSize*COLS) {
      this.ghostX = 0;
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  if (width < height) {
    cellSize = width/COLS;
  }
  else {
    cellSize = height/ROWS;
  }

  // the - 1 for the positions is so that the player doesint start between cells
  playerX = cellSize*COLS/2 - 1;
  playerY = cellSize*ROWS*23/31 + cellSize/2;
  
  playerDiameter = cellSize - 1;
  playerRadius = playerDiameter/2;
  
  createGrid();
  
  // start = grid[1][1];
  // end = grid[COLS - 2][ROWS - 2];
  
  // start.wall = false;
  // end.wall = false;
  
  // openSet.push(start);

  blinky = new Ghost(1, "attack");

  findPlayerPosition();
  findGhostPosition();
  
  start = ghostCell;
  end = playerCell;

  openSet.push(start);
}

function draw() {
  background(220);

  if (gameState === "game") {

    if (pathFindingState === "START") {
      for (let i = 0; i < 1; i ++) {
        A_Star();
      }
    }
  
    displayGrid();
    displayCells();

    findPlayerPosition();
    findGhostPosition();
  
    updatePlayer();
    displayPlayer();

    blinky.setup();
    blinky.display();

    if (pathFindingState === "DONE") {
      blinky.update();

      // if (ghostCell === tempPath[tempPath.length - 1]) {
      //   pathFindingState = "START";

      //   start = ghostCell;
      //   end = playerCell;

      //   closedSet = [];
      //   openSet = [];
  
      //   openSet.push(start);
      // }
    }
  }

  setSate();
}

function removeFromArray(arr, elt){
  for (let i = arr.length - 1; i >= 0; i --) {
    if (arr[i] === elt) {
      arr.splice(i, 1);
    }
  }
}

function changeInArray(arr, elt){
  for (let i = arr.length - 1; i >= 0; i --) {
    if (arr[i] === elt) {
      arr[i] = 0;
    }
  }
}

function heuristic(a, b) {
  let d = abs(a.i - b.i) + abs(a.j - b.j);
  return d;
}

function A_Star() {
  if (openSet.length > 0) {

    let winner = 0;
    for (let i = 0; i < openSet.length; i ++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }
    let current = openSet[winner];

    if (current === end) {
      //noLoop();
      console.log("DONE");
      pathFindingState = "DONE";
      return ;
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
    // console.log("done");
    // return "done";


  }
}

function displayGrid() {
  // displays the grid with the values from the show function
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {

      grid[i][j].show(color(255));

      if(pelletArray[i][j] !== 0) {
        pelletArray[i][j].display();
      }

    } 
  }

  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      if (grid[i][j].wall === true || grid[i][j].cellValue === 2) {
        changeInArray(pelletArray[i], pelletArray[i][j]);
      }
    }
  }
}

function createGrid() {
  // create a 2D array
  // for (let i = 0; i < COLS; i++) {
  //   grid[i] = new Array(ROWS);
  // }

  for (let i = 0; i < COLS; i++) {
    pelletArray[i] = new Array(ROWS);
  }

  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      pelletArray[i][j] = new Pellet(i, j, grid[i][j]);
      grid[i][j] = new Cell(i, j, grid[i][j]);
    }
  }

  // set anu cell with a wall to change it's according pelletArray value to zero
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }
}

function displayCells() {
  // make all cells that have already been checked red
  for (let i = 0; i < closedSet.length; i ++) {
    closedSet[i].show(color(255, 0, 0));
  }
  // make the color of the neighbors green
  for (let i = 0; i < openSet.length; i ++) {
    openSet[i].show(color(0, 255, 0));
  }
  
  if (!nosolution) {
    if (openSet.length > 0) {
      let winner = 0;
      for (let i = 0; i < openSet.length; i ++) {
        if (openSet[i].f < openSet[winner].f) {
          winner = i;
        }
      }
      let current = openSet[winner];

      //if (current === end) {
      // path = [];
      // let temp = current;
      // path.push(temp);
      // while (temp.previous) {
      //   path.push(temp.previous);
      //   temp = temp.previous;
      // }
      // noLoop();
      // console.log("DONE");
      // return "Done";
      //}

      path = [];
      let temp = current;
      path.push(temp);
      while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
      }
    }
  }

  for (let i = 0; i < path.length; i ++) {
    path[i].show(color(0, 0, 255));
  }

  if (pathFindingState === "DONE") {
    tempPath = [...path];
    path = [];
  }
}

function displayPlayer() {
  fill("yellow");

  // just for testing
  if (ghostSate === "runAway") {
    fill("blue");
  }

  circle(playerX, playerY, playerDiameter);
}

function updatePlayer() {
  let playerSpeed = 1;
  for (let m = 0; m < 5; m ++) {
    if (keyIsDown(68)) { //d
      playerX += playerSpeed;
      
      for (let i = 0; i < COLS; i ++) {
        for (let j = 0; j < ROWS; j ++) {
          while (grid[i][j].wall === true && i*cellSize + cellSize > playerX - playerRadius && i*cellSize < playerX + playerRadius && j*cellSize < playerY + playerRadius && j*cellSize + cellSize > playerY - playerRadius) {
            playerX -= 1;
          }
        }
      }

    }
    if (keyIsDown(65)) { //a
      playerX -= playerSpeed;

      for (let i = 0; i < COLS; i ++) {
        for (let j = 0; j < ROWS; j ++) {
          while (grid[i][j].wall === true && i*cellSize + cellSize >= playerX - playerRadius && i*cellSize <= playerX + playerRadius && j*cellSize <= playerY + playerRadius && j*cellSize + cellSize >= playerY - playerRadius) {
            playerX += 1;
          }
        }
      }

    }
    if (keyIsDown(87)) { //w
      playerY -= playerSpeed;

      for (let i = 0; i < COLS; i ++) {
        for (let j = 0; j < ROWS; j ++) {
          while (grid[i][j].wall === true && i*cellSize + cellSize >= playerX - playerRadius && i*cellSize <= playerX + playerRadius && j*cellSize <= playerY + playerRadius && j*cellSize + cellSize >= playerY - playerRadius) {
            playerY += 1;
          }
        }
      }

    }
    if (keyIsDown(83)) { //s
      playerY += playerSpeed;

      for (let i = 0; i < COLS; i ++) {
        for (let j = 0; j < ROWS; j ++) {
          while (grid[i][j].wall === true && i*cellSize + cellSize >= playerX - playerRadius && i*cellSize <= playerX + playerRadius && j*cellSize <= playerY + playerRadius && j*cellSize + cellSize >= playerY - playerRadius) {
            playerY -= 1;
          }
        }
      }

    }

    // set starting location
    if (playerX < 0) {
      playerX = cellSize*COLS;
    }

    if (playerX > cellSize*COLS) {
      playerX = 0;
    }

  }

  // eat pellets
  for (let i = 0; i < COLS; i ++) {
    for (let j = 0; j < ROWS; j ++) {
      if (i*cellSize + cellSize/2 + 10 >= playerX - playerRadius && i*cellSize + cellSize/2 - 10 <= playerX + playerRadius && j*cellSize + cellSize/2 - 10 <= playerY + playerRadius && j*cellSize + cellSize/2 + 10 >= playerY - playerRadius) {
        changeInArray(pelletArray[i], pelletArray[i][j]);
      }
    }
  }
}

function setSate() {
  if (gameState === "menu" && keyIsDown(13)) { //enter
    gameState = "game";
  }
  
  if (gameState === "game") {
    let pelletCount = 0;
    superPelletCount = 0;

    for (let i = 0; i < COLS; i ++) {
      for (let j = 0; j < ROWS; j ++) {
        // count pellets
        if (pelletArray[i][j] !== 0) {
          pelletCount ++;
        }

        // count super pellets
        if (pelletArray[i][j].cellValue2 === 3) {
          superPelletCount ++;
        }
      }
    }

    if (superPelletCount !== superPelletsLeft) {
      ghostSate = "runAway";
      superPelletsLeft --;
      superPelletCount --;
      startTime = 0;
    }
    if(ghostSate === "runAway") {
      if (startTime === 0) {
        startTime = millis();
      }

      currentTime = millis();
      if (currentTime > startTime + 10000) {
        ghostSate = "attack";
        startTime = 0;
      }
    }
  
    if (pelletCount === 0) {
      gameState = "win";
    }
  }

}

function findPlayerPosition() {
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      if (i*cellSize + cellSize > playerX && i*cellSize < playerX && j*cellSize < playerY && j*cellSize + cellSize > playerY) {
        fill("purple");
        rect(grid[i][j].i * cellSize, grid[i][j].j * cellSize, cellSize - 1, cellSize - 1);
        playerCell = grid[i][j];
      }
    }
  }
}

function findGhostPosition() {
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      if (i*cellSize + cellSize > blinky.ghostX && i*cellSize < blinky.ghostX && j*cellSize < blinky.ghostY && j*cellSize + cellSize > blinky.ghostY) {
        fill("purple");
        rect(grid[i][j].i * cellSize, grid[i][j].j * cellSize, cellSize - 1, cellSize - 1);
        ghostCell = grid[i][j];
      }
    }
  }
}