import { fabric } from 'fabric';

export default class Grid {
  gridSize: 15;

  constructor(gridSize = 15) {
    this.gridSize = gridSize;
  }

  snapToGrid(x, y) {
    let diffX = x % this.gridSize;
    let diffY = y % this.gridSize;
    let result = {
      x: x - diffX,
      y: y - diffY
    };
    
    return result;
  }
  
  spawnGrid(context) {
    for (let x = 0; x < 50; ++x) {
      context.add(new fabric.Line([
        x * this.gridSize,
        0,
        x * this.gridSize,
        1000,
      ], {
        stroke: 'gray',
        strokeWidth: 1,
        selectable: false,
        evented: false,
      }));
    }
  }
}
