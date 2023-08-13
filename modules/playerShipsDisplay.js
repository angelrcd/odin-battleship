export default function updatePlayerShipsDisplay(playerShipList, gameBoardElement, shipsHidden) {
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
