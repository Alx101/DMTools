import { fabric } from "fabric";
import Grid from "./components/Grid";

export default class Forge {
  canvasId: undefined;
  ctx: undefined;
  container: undefined;
  grid: undefined;

  constructor(canvasId, referenceContainer) {
    this.canvasId = canvasId;
    this.referenceContainer = referenceContainer;
    this.ctx = new fabric.Canvas(canvasId, {
      width: referenceContainer.offsetWidth,
      height: referenceContainer.offsetHeight,
    });
    this.grid = new Grid();
    this.render();
  }

  resize() {
    this.ctx.setWidth(this.referenceContainer.offsetWidth);
    this.ctx.setHeight(this.referenceContainer.offsetHeight);
    this.ctx.calcOffset();
  }
  
  spawnObject(x, y) {
    let snappedCoords = this.grid.snapToGrid(x, y);
    const rect = new fabric.Rect({
      left: snappedCoords.x,
      top: snappedCoords.y,
      fill: "red",
      width: this.grid.gridSize,
      height: this.grid.gridSize,
      selectable: false,
    });
    console.log(x, y);
    console.log(snappedCoords);
    this.ctx.add(rect);
  }

  render() {
    this.ctx.absolutePan(new fabric.Point(0, 0));
    this.spawnObject(50, 1);
  }
}
