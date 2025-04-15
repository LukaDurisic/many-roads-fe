export const createSvgIcon = (number: number) => {
  const svg = `
    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <circle cx="25" cy="25" r="10" fill="black" stroke="white" stroke-width="3"/>
      <text x="20" y="25" font-size="12" font-family="Arial" fill="white" text-anchor="middle">${number}</text>
    </svg>
  `;
  return {
    url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg),
    scaledSize: new window.google.maps.Size(40, 40),
  };
};
