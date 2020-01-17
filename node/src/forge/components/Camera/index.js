import { fabric } from 'fabric'

export default class Camera {
  x: 0;
  y: 0;
  scale: 0;
  
  group: undefined;
  
  constructor(x = 0, y = 0, zoom = 1) {
    this.x = x;
    this.y = y;
    this.scale = zoom;
    this.group = new fabric.Group({
      top: this.y,
      left: this.x,
      scale: this.scale
    });
  }
}