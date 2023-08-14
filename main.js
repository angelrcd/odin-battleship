import Player from './modules/Player';
import Gameboard from './modules/Gameboard';
import Ship from './modules/Ship';
import updatePlayerDisplay from './modules/updateDisplay';

const placeShipsModal = document.querySelector('#place-ships-modal');
const gameboard1Element = document.querySelector('#gameboard-1');
const gameboard2Element = document.querySelector('#gameboard-2');
const enemySquares = gameboard2Element.querySelectorAll('.square');
// placeShipsModal.showModal();

const player1 = new Player();
player1.placeShipsRandom();

const player2 = new Player();
player2.placeShipsRandom();

updatePlayerDisplay(player1, gameboard1Element, false);
updatePlayerDisplay(player2, gameboard2Element, true);

enemySquares.forEach((enemySquare) => {
  enemySquare.addEventListener('click', () => {
    const coordinates = JSON.parse(enemySquare.getAttribute('data-cord'));
    try {
      player1.attack(player2, coordinates.col, coordinates.row);
      updateDisplay();
    } catch (e) {
      console.log(e);
    }
  });
});

function updateDisplay() {
  updatePlayerDisplay(player1, gameboard1Element, false);
  updatePlayerDisplay(player2, gameboard2Element, true);
}
