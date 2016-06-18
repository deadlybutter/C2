var DCS = (function () {

  var module = {};
  var graphics = [];

  class DCSObject {
    constructor(x, y, layer) {
      this.x = x;
      this.y = y;
      this.layer = layer;
      this.layer.addObject(this);
    }

    getX() {
      return this.x;
    }

    getY() {
      return this.y;
    }

    attachCustomData(data) {
      this.customData = data;
    }

    getCustomData() {
      return this.customData;
    }

    render(ctx) {
      // ...
    }
  }
  module.Object = DCSObject;

  class DCSLayer {
    constructor(centerX, centerY, xUnitsPerPixel, yUnitsPerPixel, graphics) {
      this.centerX = centerX;
      this.centerY = centerY;
      this.xUnitsPerPixel = xUnitsPerPixel;
      this.yUnitsPerPixel = yUnitsPerPixel;
      this.graphics = graphics;
      this.graphics.addLayer(this);
      this.objects = [];
      this.debug = false;
    }

    addObject(object) {
      object.layer = this;
      this.objects.push(object);
    }

    translateX(x) {
      return (x * this.xUnitsPerPixel) + this.centerX;
    }

    translateY(y) {
      return this.graphics.getTrueHeight() - ((y * this.yUnitsPerPixel) + this.centerY);
    }

    getWidth() {
      return this.gridWidth;
    }

    getHeight() {
      return this.gridHeight;
    }

    render() {
      if (this.objects == undefined || this.objects.length == 0) {
        return;
      }

      var ctx = this.graphics.getCtx();

      if (this.debug) {
        ctx.beginPath();
        ctx.moveTo(this.centerX, 0);
        ctx.lineTo(this.centerX, this.graphics.getTrueHeight());
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, this.centerY);
        ctx.lineTo(this.graphics.getTrueWidth(), this.centerY);
        ctx.stroke();
      }

      for (var obj of this.objects) {
        obj.render(ctx);
      }
    }
  }
  module.Layer = DCSLayer;

  class DCSGraphics {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.layers = [];
    }

    addLayer(layer) {
      this.layers.push(layer);
    }

    getTrueWidth() {
      return this.canvas.width;
    }

    getTrueHeight() {
      return this.canvas.height;
    }

    getCtx() {
      return this.ctx;
    }

    render() {
      for (var layer of this.layers) {
        layer.render();
      }
    }
  }
  module.Graphics = DCSGraphics;

  module.attachGraphics = function (gfx) {
    graphics.push(gfx);
  }

  function render() {
    for (gfx of graphics) {
      gfx.getCtx().clearRect(0, 0, gfx.getTrueWidth(), gfx.getTrueHeight());
      gfx.render();
    }

    window.requestAnimationFrame(render);
  }

  window.requestAnimationFrame(render);
  return module;
}());
