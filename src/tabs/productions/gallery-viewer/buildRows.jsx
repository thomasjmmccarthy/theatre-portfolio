const THREE_ITEM_PATTERNS = [
  'LLL', 'LPP', 'PLP', 'PPL', 'PPP'
];

const THREE_ITEM_PUSH_PATTERNS = [
  'LLP', 'LPL', 'PLL'
];


export function buildRows(images, allowThreeColumns=true) {
  const rows = [];
  let i = 0;

  const o = (idx) => {
    if(images.length <= idx) return null;
    return(images[idx].o);
  }

  while (i < images.length) {
    const a = images[i];
    const b = images[i+1];
    const c = images[i+2];

    // Generates a string of image orientations, e.g. LLP, LPL, etc.
    // L = Landscape, P = Portrait
    const pattern3 = `${ o(i) || "" }${ o(i+1) || "" }${ o(i+2) || "" }`;
    const pattern2 = `${ o(i) || "" }${ o(i+1) || "" }`;

    // 3-item patterns
    if(THREE_ITEM_PATTERNS.includes(pattern3) && allowThreeColumns) {
      rows.push({ type: pattern3, items: [a,b,c] });
      i += 3;
      continue;
    }

    // 3-item patterns that push image 3 to a new row
    if(THREE_ITEM_PUSH_PATTERNS.includes(pattern3)) {
      rows.push({ type: pattern2, items: [a, b] });
      i += 2;
      continue;
    }

    //--- Fall back to 2-item patterns ---
    if(b) {
      rows.push({ type: pattern2, items: [a, b] });
      i += 2;
      continue;
    }

    //--- Single Items ---
    rows.push({ type: a.o, items: [a] });
    i += 1
  }

  return rows;
}