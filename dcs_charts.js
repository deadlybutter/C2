(function () {

  getValue = DCS.getValue;
  translateX = DCS.translateX;
  translateY = DCS.translateY;

  DCS.LineAxis = class NumericalAxis extends DCS.Axis {
    constructor(params) {
      super(getValue(params, "plane", "x", true),
            getValue(params, "title", "title"));
      this.intervals = getValue(params, "intervals", [], true);
      this.lineColor = getValue(params, "lineColor", "#808080");
      this.drawGraph = getValue(params, "drawGraph", true);
      this.graphLineColor = getValue(params, "graphLineColor", "#DDDDDD");
      this.font = getValue(params, "font", "sans-serif")
      this.fontSize = getValue(params, "fontSize", 12);
      this.fontColor = getValue(params, "fontColor", this.lineColor);
    }

    draw() {
      var xP = (this.plane == "x"); //is X plane
      var ctx = DCS.getTargetCtx();
      var spacing = ((this.plane == "x" ? DCS.getWidth() : DCS.getHeight()) - (xP ? this.widthPadding * 2 : this.heightPadding * 2)) / this.intervals.length;
      ctx.strokeStyle = this.lineColor;

      ctx.beginPath();
      ctx.moveTo(translateX(this.widthPadding), translateY(DCS.getHeight() - this.heightPadding));
      ctx.lineTo(xP ? translateX(DCS.getWidth() - this.widthPadding) : translateX(this.widthPadding), xP ? translateY(DCS.getHeight() - this.heightPadding) : translateY(this.heightPadding));
      ctx.stroke();

      ctx.textAlign = xP ? "center" : "right";
      ctx.font = `${this.fontSize}px ${this.font}`;

      for (var index = xP ? 0 : this.intervals.length - 1; xP ? index < this.intervals.length : index > -1; xP ? index++ : index--) {
        var delta = xP ? this.widthPadding + (spacing * index) : DCS.getHeight() - this.heightPadding - (spacing * index);

        var labelX = xP ? delta : this.widthPadding - this.fontSize;
        var labelY = xP ? DCS.getHeight() - this.heightPadding + this.fontSize : delta;
        ctx.fillStyle = this.fontColor;
        ctx.fillText(this.intervals[index], translateX(labelX), translateY(labelY));

        if (this.drawGraph) {
          ctx.strokeStyle = this.graphLineColor;
          ctx.beginPath();
          ctx.moveTo(xP ? translateX(delta) : translateX(this.widthPadding), xP ? translateY(DCS.getHeight() - this.heightPadding) : translateY(delta));
          ctx.lineTo(xP ? translateX(delta) : translateX(DCS.getWidth() - this.widthPadding), xP ? translateY(this.heightPadding) : translateY(delta));
          ctx.stroke();
        }
      }
    }

  }

}());
