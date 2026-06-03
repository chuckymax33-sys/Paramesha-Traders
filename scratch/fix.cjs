const fs = require('fs');
let css = fs.readFileSync('src/styles.css', 'utf8');

css = css.replace(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/g, (match, l, c, h) => {
  const lightness = parseFloat(l) * 100;
  let sat = parseFloat(c) * 400; // rough approximation
  if (sat > 100) sat = 100;
  return `hsl(${h}, ${sat.toFixed(1)}%, ${lightness.toFixed(1)}%)`;
});

fs.writeFileSync('src/styles.css', css);
console.log('Fixed styles.css!');
