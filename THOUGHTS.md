### UNORGANIZED TODO + QUESTIONS

# Build a bar chart
Don't really care what the data is, just need to play around with it to figure out if this is going in the right direction.

# Axis?
Do we build this automatically? It's relatively simple to generate these, but it would be duplicated often.
Potentially some kind of "helper" that could be broad enough for multiple axis types?

# Render loop / object handling
Does the current system of object / render function pair make sense? Looking at the examples I've made so far...
Seems more complex to build & attach objects vs just having a render callback & drawing complex things easily with my custom context.

## Animation
Depending on what is decided for the render loop, animations could be a seperate system like in current master branch or done in a different callback executed before the render callback.

# More CTX objects
- triangle
- circle
- penta/hexa/octa/etc 'gons
- more advanced line usage
 - point types
 - width
 - curved
 - fill + stroke

# On hover + click callback
For changing any properties / doing something

# Documentation
Can we like write some more comments before i forget all this shit...
