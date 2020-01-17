import Grid from './index';

test('Grid initializes with default values', () => {
  let grid = new Grid();
  expect(grid).not.toBeUndefined();
  expect(grid.gridSize).toBe(15);
});

test('Grid initializes with provided custom values', () => {
  let grid = new Grid(10);
  expect(grid).not.toBeUndefined();
  expect(grid.gridSize).toBe(10);
});

test('Grid snaps points to grid', () => {
  let grid = new Grid(10);
  let point = grid.snapToGrid(11, 45);
  expect(point.x).toBe(10);
  expect(point.y).toBe(50);
});