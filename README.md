# DCS.js
*Draw Cool Shit*


This is a **WIP** JS library that provides an simple way to draw complex visualizations in the browser. It's being built from the ground up to be highly extensible, run on HTML5 canvas and be super easy to use for data visualization.

# Getting started

Include DCS & add a canvas to your page.
```
<canvas id="test" width="800" height="800"></canvas>
<script src="dcs.js"></script>
```

Create a graphics interface for that canvas.
```
var gfx = new DCS.Graphics(document.getElementById("test"));
```

Add a grid layer to draw on.
```
var layer = new DCS.Layer(200, 200, 2, 2, gfx);
// Optionally enable debug mode to view the grid
// layer.debug = true;
```

Add a quick test object to the layer
```
var box = new DCS.Object(5, 5, layer);
// !! Temp test code !!
box.render = function(draw) {
  draw.rect({x: 0, y: 0, width: 4, height: 4});
}
```

Attach your graphics object to the DCS render pipeline.
```
DCS.attachGraphics(gfx);
```

# DCS Grid Explained
DCS works on a grid that is significantly different then the default HTML5 canvas grid.

In the HTML5 canvas a few things are constant,

1. The top left corner of the canvas is (0, 0).
2. All drawing treats the top left corner as the X/Y.
3. The canvas pixel to grid ratio is 1:1.

DCS removes these constants in favor of the following,

1. Define the grid center point (0, 0) **anywhere** on the canvas.
2. All drawing treats the center as the X/Y.
3. The canvas pixel to grid ratio is defined by the user (1:1, x:y).

The reason behind this is to make a platform that is more natural to use for data visualization purposes. Traditionally one would have to worry about scaling your charts or data points to the canvas. With DCS the canvas will automatically form to your data, regardless if you're representing a range of 1 million or 0.5
