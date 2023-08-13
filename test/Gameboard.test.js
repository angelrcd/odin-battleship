import { beforeEach, describe, expect, test } from 'vitest';
import Gameboard from '../modules/Gameboard';

let gameboard;

beforeEach(() => {
  gameboard = new Gameboard();
});

describe('Gameboard board', () => {
  test('Board is correct size', () => {
    expect(gameboard.board).toHaveLength(100);
  });

  test('Board cells have correct coordinates', () => {
    const firstCell = gameboard.board[0];
    const secondRowThirdCol = gameboard.board[12];
    const lastCell = gameboard.board.at(-1);

    expect([firstCell.col, firstCell.row]).toStrictEqual([1, 1]);
    expect([secondRowThirdCol.col, secondRowThirdCol.row]).toStrictEqual([3, 2]);
    expect([lastCell.col, lastCell.row]).toStrictEqual([10, 10]);
  });
});

test('Find cell by coordinates', () => {
  expect(gameboard.getCellFromCoordinates(1, 1)).toBe(gameboard.board[0]);
  expect(gameboard.getCellFromCoordinates(10, 10)).toBe(gameboard.board.at(-1));
  expect(gameboard.getCellFromCoordinates(3, 2)).toBe(gameboard.board[12]);
});

describe('Place ships', () => {
  test('No collision', () => {
    gameboard.placeShip(1, 1, 4, 'horizontal');
    expect(gameboard.shipList).toHaveLength(1);
    expect(gameboard.shipList[0].ship.length).toBe(4);
    expect(gameboard.shipList[0].orientation).toBe('horizontal');
    expect(gameboard.shipList[0].cells).toStrictEqual([
      gameboard.getCellFromCoordinates(1, 1),
      gameboard.getCellFromCoordinates(2, 1),
      gameboard.getCellFromCoordinates(3, 1),
      gameboard.getCellFromCoordinates(4, 1),
    ]);

    gameboard.placeShip(10, 1, 2, 'vertical');
    expect(gameboard.shipList).toHaveLength(2);
    expect(gameboard.shipList[1].ship.length).toBe(2);
    expect(gameboard.shipList[1].orientation).toBe('vertical');
    expect(gameboard.shipList[1].cells).toStrictEqual([
      gameboard.getCellFromCoordinates(10, 1),
      gameboard.getCellFromCoordinates(10, 2),
    ]);
  });

  test('Out of bound collision', () => {
    expect(() => gameboard.placeShip(8, 1, 4, 'horizontal')).toThrowError(/Out of bounds/);
    expect(() => gameboard.placeShip(1, 10, 2, 'vertical')).toThrowError(/Out of bounds/);
    expect(gameboard.shipList).toHaveLength(0);

    expect(() => gameboard.placeShip(10, 8, 3, 'vertical')).not.toThrowError(/Out of bounds/);
    expect(gameboard.shipList).toHaveLength(1);
  });

  test('Collision between ships', () => {
    gameboard.placeShip(1, 2, 4, 'horizontal');
    expect(() => gameboard.placeShip(2, 1, 3, 'vertical')).toThrowError(/Ships collision/);
    expect(gameboard.shipList).toHaveLength(1);

    gameboard.placeShip(10, 8, 3, 'vertical');
    expect(() => gameboard.placeShip(8, 8, 3, 'horizontal')).toThrowError(/Ships collision/);
    expect(gameboard.shipList).toHaveLength(2);
  });
});

describe('Receive attack', () => {
  beforeEach(() => {
    gameboard.placeShip(3, 1, 4, 'horizontal');
    gameboard.placeShip(10, 1, 2, 'vertical');
  });

  test('Hit water', () => {
    gameboard.receiveAttack(1, 1);
    gameboard.receiveAttack(10, 10);
    expect(gameboard.board[0].isHit).toBeTruthy();
    expect(gameboard.board.at(-1).isHit).toBeTruthy();
  });

  test('Hit cell that was already hit', () => {
    gameboard.receiveAttack(1, 1);
    expect(() => gameboard.receiveAttack(1, 1)).toThrowError(/Already hit/);
    gameboard.receiveAttack(10, 10);
    expect(() => gameboard.receiveAttack(10, 10)).toThrowError(/Already hit/);
  });

  test('Hit ship', () => {
    const shipHit = gameboard.shipList[0];
    gameboard.receiveAttack(3, 1);
    expect(shipHit.ship.timesHit).toBe(1);
    gameboard.receiveAttack(4, 1);
    expect(shipHit.ship.timesHit).toBe(2);
  });

  test('Hit ship does not register if repeated hit', () => {
    const shipHit = gameboard.shipList[0];
    gameboard.receiveAttack(3, 1);
    expect(shipHit.ship.timesHit).toBe(1);
    expect(() => gameboard.receiveAttack(3, 1)).toThrowError(/Already hit/);
    expect(shipHit.ship.timesHit).toBe(1);
  });
});

test('Sink all ships', () => {
  gameboard.placeShip(1, 1, 1, 'horizontal');
  gameboard.placeShip(3, 4, 1, 'vertical');
  expect(gameboard.areAllShipsSunk()).toBe(false);
  gameboard.receiveAttack(1, 1);
  expect(gameboard.areAllShipsSunk()).toBe(false);
  gameboard.receiveAttack(3, 4);
  expect(gameboard.areAllShipsSunk()).toBe(true);
});
