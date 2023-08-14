import Player from './modules/Player';
import updatePlayerDisplay from './modules/updateDisplay';
import { clearShipsDisplay } from './modules/updateDisplay';

const gameboard1Element = document.querySelector('#gameboard-1');
const gameboard2Element = document.querySelector('#gameboard-2');
const gameboardPlaceShips = document.querySelector('#gameboard-place-ships ');

const randomBtn = document.querySelector('.random-btn');
const startGameBtn = document.querySelector('.start-game');
const placeShipsModal = document.querySelector('#place-ships-modal');

const enemySquares = gameboard2Element.querySelectorAll('.square');

placeShipsModal.showModal();

let player1 = new Player();
player1.placeShipsRandom();
updatePlayerDisplay(player1, gameboardPlaceShips, false);

let player2 = new Player();
player2.placeShipsRandom();

// updatePlayerDisplay(player1, gameboard1Element, false);
// updatePlayerDisplay(player2, gameboard2Element, true);

enemySquares.forEach((enemySquare) => {
  enemySquare.addEventListener('click', () => {
    const coordinates = JSON.parse(enemySquare.getAttribute('data-cord'));
    try {
      player1.attack(player2, coordinates.col, coordinates.row);
      player2.attackRandom(player1);
      updateDisplay();
    } catch (e) {
      console.log(e);
    }
  });
});

randomBtn.addEventListener('click', () => {
  player1 = new Player();
  player1.placeShipsRandom();
  clearShipsDisplay(gameboardPlaceShips);
  clearShipsDisplay(gameboard1Element);

  updatePlayerDisplay(player1, gameboardPlaceShips, false);
});

startGameBtn.addEventListener('click', () => {
  placeShipsModal.close();
  updateDisplay();
});

function updateDisplay() {
  updatePlayerDisplay(player1, gameboard1Element, false);
  updatePlayerDisplay(player2, gameboard2Element, true);
}
