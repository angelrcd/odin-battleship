import Gameboard from './Gameboard';
const SHIPS_LENGTHS = [5, 4, 3, 3, 2, 2, 1, 1];

export default function Player() {
  this.gameboard = new Gameboard();

  this.attack = function (playerToAttack, col, row) {
    playerToAttack.gameboard.receiveAttack(col, row);
  };

  this.attackRandom = function (playerToAttack) {
    try {
      this.attack(playerToAttack, Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1);
    } catch (err) {
      this.attackRandom(playerToAttack);
    }
  };

  // 5 4 3 3 2 2 1 1
  this.placeShipsRandom = function () {
    while (this.gameboard.shipList.length < 8) {
      try {
        this.placeShipRandom(SHIPS_LENGTHS[this.gameboard.shipList.length]);
      } catch (e) {}
    }
  };

  this.placeShipRandom = function (shipLength) {
    const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
    const coordinates = getRandomCoordinates();

    this.gameboard.placeShip(coordinates.col, coordinates.row, shipLength, orientation);
  };
}

function getRandomCoordinates() {
  return {
    col: Math.floor(Math.random() * 10) + 1,
    row: Math.floor(Math.random() * 10) + 1,
  };
}
