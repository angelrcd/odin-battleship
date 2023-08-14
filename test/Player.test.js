import { beforeAll, beforeEach, describe, expect, test } from 'vitest';
import Player from '../modules/Player';

let player;

beforeEach(() => {
  player = new Player();
});

describe('Place ships random', () => {
  test('Creates 8 ships', () => {
    expect(player.gameboard.shipList).toHaveLength(0);
    player.placeShipsRandom();
    expect(player.gameboard.shipList).toHaveLength(8);
  });

  test('Ships placed are of the correct size', () => {
    const SHIPS_LENGTHS = [5, 4, 3, 3, 2, 2, 1, 1];
    player.placeShipsRandom();
    const playerShipList = player.gameboard.shipList;

    for (let [index, lengthValue] of SHIPS_LENGTHS.entries()) {
      expect(playerShipList[index].ship.length).toBe(lengthValue);
    }
  });
});

test('Get player info', () => {
  player.placeShipsRandom();
  expect(player.getInfo()).toStrictEqual({ cellsHit: 0, remainingShip: 8 });
});
