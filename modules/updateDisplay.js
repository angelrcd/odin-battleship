export default function updatePlayerDisplay(player, gameBoardElement, areShipsHidden) {
  for (let square of player.gameboard.board) {
    const squareElement = gameBoardElement.children[2].children[square.col - 1 + (square.row - 1) * 10];
    if (square.isHit) {
      squareElement.classList.add('hit');
    }
  }

  updatePlayerShipsDisplay(player.gameboard.shipList, gameBoardElement, areShipsHidden);
}

function updatePlayerShipsDisplay(playerShipList, gameBoardElement, shipsHidden) {
  for (let shipData of playerShipList) {
    for (let shipCell of shipData.cells) {
      const shipCellCol = shipCell.col;
      const shipCellRow = shipCell.row;

      const squareElem = gameBoardElement.querySelector(
        `.square[data-cord='{"col":${shipCellCol},"row":${shipCellRow}}']`,
      );
      if (!shipsHidden) {
        squareElem.classList.add('ship');
      } else {
        if (squareElem.classList.contains('hit')) {
          squareElem.classList.add('ship');
        }
      }

      if (shipData.ship.isSunk()) {
        squareElem.classList.add('sunk');
      }
    }
  }
}
