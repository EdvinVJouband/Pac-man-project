// Pac Man Project
// Edvin Jouband
// Monday, April 24, 2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
// OpenGameArt.org

let openSet = [], closedSet = [];
let start, end;
const ROWS = 31, COLS = 28;
let cellSize;
// let grid = new Array(COLS);
let grid = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1], 
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1], 
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1], 
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
let pelletArray = [];
let path = [];
let nosolution = false;
let playerX = 0, playerY = 500;
let playerRadius, playerDiameter;
let gameState = "game";

// stores all the nessessairy values for the cells in objects
class Cell {
  constructor(i, j, isWall) {
    this.i = i;
    this.j = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbors = [];
    this.previous = undefined;
    this.wall = false;

    // there is a 30% chance of a cell being generated as a wall/obstacle
    // if (random(1) < 0.3) {
    //   this.wall = true;
    // }

    if (isWall === 1) {
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
  constructor(i, j, isWall) {
    this.i = i;
    this.j = j;
    this.wall = isWall;
    this.pelletSize = 10;
    this.pelletColor = "red";
  }

  display() {
    if(this.wall === 0) {
      fill(this.pelletColor);
      circle(this.i*cellSize + cellSize/2, this.j*cellSize + cellSize/2, this.pelletSize);
    }
  }
}

class Ghost {
  constructor(i, j, pathFinding) {
    this.i = i;
    this.j = j;
    this.pathFinding = pathFinding;

  }

  update() {

  }

  display() {

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
  
  playerDiameter = cellSize - 1;
  playerRadius = playerDiameter/2;
  
  createGrid();
  
  start = grid[0][0];
  end = grid[COLS - 1][ROWS - 1];
  
  start.wall = false;
  end.wall = false;
  
  openSet.push(start);
  
}

function draw() {
  background(220);

  if (gameState === "game") {
    //A_Star();;
  
    displayGrid();
    displayCells();
  
    updatePlayer();
    displayPlayer();
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
      if (grid[i][j].wall === true) {
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
  // for (let i = 0; i < closedSet.length; i ++) {
  //   closedSet[i].show(color(255, 0, 0));
  // }
  // make the color of the neighbors green
  // for (let i = 0; i < openSet.length; i ++) {
  //   openSet[i].show(color(0, 255, 0));
  // }
  
  if (!nosolution) {
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

  // for (let i = 0; i < path.length; i ++) {
  //   path[i].show(color(0, 0, 255));
  // }
}

function displayPlayer() {
  fill("yellow");
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

    for (let i = 0; i < COLS; i ++) {
      for (let j = 0; j < ROWS; j ++) {
        if (pelletArray[i][j] !== 0) {
          pelletCount ++;
        }
      }
    }
  
    if (pelletCount === 0) {
      gameState = "win";
    }
  }

}