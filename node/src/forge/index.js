import { fabric } from "fabric";
import Phaser from "phaser";
import Grid from "./components/Grid";

export default class Forge {
  canvasId: undefined;
  ctx: undefined;
  game: undefined;
  container: undefined;
  grid: undefined;
  config: undefined;

  constructor(canvasId, referenceContainer) {
    this.canvasId = canvasId;
    this.referenceContainer = referenceContainer;
    this.config = {
      type: Phaser.WEBGL,
      width: 800,
      height: 600,
      canvas: document.getElementById(canvasId),
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 }
        }
      },
      scene: {
        preload: this.preload,
          create: this.create
      }
    };
    this.game = new Phaser.Game(this.config);
    this.grid = new Grid(10);
    this.bindEvents();
    this.render();
  }
  
  preload() {
  
  }
  
  create() {
  
  }

  resize() {
    //this.game.renderer.resize(this.referenceContainer.offsetWidth, this.referenceContainer.offsetHeight);
  }
  
  spawnObject(x, y) {
    let snappedCoords = this.grid.snapToGrid(x, y);
  }
  
  bindEvents() {
    
    /*this.ctx.on({
      'mouse:up': (e) => {
        if (this.ctx.findTarget(e) === undefined) {
          let point = this.ctx.getPointer(e);
          point = this.grid.snapToGrid(point.x, point.y);
          this.spawnObject(point.x, point.y);
        }
      }
    });*/
  }

  render() {
    //this.ctx.absolutePan(new fabric.Point(0, 0));
    //this.spawnObject(50, 1);
  }
}
