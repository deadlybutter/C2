var DCS = (function () {

  // ---
  // LOCAL VAR SETUP
  // ---

  var module = {};

  var targetCanvas;
  var targetCtx;

  var gridWidth = 0;
  var gridHeight = 0;

  var shapes = [];
  module.shapes = shapes;

  var graphs = [];

  // ---
  // RENDERING
  // ---

  function render() {
    if (targetCtx != undefined) {
      targetCtx.clearRect(0, 0, getCanvasSize().width, getCanvasSize().height);

      for (var graph of graphs) {
        graph.draw();
      }

      for (var shape of shapes) {
        shape.animate();
        shape.draw();
      }
    }

    window.requestAnimationFrame(render);
  }

  // ---
  // HELPER FUNCTIONS
  // ---

  function getCanvasSize() {
    return {
      width: targetCanvas.width,
      height: targetCanvas.height
    };
  }

  function getGridSize() {
    return {
      width: gridWidth,
      height: gridHeight
    };
  }
  module.getGridSize = getGridSize;

  function getValue(params, property, defaultVal, required) {
    if (params == undefined || params == null) {
      if (required) {
        console.error(property, "is required to init");
      }

      return defaultVal;
    }

    if (params.hasOwnProperty(property)) {
      if (typeof params[property] == "string") {
        if (params[property].endsWith("%W")) {
          return Number("." + params[property].replace("%W", "")) * getGridSize().width;
        }
        else if (params[property].endsWith("%H")) {
          return Number("." + params[property].replace("%H", "")) * getGridSize().height;
        }
      }
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

  function translateX(x) {
    return (getCanvasSize().width / gridWidth) * x;
  }
  module.translateX = translateX;

  function translateY(y) {
    return (getCanvasSize().height / gridHeight) * y;
  }
  module.translateY = translateY;

  // ---
  // Base Classes
  // ---

  class Animation {
    constructor() {
      this.shape = {};
      this.id = Date.now();
    }

    init(shape) {
      this.shape = shape;
    }

    perform() {
      console.warn("Animation Perform function is empty");
    }

    end() {
      this.shape.removeAnimation(this.id);
    }
  }
  module.Animation = Animation;

  class Shape {
    constructor(customData, x, y) {
      this.x = x;
      this.y = y;
      this.customData = customData;
      this.animations = [];
    }

    animate() {
      for (var animation of this.animations) {
        animation.perform();
      }
    }

    removeAnimation(animationId) {
      var index = this.animations.findIndex(function(animation, id) {
        return id = animationId;
      });
      this.animations.splice(index, 1);
    }

    addAnimation(animation) {
      animation.init(this, function(id) {
        this.removeAnimation(id);
      });
      this.animations.push(animation);
    }

    draw() {
      console.warn("Shape Draw function is empty");
    }

    getCustomData() {
      return this.customData;
    }
  }
  module.Shape = Shape;

  class Axis {
    constructor(plane, title) {
      this.plane = plane;
      this.title = title;
    }

    draw() {
      console.warn("Axis Draw function is empty");
    }
  }
  module.Axis = Axis;

  class Graph {
    constructor(params) {
      this.axes = {};
      this.shapes = [];
      this.widthPadding = getValue(params, "widthPadding", "10%W", true);
      this.heightPadding = getValue(params, "heightPadding", "10%H", true);
    }

    draw() {
      for (var plane in this.axes) {
        this.axes[plane].draw();
      }

      for (var shape of shapes) {
        shape.animate();
        shape.draw();
      }
    }

    addAxis(axis) {
      axis.widthPadding = this.widthPadding;
      axis.heightPadding = this.heightPadding;
      this.axes[axis.plane] = axis;
    }

    getAxis(plane) {
      return this.axes[plane];
    }

    addShape(shape) {
      this.shapes.push(shape);
    }
  }
  module.Graph = Graph;

  // ---
  // SETTERS/GETTERS
  // ---

  module.setTarget = function(canvas) {
    targetCanvas = canvas;
    targetCtx = canvas.getContext('2d');
  }

  module.getTargetCtx = function() {
    return targetCtx;
  }

  module.getTrueWidth = function() {
    return getCanvasSize().width;
  }

  module.getTrueHeight = function() {
    return getCanvasSize().height;
  }

  module.getWidth = function() {
    return gridWidth;
  }

  module.getHeight = function() {
    return gridHeight;
  }

  module.setGridWidth = function(width) {
    gridWidth = width;
  }

  module.setGridHeight = function(height) {
    gridHeight = height;
  }

  module.draw = function(type, obj) {
    if (type == "shape") {
      shapes.push(obj);
    }
    else if (type == "graph") {
      graphs.push(obj);
    }
  }

  // ---
  // INIT LOGIC
  // ---

  window.requestAnimationFrame(render);
  return module;
}());
