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

    this.shipList.push(newShipData);
  };

  this.receiveAttack = function (col, row) {
    const cellAttacked = this.getCellFromCoordinates(col, row);
    if (cellAttacked.isHit) {
      throw new Error('Already hit');
    } else {
      cellAttacked.isHit = true;
    }

    // Checks if cell attacked in the ships list
    for (let shipData of this.shipList) {
      for (let cell of shipData.cells) {
        if (cell === cellAttacked) {
          shipData.ship.hit();
        }
      }
    }
  };

  this.areAllShipsSunk = function () {
    return this.shipList.every((shipData) => shipData.ship.isSunk());
  };

  this.getCellFromCoordinates = function (col, row) {
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
