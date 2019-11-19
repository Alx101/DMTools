const makePwrContext = (ctx) => {
  return new PwrContext(ctx);
};

export class PwrContext {

  constructor(ctx) {
    this.ctx = ctx;
    window.addEventListener("resize", this.fixAspect);
  }

  fixAspect = () => {
    console.log("fixing size");
    this.ctx.width = this.ctx.height *
    (this.ctx.clientWidth / this.ctx.clientHeight);
    console.log(this.ctx.width);
  };

  rect = (x, y, w, h, color) => {
    const c = color || "#ff0000";
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, w, h);
  }
};

export default makePwrContext;
