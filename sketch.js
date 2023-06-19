// Pac Man Project
// Edvin Jouband
// Monday, April 24, 2023
//
// Extra for Experts:
// I applyed the A_star pathfinding algorithim to moving objects, althougth it dosint quit work.
// by the way when you run the code the ghost should make it all the way throught the path, at home it works for me but at school it didint so just letting you know

let openSet = [], closedSet = [];
let start, end;
const ROWS = 31, COLS = 28;
let cellSize;
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
let currentCell = -1;
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

    // if there is a 1 in the grid it becomes a wall in the game
    if (this.cellValue === 1) {
      this.wall = true;
    }
  }

  // display the cells as black for walls and white for empty space
  show(cellColor) {
    fill(cellColor);
    if (this.wall) {
      fill(0);
    }
    noStroke();
    rect(this.i * cellSize, this.j * cellSize, cellSize - 1, cellSize - 1);
  }
  
  // count the neighbors of each cell
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
    // the - 1 for the positions is so that the ghost doesint start on the edge of two cells
    this.ghostX = cellSize*COLS/2 + cellSize/2 - 1;
    this.ghostY = cellSize*ROWS*14/31 + cellSize/2;
    this.gohstSate1 = ghostSate1;

  }

  update() {
    // move through each cell in the order of the path
    if (currentCell === -1) {
      currentCell = tempPath.length - 1;
    }

    if (ghostCell.j !== tempPath[currentCell].j) {

      if (ghostCell.j > tempPath[currentCell].j) {
        this.ghostY -= cellSize/10;
      }
      else if (ghostCell.j < tempPath[currentCell].j) {
        this.ghostY += cellSize/10;
      }
    }

    if (ghostCell.i !== tempPath[currentCell].i) {

      if (ghostCell.i > tempPath[currentCell].i) {
        this.ghostX -= cellSize/10;
      }
      else if (ghostCell.i < tempPath[currentCell].i) {
        this.ghostX += cellSize/10;
      }
    }

    if (ghostCell.i === tempPath[currentCell].i && ghostCell.j=== tempPath[currentCell].j) {
      currentCell --;
    }
    findGhostPosition();
  }

  display() {
    // display the ghost as a red circle
    fill("red");
    circle(this.ghostX, this.ghostY, playerDiameter);
  }

  setup() {
    // helps set the ghost starting position
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

  // the - 1 for the positions is so that the player doesint start on the edge of two cells
  playerX = cellSize*COLS/2 - 1;
  playerY = cellSize*ROWS*23/31 + cellSize/2;
  
  playerDiameter = cellSize - 1;
  playerRadius = playerDiameter/2;
  
  createGrid();

  blinky = new Ghost(1, "attack");

  // find wich cell the ghost and player are in
  findPlayerPosition();
  findGhostPosition();
  
  // make the cell the ghost is in the start of the pathfinding algorithim and the cell the player is on the end
  start = ghostCell;
  end = playerCell;

  openSet.push(start);

  blinky.setup();
}

function draw() {
  background(220);

  // only run the game when it's not in the menu or win en state
  if (gameState === "game") {

    // this runs the pathfinding but only when in the right state
    if (pathFindingState === "START") {
      A_Star();
    }
  
    displayGrid();
    displayCells();

    findPlayerPosition();
    findGhostPosition();
  
    updatePlayer();
    displayPlayer();

    blinky.display();

    // this is a check so that when the pathfinding is done it ends and the ghost moves, then when the ghost reaches the end the pathfing should start again, if you uncomment tha tlast line it will crash but it's supposed to pathfind again
    if (pathFindingState === "DONE") {
      blinky.update();
      if (ghostCell.j === end.j && ghostCell.i === end.i) {
        pathFindingState = "OVER";
      }
    }

    if (pathFindingState === "OVER") {
      path = [];
  
      start = ghostCell;
      end = playerCell;
  
      closedSet = [];
      openSet = [];
  
      openSet.push(start);

      // pathFindingState = "START";
    }
  }

  setSate();
}

function removeFromArray(arr, elt){
  // removes a given element form a given array if seen
  for (let i = arr.length - 1; i >= 0; i --) {
    if (arr[i] === elt) {
      arr.splice(i, 1);
    }
  }
}

function changeInArray(arr, elt){
  // changes a given element from a given array if seen, I used this for the pellets because I didint want to delete them because it would change the length of the array
  for (let i = arr.length - 1; i >= 0; i --) {
    if (arr[i] === elt) {
      arr[i] = 0;
    }
  }
}

function heuristic(a, b) {
  // finds the dirrect distance of the two given points
  let d = abs(a.i - b.i) + abs(a.j - b.j);
  return d;
}

// this was mostlybin my last project so I wont mention it much
function A_Star() {
  // runs if the openset is not empty
  if (openSet.length > 0) {

  // let the cell with the lowest f score be the winner
    let winner = 0;
    for (let i = 0; i < openSet.length; i ++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }
    let current = openSet[winner];

    if (current === end) {
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
  // creates the cells and pellets based on my precodded grid
  for (let i = 0; i < COLS; i++) {
    pelletArray[i] = new Array(ROWS);
  }

  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      pelletArray[i][j] = new Pellet(i, j, grid[i][j]);
      grid[i][j] = new Cell(i, j, grid[i][j]);
    }
  }

  // set any cell with a wall to change it's according pelletArray value to zero
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
  
  // finds the path by comparing scores from the A_star function and building it backwards
  if (!nosolution) {
    if (openSet.length > 0) {
      let winner = 0;
      for (let i = 0; i < openSet.length; i ++) {
        if (openSet[i].f < openSet[winner].f) {
          winner = i;
        }
      }
      let current = openSet[winner];

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

  // creates a temp path for the ghost to move through
  if (pathFindingState === "DONE") {
    tempPath = [...path];
    path = [];
  }
}

function displayPlayer() {
// displays the player as a yellow circle, was going to add animations latter
  fill("yellow");

  // just for testing
  if (ghostSate === "runAway") {
    fill("blue");
  }

  circle(playerX, playerY, playerDiameter);
}

function updatePlayer() {
  // I calculate the movement 5 times so the player moves fast and fits throught the in cell wide gaps in the level
  // the player will get push out of any cell labelled as wall
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

  // the player will eat any pellets it touches
  for (let i = 0; i < COLS; i ++) {
    for (let j = 0; j < ROWS; j ++) {
      if (i*cellSize + cellSize/2 + 10 >= playerX - playerRadius && i*cellSize + cellSize/2 - 10 <= playerX + playerRadius && j*cellSize + cellSize/2 - 10 <= playerY + playerRadius && j*cellSize + cellSize/2 + 10 >= playerY - playerRadius) {
        changeInArray(pelletArray[i], pelletArray[i][j]);
      }
    }
  }
}

function setSate() {
  // set's the states, the game starts in a menu you need to press enter to leave and then it starts and if you eat all the cells the game ends
  // I dont use the menu state for testing and becauser I didint have time to addd anything to it
  if (gameState === "menu" && keyIsDown(13)) { //enter
    gameState = "game";
  }
  
  if (gameState === "game") {
    let pelletCount = 0;
    superPelletCount = 0;

    // I count all the remaining pellets to determin wether or not to end the game
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

    // when you eat a big/super pellet the state of the player changes for a set time, the timer get's reset every time you eat one
    // the time a set was temporary, also the player turn sblue when this timer is active for testing
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
  // finds wich cell the center of the player is in
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
  // finds when the ghosts passes the center of a cell, to know were it si and realingns it
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      if (abs(i * cellSize + cellSize/2 - 1 - blinky.ghostX) < cellSize/10 && abs(j * cellSize + cellSize/2 - 1 - blinky.ghostY) < cellSize/10) {
        fill("purple");
        rect(grid[i][j].i * cellSize, grid[i][j].j * cellSize, cellSize - 1, cellSize - 1);
        ghostCell = grid[i][j];

        blinky.ghostX = i * cellSize + cellSize/2 - 1;
        blinky.ghostY = j * cellSize + cellSize/2 - 1;
      }
    }
  }
}