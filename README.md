# C2.js
*Simple, powerful & responsive 2D rendering on HTML5 canvas*

In a nutshell, C2 uses *operations* which contains an array of relative points and a configuration on how to render them.

# Getting started

Include C2 & add a canvas to your page.
```
<canvas id="test" width="800" height="800"></canvas>
<script src="C2.js"></script>
```

Create a some data to draw. (See below for documentation on this, or the examples folder)
```
const data = {
  operations: [
  ...
```

Attach the data to a canvas.
```
const canvas = new C2.Canvas("test", data);
```

And you're done! Every C2 Canvas has it's own state and automatically render on their own.

## Render pipeline
C2 accepts what it calls "operations". Every operation is a set of relative points and instructions on how they should be displayed.

First, to define a new data object you should set it up like the following

```
const data = {
  operations: [
    {
      points: [

      ],
      style: {

      }
    }
  ]
}
```

Next you'll want to add points. Rather than providing exact X/Y coordinates, C2 expects relative coordinates. For example, if you want the X value to be 25%, you'd set it as .25

```
points: [
  {
    x: .25,
    y: 0
  }
]
```

C2 will automatically use these percent values & translate them into pixel coordinates. If you're on different sized devices or the canvas size changes, your visualization should remain the same proportionally.

Now in order to render something you'll want more than one point, you need a min. of two to draw a line. If you want to fill a shape, you need a min. of 3.

After you setup your points, you need to tell C2 how to render this data. In order to do that you'll need to fill in the style object you created under points. These are the available params,

| Name        | Description                             | Default |
| ----------- | --------------------------------------- | ------- |
| stroke      | Should we stroke the operation?         | true    |
| strokeColor | Color to stroke with.                   | '#222'  |
| fill        | Should we fill the operation?           | false   |
| fillColor   | Color to fill with.                     | '#111'  |
| lineWidth   | How many px wide should the line be?    | 5       |
| join        | What type of join should the line have? | 'round' |
| cap         | What type of cap should the line have?  | 'round' |

Final word of caution, render order matters! If points overlap the lower the index the lower its layered.
