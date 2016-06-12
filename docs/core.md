### dcs.js

The core file of DCS is by itself enough to render on the canvas. It does not however contain any of the default shapes, animations, or graphs (see the other doc files). This file will only touch on how the core of DCS functions.

##### Target canvas
Setting the target canvas defines both the target canvas object & creates the target context. This serves two roles,

 - Save the user from having to get & store context.
 - In the future, allow you to target multiple canvases & switch between them.

##### Grid System
DCS never deals with true canvas coordinates until the very last stage of the rendering process. This allows the user to change the X/Y scale of there visualization to something which might be scaled up or down in comparison the actual size of the canvas. When rendering data, this allows you to just chart the raw data without worrying about the scale math.

The core file offers multiple functions which let you get/set the grid size, and also get the true size of the canvas.

In order to adjust your grid coordinates to true canvas coordinates, you can use translateX & translateY respectively.

##### Render loop
The render loop for now is a simple loop based on requestAnimationFrame. Upon execution, it renders the following in this order.

`graph axis --> graph animations --> graph shapes --> global animations --> global shapes`

*In this context, global shapes are any shapes not attached to a graph.*

Based on this map, all shapes attached to a graph overlay any axis. Any shapes attached to the global DCS object will overlay any graph.

In order to add a object into the render loop, it is passed into DCS with the draw function.
```
var rect = new DCS.Rectangle({x: 10, y: 10, height: 10px, width: 10px});
DCS.draw("shape", rect);
```

##### Getting parameters
Inspired by libraries such as ThreeJs, rather than passing an extensive list of render parameters, every object expects a params object.

In order to safely read from this object, one can use the `getValue` function. When using getValue you can also specify a default value if the user didn't supply one, and whether this parameter is required. If the parameter is required but not supplied, it will throw an error in the console.

Another benefit to using this function is the ability to read & transform parameters. For example, if someone specifies the following
`height: "05%W"` this will get transformed into the value of getGridWidth * 0.05 (Get 5% of the grid width).
