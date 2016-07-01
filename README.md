# DCS.js
### Draw Cool Shit
----

This is a **WIP** JS library that provides an simple way to draw complex visualizations in the browser. It's being built from the ground up to run on HTML5 canvas and the core is highly extensible.

To use DCS, simply include the dcs.js file in your page & add a canvas element.
```
<canvas id="test" width="600" height="600"></canvas>
<script src="dcs.js"></script>
```
Next tell DCS to target your Canvas.

`DCS.setTarget(document.getElementById("test"));`

Finally you'll need to tell DCS the virtual size of your graph. This allows you to draw charts without needing to scale or make the coords relative to your canvas coordinates, it's done automatically.

For example, if your Y axis is between 1,000 and 5,000 you could do the following.

```
DCS.setGridHeight(5000);
DCS.setGridWidth(100);
```
In the future I'll also be adding a way to set where the grid starts. So it would look more like this `DCS.setGridHeight(1000, 5000)`.

If however you prefer a 1:1 ratio between the virtual grid & the actual canvas coordinates, you can simple set the DCS grid width/height to the width/height of your canvas.

```
<canvas id="test" width="600" height="600"></canvas>

DCS.setGridHeight(600);
DCS.setGridWidth(600);
```

Once you have DCS setup, checkout the other files in the docs folder to understand how you can start rendering graphics with DCS & extend it for your own purposes.


V2
- Multiple canvas support
  - automatically responsive. instead of pixels maybe we need a new name for a unit. 
- 1 Custom graphics object per Canvas
  - Implements custom drawing functions
  - Has render callbacks
- customize defaults

focus is now on drawing cool stuff, no layers or yadayada.
