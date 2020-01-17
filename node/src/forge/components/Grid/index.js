export default class Grid {
  gridSize: 15;

  constructor(gridSize = 15) {
    this.gridSize = gridSize;
  }

  snapToGrid(x, y) {
    let diffX = x % this.gridSize;
    let diffY = y & this.gridSize;
    return {
      x: x + (diffX < (this.gridSize/2) ? diffX : diffX * -1),
      y: y + (diffY < (this.gridSize/2) ? diffY : diffY * -1)
    }
  }
}
