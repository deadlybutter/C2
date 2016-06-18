var DCS = (function () {

  var module = {};
  var graphics = [];

  function getValue(params, property, defaultVal, required) {
    if (params == undefined || params == null) {
      if (required) {
        console.error(property, "is required to init");
      }

      return defaultVal;
    }

    if (params.hasOwnProperty(property)) {
      return params[property];
    }
    else {
      if (required) {
        console.error(property, "is required to init");
      }

      return defaultVal;
    }
  }
  module.getValue = getValue;

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

    render(draw) {
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
      this.draw = new DCSGraphicsContext(this, this.graphics);
      this.objects = [];
      this.debug = false;
    }

    addObject(object) {
      object.layer = this;
      this.objects.push(object);
    }

    convertX(x) {
      return x * this.xUnitsPerPixel;
    }

    convertY(y) {
      return y * this.yUnitsPerPixel;
    }

    translateX(x) {
      return this.convertX(x) + this.centerX;
    }

    translateY(y) {
      return this.convertY(y) + this.centerY;
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

      if (this.debug) {
        var ctx = this.graphics.getCtx();

        ctx.lineWidth = 1;
        ctx.strokeStyle = "#111111";
        ctx.beginPath();
        ctx.moveTo(this.centerX, 0);
        ctx.lineTo(this.centerX, this.graphics.getTrueHeight());
        ctx.stroke();

        ctx.lineWidth = 0.1;
        for (var x = 0; x < this.graphics.getTrueWidth(); x += (this.xUnitsPerPixel * 4)) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, this.graphics.getTrueHeight());
          ctx.stroke();
        }

        for (var y = 0; y < this.graphics.getTrueHeight(); y += (this.yUnitsPerPixel * 4)) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(this.graphics.getTrueWidth(), y);
          ctx.stroke();
        }

        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, this.centerY);
        ctx.lineTo(this.graphics.getTrueWidth(), this.centerY);
        ctx.stroke();
      }

      for (var obj of this.objects) {
        obj.render(this.draw);
      }
    }
  }
  module.Layer = DCSLayer;

  class DCSGraphicsContext {
    constructor(layer, graphics) {
      this.layer = layer;
      this.graphics = graphics;
      this.ctx = graphics.getCtx();
    }

    setupPaint(params) {
      var fillColor = getValue(params, "fillColor", "#DDDDDD", false);
      var borderColor = getValue(params, "borderColor", "#111111", false);

      if (fillColor) {
        this.ctx.fillStyle = fillColor;
      }

      if (borderColor) {
        this.ctx.borderColor = borderColor;
      }
    }

    rect(params) {
      var x = getValue(params, "x", 0, true);
      var y = getValue(params, "y", 0, true);
      var width = getValue(params, "width", 1, true);
      var height = getValue(params, "height", 1, true);
      this.setupPaint(params);

      this.ctx.fillRect(layer.translateX(x - (width / 2)), layer.translateY(y - (height / 2)), layer.convertX(width), layer.convertY(height));
    }
  }

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
