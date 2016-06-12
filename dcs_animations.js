(function () {

  getValue = DCS.getValue;
  getGridSize = DCS.getGridSize;
  translateX = DCS.translateX;
  translateY = DCS.translateY;

  DCS.Translate = class Translate extends DCS.Animation {
    constructor(params) {
      super();
      this.newX = getValue(params, "newX", Math.random() * getGridSize().width);
      this.newY = getValue(params, "newY", Math.random() * getGridSize().height);
      this.step = getValue(params, "step", 1);
    }

    init(shape) {
      super.init(shape);
    }

    perform() {
      var xDistance = this.newX - this.shape.x;
      var yDistance = this.newY - this.shape.y;
      if (xDistance + yDistance <= 0) {
        this.end();
        return;
      }

      if (xDistance > 0) {
        this.shape.x += translateX(xDistance / this.step);
      }
      if (yDistance > 0) {
        this.shape.y += translateY(yDistance / this.step);
      }
    }
  }

}());
