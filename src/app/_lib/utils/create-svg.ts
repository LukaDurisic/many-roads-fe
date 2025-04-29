export const createSvgIcon = (number: number) => {
  const radius = 16; // Size of the marker
  const strokeWidth = 2; // Width of the white border
  const fontSize = 14; // Font size for the number

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${radius * 2}" height="${
    radius * 2
  }">
  <circle 
    cx="${radius}" 
    cy="${radius}" 
    r="${radius - strokeWidth / 2}" 
    fill="black" 
    stroke="white" 
    stroke-width="${strokeWidth}" 
  />
  <text 
    x="50%" 
    y="50%" 
    text-anchor="middle" 
    dy=".35em" 
    fill="white" 
    font-size="${fontSize}" 
    font-family="Arial, sans-serif"
  >
    ${number}
  </text>
</svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};
