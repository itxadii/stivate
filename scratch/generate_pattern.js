const fs = require('fs');
const path = require('path');

// Constants
const R = 50; // Radius of outer hexagon
const W = R * Math.sqrt(3); // Tile width: ~86.6025
const H = R * 3; // Tile height: 150

// Function to generate path for a hexagon of radius r centered at (cx, cy)
function getHexagonPath(cx, cy, r) {
  const dx = r * Math.sqrt(3) / 2;
  const dy = r / 2;
  
  // Vertices of standing hexagon
  const v0 = [cx, cy - r];
  const v1 = [cx + dx, cy - dy];
  const v2 = [cx + dx, cy + dy];
  const v3 = [cx, cy + r];
  const v4 = [cx - dx, cy + dy];
  const v5 = [cx - dx, cy - dy];
  
  return `M ${v0[0].toFixed(3)} ${v0[1].toFixed(3)} ` +
         `L ${v1[0].toFixed(3)} ${v1[1].toFixed(3)} ` +
         `L ${v2[0].toFixed(3)} ${v2[1].toFixed(3)} ` +
         `L ${v3[0].toFixed(3)} ${v3[1].toFixed(3)} ` +
         `L ${v4[0].toFixed(3)} ${v4[1].toFixed(3)} ` +
         `L ${v5[0].toFixed(3)} ${v5[1].toFixed(3)} Z`;
}

// Function to generate the three internal cube lines
function getCubeLinesPath(cx, cy, r) {
  const dx = r * Math.sqrt(3) / 2;
  const dy = r / 2;
  
  // Lines from center to: Top (v0), Bottom-Right (v2), Bottom-Left (v4)
  const l0 = `M ${cx.toFixed(3)} ${cy.toFixed(3)} L ${cx.toFixed(3)} ${(cy - r).toFixed(3)}`;
  const l1 = `M ${cx.toFixed(3)} ${cy.toFixed(3)} L ${(cx + dx).toFixed(3)} ${(cy + dy).toFixed(3)}`;
  const l2 = `M ${cx.toFixed(3)} ${cy.toFixed(3)} L ${(cx - dx).toFixed(3)} ${(cy + dy).toFixed(3)}`;
  
  return `${l0} ${l1} ${l2}`;
}

// List of centers in one tile
const centers = [
  [0, 0],
  [W, 0],
  [0, H],
  [W, H],
  [W/2, H/2]
];

// Generate path strings
let outerHexagons = '';
let middleHexagons = '';
let innerHexagons = '';
let cubeLines = '';

for (const [cx, cy] of centers) {
  outerHexagons += getHexagonPath(cx, cy, R) + ' ';
  middleHexagons += getHexagonPath(cx, cy, R * 0.66) + ' ';
  innerHexagons += getHexagonPath(cx, cy, R * 0.33) + ' ';
  cubeLines += getCubeLinesPath(cx, cy, R) + ' ';
}

// Create complete SVG string
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W.toFixed(3)}" height="${H.toFixed(3)}" viewBox="0 0 ${W.toFixed(3)} ${H.toFixed(3)}">
  <!-- Seamless Repeating Isometric Nested Cube Grid Pattern -->
  <g fill="none" stroke="#e4e4e7" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
    <!-- Outer Hexagons -->
    <path d="${outerHexagons.trim()}" />
    <!-- Middle Hexagons -->
    <path d="${middleHexagons.trim()}" stroke-opacity="0.8" />
    <!-- Inner Hexagons -->
    <path d="${innerHexagons.trim()}" stroke-opacity="0.6" />
    <!-- 3D Cube Edges -->
    <path d="${cubeLines.trim()}" />
  </g>
</svg>`;

// Ensure patterns directory exists
const publicDir = path.join(__dirname, '..', 'public');
const patternsDir = path.join(publicDir, 'patterns');
if (!fs.existsSync(patternsDir)) {
  fs.mkdirSync(patternsDir, { recursive: true });
}

// Write file
fs.writeFileSync(path.join(patternsDir, 'isometric.svg'), svg, 'utf8');
console.log('Successfully generated isometric.svg pattern in public/patterns/isometric.svg');
