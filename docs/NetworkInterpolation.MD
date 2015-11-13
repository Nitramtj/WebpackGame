# Network Interpolation

## Methods
* setState(state, tickId)
* interpolateForward()
* interpolateBackward()
* renderInterpolate() [Optional]

## Requirements
* Be able to copy state of world to client
* Be able to interpolate forward
* References to external resources or entities must refer to a synced client/server id
* Remember last setState
## Interpolation Order
#### Forward
Object1.Component1 -> Object2.Component1 -> Object1.Component2 -> Object2.Component2
#### Backward
Object2.Component2 -> Object1.Component2 -> Object
o = o.interpolateForward();o.interpolateBackward(); = o.interpolateBackward();o.interpolateForward();

We can go back to the last predictable change in the system.

## Dirty Changes
The network system can only interpolate back to when an unpredictable change is made. If unpredictable changes are made on the server, this is fine. Otherwise