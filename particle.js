class Particle {

  constructor(x,y,r,ctx, idx) {
    this.r = r;
    this.x = x;
    this.y = y;
    this.colorOffset = 0;

    this.ctx = ctx;
    this.idx = idx || 0;

    this.dy = 5;

    this._setupColor();
  }

  draw(color) {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r * 1.5, 0, 2*Math.PI);
    this.ctx.shadowBlur = 50;
    this.ctx.shadowColor = this.shadowColor;
    this.ctx.fillStyle = color || this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }

  update() {

    this._updateY();

  }

  _updateY() { this.y -= this.dy; }

  _setupColor() {
    const tryingFactor = 5.1;
    const offHSL = Math.floor(this.colorOffset += (this.idx * tryingFactor));
    const offAlpha = Math.floor(this.colorOffset += (this.idx * tryingFactor)) / 100;
    const offAlpha2 = (this.idx) / 50;
    //this.color = `hsl(232, 100%, ${offHSL}%)`;
    this.color = `rgba(255, 255, 255, ${offAlpha2})`;
    this.shadowColor = `rgba(255,255,255, ${offAlpha})`;
  }

}
