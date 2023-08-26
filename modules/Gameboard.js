import Ship from './Ship';

export default function Gameboard() {
  this.board = [];
  this.shipList = [];

  for (let row = 1; row <= 10; row++) {
    for (let col = 1; col <= 10; col++) {
      const element = {
        col: col,
        row: row,
        isHit: false,
      };
      this.board.push(element);
    }
  }

  this.placeShip = function (col, row, shipLength, orientation) {
    if (
      (orientation === 'horizontal' && col + shipLength > 11) ||
      (orientation === 'vertical' && row + shipLength > 11)
    ) {
      throw new Error('Out of bounds');
    }

    const newShipData = {
      ship: new Ship(shipLength),
      orientation: orientation,
      cells: [],
    };

    // Pushes cells into the newShipData depending on orientation
    if (orientation === 'horizontal') {
      for (let i = col; i < col + shipLength; i++) {
        newShipData.cells.push(this.getCellFromCoordinates(i, row));
      }
    } else if (orientation === 'vertical') {
      for (let i = row; i < row + shipLength; i++) {
        newShipData.cells.push(this.getCellFromCoordinates(col, i));
      }
    }

    // Checks if new ship will collide with other ships
    for (let ship of this.shipList) {
      if (checkShipsCollision(newShipData, ship)) throw new Error('Ships collision');
    }

    // Check if new ship will be adjacent with other ships
    for (let ship of this.shipList) {
      if (checkAdjacentCollision(this, newShipData, ship)) throw new Error('Adjacent');
    }

    this.shipList.push(newShipData);
  };

  this.receiveAttack = function (col, row) {
    if (col < 1 || col > 10 || row < 1 || row > 10) {
      return;
    }

    const cellAttacked = this.getCellFromCoordinates(col, row);
    if (cellAttacked.isHit) {
      throw new Error('Already hit');
    } else {
      cellAttacked.isHit = true;
    }

    // Checks if cell attacked in the ships list
    for (let shipData of this.shipList) {
      for (let shipCell of shipData.cells) {
        if (shipCell === cellAttacked) {
          shipData.ship.hit();
          // Checks if ship was just sunk
          if (shipData.ship.isSunk()) {
            console.log('hundido');
            hitCellsAdjacentToShip(this, shipData);
          }
        }
      }
    }
  };

  this.rotateShip = function (shipData) {
    // Find in what index the input shipData is inside the gameboard ship list
    const shipDataIndex = this.shipList.findIndex((ship) => ship.ship === shipData.ship);

    this.shipList.splice(shipDataIndex, 1);
    const newOrientation = shipData.orientation === 'horizontal' ? 'vertical' : 'horizontal';
    const originCell = shipData.cells[0];
    try {
      this.placeShip(originCell.col, originCell.row, shipData.ship.length, newOrientation);
    } catch (e) {
      // Replaces the ship as it was if couldn't place it rotated
      this.placeShip(originCell.col, originCell.row, shipData.ship.length, shipData.orientation);
    }
  };

  this.areAllShipsSunk = function () {
    return this.shipList.every((shipData) => shipData.ship.isSunk());
  };

  this.getCellFromCoordinates = function (col, row) {
    if (col < 1 || col > 10 || row < 1 || row > 10) {
      return;
    }
    return this.board[col - 1 + (row - 1) * 10];
  };
}

function checkShipsCollision(newShip, ship) {
  for (let shipCell of ship.cells) {
    for (let newShipCell of newShip.cells) {
      if (newShipCell === shipCell) return true;
    }
  }

  return false;
}

function checkAdjacentCollision(gameboard, newShip, ship) {
  for (let shipCell of ship.cells) {
    for (let newShipCell of newShip.cells) {
      const adjacentCells = getAllAdjacentCells(gameboard, newShipCell);
      for (let adjacentCell of adjacentCells) {
        if (adjacentCell === shipCell) return true;
      }
    }
  }

  return false;
}

function hitCellsAdjacentToShip(gameboard, ship) {
  for (let shipCells of ship.cells) {
    const adjacentCells = getAllAdjacentCells(gameboard, shipCells);
    console.log(adjacentCells);
    for (let adjacentCell of adjacentCells) {
      if (adjacentCell) {
        adjacentCell.isHit = true;
      }
    }
  }
}

function getAllAdjacentCells(gameboard, cell) {
  const cellCol = cell.col;
  const cellRow = cell.row;
  const adjacentCells = [];
  adjacentCells.push(
    gameboard.getCellFromCoordinates(cellCol - 1, cellRow - 1),
    gameboard.getCellFromCoordinates(cellCol, cellRow - 1),
    gameboard.getCellFromCoordinates(cellCol + 1, cellRow - 1),
    gameboard.getCellFromCoordinates(cellCol - 1, cellRow),
    gameboard.getCellFromCoordinates(cellCol + 1, cellRow),
    gameboard.getCellFromCoordinates(cellCol - 1, cellRow + 1),
    gameboard.getCellFromCoordinates(cellCol, cellRow + 1),
    gameboard.getCellFromCoordinates(cellCol + 1, cellRow + 1),
  );

  return adjacentCells;
}
