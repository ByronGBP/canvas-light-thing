class Canvas {

  constructor(){
    this.init();
  }

  init(){
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this._setupSizes();
    document.body.appendChild(this.canvas);
  }

  _setupSizes(){
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.ctx.canvas.width = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;
  }
}
