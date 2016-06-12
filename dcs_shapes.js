(function () {

  getValue = DCS.getValue;
  translateX = DCS.translateX;
  translateY = DCS.translateY;

  DCS.Rectangle = class Rectangle extends DCS.Shape {
    constructor(params) {
      super(getValue(params, "customData", {}),
           getValue(params, "x", 0),
           getValue(params, "y", 0));
      this.width = getValue(params, "width", 10);
      this.height = getValue(params, "height", 10);
      this.fillColor = getValue(params, "fillColor", "#3C868B");
      this.borderColor = getValue(params, "borderColor", "#111");
    }

    draw() {
      var ctx = DCS.getTargetCtx();
      var translatedX = translateX(this.x);
      var translatedY = translateY(this.y);
      var translatedW = translateX(this.width);
      var translatedH = translateY(this.height);
      ctx.fillStyle = this.fillColor;
      ctx.rect(translatedX, translatedY, translatedW, translatedH);
      ctx.fill();
      ctx.stroke();
    }
  }

  DCS.Circle = class Circle extends DCS.Shape {
    constructor(params) {
      super(getValue(params, "customData", {}),
           getValue(params, "x", 0),
           getValue(params, "y", 0));
      this.radius = getValue(params, "radius", 1);
      this.fillColor = getValue(params, "fillColor", "#3C868B");
      this.borderColor = getValue(params, "borderColor", "#111");
    }

    draw() {
      var ctx = DCS.getTargetCtx();
      var translatedX = translateX(this.x);
      var translatedY = translateY(this.y);
      var translatedR = translateX(this.radius);

      ctx.beginPath();
      ctx.arc(translatedX, translatedY, translatedR, 0, 2 * Math.PI);
      ctx.fillStyle = this.fillColor;
      ctx.fill();
      ctx.strokeStyle = this.borderColor;
      ctx.stroke();
    }
  }

}());
