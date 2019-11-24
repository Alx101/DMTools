import { fabric } from "fabric";

export default class Forge {
  canvasId: undefined;
  ctx: undefined;
  container: undefined;

  constructor(canvasId, referenceContainer) {
    this.canvasId = canvasId;
    this.referenceContainer = referenceContainer;
    this.ctx = new fabric.Canvas(canvasId, {
      width: referenceContainer.offsetWidth,
      height: referenceContainer.offsetHeight,
    });
    this.render();
  }

  resize() {
    this.ctx.setWidth(this.referenceContainer.offsetWidth);
    this.ctx.setHeight(this.referenceContainer.offsetHeight);
    this.ctx.calcOffset();
  }

  render() {
    const rect = new fabric.Rect({
      left: 1,
      top: 1,
      fill: "red",
      width: 20,
      height: 20,
    });
    this.ctx.add(rect);
  }
}
