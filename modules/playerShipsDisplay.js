export default function updatePlayerShipsDisplay(playerShipList, gameBoardElement) {
  for (let shipData of playerShipList) {
    for (let shipCell of shipData.cells) {
      const shipCellCol = shipCell.col;
      const shipCellRow = shipCell.row;

      const squareElem = gameBoardElement.querySelector(
        `.square[data-cord='{"col":${shipCellCol},"row":${shipCellRow}}']`,
      );
      squareElem.classList.add('ship');

      if (shipData.ship.isSunk()) {
        squareElem.classList.add('sunk');
      }
    }
  }
}
