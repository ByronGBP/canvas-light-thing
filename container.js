class Container {

  constructor(x,y,w,h,ctx){
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.ctx = ctx;

    this._numberParticles = 20;
    this.particles = [];
    this.rowForChange = 0;
    this.maxRow = 0;
    this._setupParticles();
  }

  draw() {

    this._clear();
    this._update();
    this._drawBorder();
    this._drawParticles();

  }

  _update() {

    this._updateForTopToBottom();

  }

  _updateForTopToBottom() {

    if (this.rowForChange > 0){
      this.rowForChange -= 1;
    } else {
      this.rowForChange = this.maxRow;
    }

  }

  _updateForBottomToTop() {

    if (this.rowForChange < this.maxRow){
      this.rowForChange += 1;
    } else {
      this.rowForChange = 0;
    }

  }

  _setupParticles() {

    //this._setupParticlesBottomToTop();
    this._setupParticlesOfCircles();

  }

  _setupParticlesOfCircles() {

    const diameter = this.w / this._numberParticles;

    let width = this.w;
    let height = this.h;
    let x = 0;
    let y = 0;
    let idx = 0;
    while (width > 0 && height > 0) {

      let newRow = this._i_setupParticlesOfCircles(x, y, width, height, idx);
      x += diameter;
      y += diameter;
      width -= (diameter * 2);
      height -= (diameter * 2);
      idx += 1;
      this.particles.push(newRow);
    }
    this.maxRow = this.particles.length;
    this.rowForChange = this.particles.length;

  }

  _i_setupParticlesOfCircles(ix, iy, width, height, idx) {

    const diameter = this.w / this._numberParticles;
    const radius = diameter / 2;

    let y = iy + radius;
    let x = ix + radius;
    let rowParticles = [];

    //Top Left -> Top Right
    for (let i = 0; i < width - diameter; i += diameter) {
      const newParticle = new Particle(x, y, radius, this.ctx, idx);
      rowParticles.push(newParticle);
      x += diameter;
    }
    //Top Right -> Bottom Right
    for (let i = 0; i < height - diameter; i += diameter) {
      const newParticle = new Particle(x, y, radius, this.ctx, idx);
      rowParticles.push(newParticle);
      y += diameter;
    }
    //Bottom Right -> Bottom Left
    for (let i = width; i > diameter; i -= diameter) {
      const newParticle = new Particle(x, y, radius, this.ctx, idx);
      rowParticles.push(newParticle);
      x -= diameter;
    }

    //Bottom Left -> Top Left
    for (let i = height; i > diameter; i -= diameter) {
      const newParticle = new Particle(x, y, radius, this.ctx, idx);
      rowParticles.push(newParticle);
      y -= diameter;
    }

    return rowParticles;

  }

  _setupParticlesBottomToTop() {
    //LINEAL -- FROM BOT TO TOP
    let newParticles = [];
    const diameter = this.w / this._numberParticles;
    const radius = diameter / 2;
    const maxRows = this.h / diameter;
    let y = this.h - radius;
    let x = this.x + radius;

    for (let i = 0; i < maxRows; i++) {
      let rowParticles = [];
      x = this.x + radius;
      for (let j = 0; j < this._numberParticles; j++) {
        const newParticle = new Particle(x, y, radius, this.ctx);
        rowParticles.push(newParticle);
        x += diameter;
      }
      y -= diameter;
      newParticles.push(rowParticles);
    }

    this.particles.push(...newParticles);
    this.maxRow = this.particles.length;
  }

  _clear() {

    this.ctx.clearRect(0,0,this.w,this.h);

  }

  _drawBorder() {

    this.ctx.rect(this.x,this.y,this.w,this.h);
    this.ctx.fillStyle = 'black';
    this.ctx.fill();

  }

  _drawParticles() {

    this.particles.forEach((rowParticles, idx) => {
      let color = null;
      if (idx === this.rowForChange) {
        const tryingFactor = 4.5;
        const idxOff = this.particles.length - idx;
        const colorOff = Math.floor(90 - idxOff * tryingFactor) / 100;
        color = `rgba(255,255,255, ${colorOff})`;
      }
      rowParticles.forEach((particle) => {
        particle.draw(color);
        //particle.update();
      });
    });

  }
}
