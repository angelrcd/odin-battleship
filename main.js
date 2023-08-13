import Player from './modules/Player';
import Gameboard from './modules/Gameboard';
import Ship from './modules/Ship';
import updatePlayerShipsDisplay from './modules/playerShipsDisplay';

const placeShipsModal = document.querySelector('#place-ships-modal');
const gameboard1Element = document.querySelector('#gameboard-1');
const gameboard2Element = document.querySelector('#gameboard-2');
const enemySquares = gameboard2Element.querySelectorAll('.square');
// placeShipsModal.showModal();

const player1 = new Player(new Gameboard());

player1.gameboard.placeShip(1, 1, 4, 'horizontal');
player1.gameboard.placeShip(2, 7, 2, 'horizontal');
player1.gameboard.placeShip(5, 3, 3, 'vertical');
player1.gameboard.placeShip(10, 1, 5, 'vertical');
updatePlayerShipsDisplay(player1.gameboard.shipList, gameboard1Element, false);

const player2 = new Player(new Gameboard());

player2.gameboard.placeShip(1, 1, 4, 'horizontal');
player2.gameboard.placeShip(2, 7, 2, 'horizontal');
player2.gameboard.placeShip(5, 3, 3, 'vertical');
player2.gameboard.placeShip(10, 1, 5, 'vertical');

updatePlayerShipsDisplay(player1.gameboard.shipList, gameboard1Element, false);
updatePlayerShipsDisplay(player2.gameboard.shipList, gameboard2Element, true);

enemySquares.forEach((enemySquare) => {
  enemySquare.addEventListener('click', () => {
    const coordinates = JSON.parse(enemySquare.getAttribute('data-cord'));
    enemySquare.classList.add('hit');
    try {
      player1.attack(player2, coordinates.col, coordinates.row);
      updatePlayerShipsDisplay(player1.gameboard.shipList, gameboard1Element, false);
      updatePlayerShipsDisplay(player2.gameboard.shipList, gameboard2Element, true);
    } catch (e) {
      console.log(e);
    }
  });
});
