function init() {
  const canvas = new Canvas();
  const container = new Container(0, 0, canvas.width, canvas.height, canvas.ctx);
  console.log(container.particles);
  setInterval(() => {
    container.draw();
  }, 10);
}

document.addEventListener('DOMContentLoaded', () => { init(); });
