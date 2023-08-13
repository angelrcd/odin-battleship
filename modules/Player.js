export default function Player(gameboard) {
  this.gameboard = gameboard;

  this.attack = function (playerToAttack, col, row) {
    playerToAttack.gameboard.receiveAttack(col, row);
  };
}
