export default function updatePlayerDisplay(player, gameBoardElement, areShipsHidden) {
  for (let square of player.gameboard.board) {
    const squareElement = gameBoardElement.children[2].children[square.col - 1 + (square.row - 1) * 10];
    squareElement.classList.remove('hit');
    if (square.isHit) {
      squareElement.classList.add('hit');
    }
  }

  const squaresDataElement = gameBoardElement.querySelector('.squares-data');
  const shipsDataElement = gameBoardElement.querySelector('.ships-data');
  if (squaresDataElement || shipsDataElement) {
    squaresDataElement.innerText = player.getInfo().cellsHit + '/' + player.gameboard.board.length;
    shipsDataElement.innerText = player.getInfo().remainingShip + '/' + player.gameboard.shipList.length;
  }

  updatePlayerShipsDisplay(player.gameboard.shipList, gameBoardElement, areShipsHidden);
}

export function clearShipsDisplay(gameboardElement) {
  for (let squareElement of gameboardElement.children[2].children) {
    squareElement.classList.remove('ship');
  }
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
