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
  
  drawGrid(context) {
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(300, 150);
    context.stroke();
  }
}
