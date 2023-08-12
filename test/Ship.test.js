import { expect, test } from 'vitest';
import Ship from '../modules/Ship';

test('Test should have given length', () => {
  const ship = new Ship(4);
  expect(ship.length).toBe(4);
});

test('Hit functionality', () => {
  const ship = new Ship(3);
  ship.hit();
  expect(ship.timesHit).toBe(1);
  ship.hit();
  expect(ship.timesHit).toBe(2);
});

test('Sink functionality', () => {
  const ship = new Ship(3);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBeTruthy();
});
