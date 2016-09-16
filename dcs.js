var DCS = (function () {
  const module = {};

  function get(params, key, defaultValue) {
    return params[key] ? params[key] : defaultValue;
  }

  class Canvas {
    constructor(id, data) {
      this.id = id;
      this.data = data;
      this.canvas = document.getElementById(this.id);
      this.ctx = this.canvas.getContext('2d');

      this.debug = false;
      this.fps = 0;
      this.lastCalledTime = Date.now();

      this.render();
    }

    translate(point, dimension) {
      return dimension * point;
    }

    setupStyles(style) {
      const ctx = this.ctx;
      ctx.lineWidth = get(style, 'lineWidth', 5);
      ctx.lineCap = get(style, 'cap', 'round');
      ctx.lineJoin = get(style, 'join', 'round');
      ctx.strokeStyle = get(style, 'strokeColor', '#111');
      ctx.fillStyle = get(style, 'fillColor', '#222');
    }

    render() {

      if (this.debug) {
        const delta = (Date.now() - this.lastCalledTime) / 1000;
        this.lastCalledTime = Date.now();
        const fps = 1 / delta;
        console.log(`${this.id} FPS: ${fps}`);
      }

      const ctx = this.ctx;
      const width = this.canvas.width;
      const height = this.canvas.height;
      const t = this.translate;

      ctx.clearRect(0, 0, width, height);

      this.data.operations.forEach(op => {
        ctx.save();

        const points = op.points.slice(0);
        const style = op.style;

        this.setupStyles(style);
        ctx.beginPath();

        const start = points.splice(0, 1)[0];
        ctx.moveTo(t(start.x, width), t(start.y, height));

        points.forEach(point => {
          ctx.lineTo(t(point.x, width), t(point.y, height));
        });

        if (points.length + 1 <= 2) {
          ctx.stroke();
        }
        else {
          if (get(style, 'fill', false)) {
            ctx.fill();
          }
          else if (get(style, 'stroke', true)) {
            ctx.stroke();
          }
        }

        ctx.restore();
      });

      window.requestAnimationFrame(this.render.bind(this));
    }
  }
  module.Canvas = Canvas;

  return module;
}());
