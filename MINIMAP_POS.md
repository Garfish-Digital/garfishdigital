
Implementation Plan:
  - Available Space = Viewport Height - 100px (header)
  - Space Unit = Available Space ÷ 2

Positions:
  - Demo Card: Centered at bottom of top half, then raised 30px.
  - Minimap: Positioned at top of bottom half, then lowered 50px.

const demoCardspaceUnit = availableSpace * .6;
const minimapSpaceUnit =  availableSpace * .4;