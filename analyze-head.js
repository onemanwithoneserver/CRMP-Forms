const {execSync} = require('child_process');
const fs = require('fs');
const BASE = 'forms/src/pages/seller/PostType/';

// ─── Location.tsx recovery ────────────────────────────────────────────────
const headLoc = execSync('git show HEAD:' + BASE + 'Location.tsx').toString().split('\n');
console.log('HEAD Location.tsx last 10 lines:');
headLoc.slice(-10).forEach((l, i) => console.log(headLoc.length - 10 + i + 1, JSON.stringify(l)));

// Find separator dividers (h-px) positions in HEAD
for(let i=0; i<headLoc.length; i++){
  if(headLoc[i].includes('h-px') || headLoc[i].includes('Administrative') || headLoc[i].includes('Row 2') || headLoc[i].includes('Row 3') || headLoc[i].includes('Row 4')){
    console.log('HEAD L' + (i+1) + ':', headLoc[i].trim().slice(0,60));
  }
}

console.log('\n--- HEAD PostType.tsx last 10 lines ---');
const headPt = execSync('git show HEAD:' + BASE + 'PostType.tsx').toString().split('\n');
headPt.slice(-10).forEach((l, i) => console.log(headPt.length - 10 + i + 1, JSON.stringify(l)));

// Find the separator + rows sections in HEAD PostType
for(let i=0; i<headPt.length; i++){
  if(headPt[i].includes('h-px') || headPt[i].includes('Administrative') || headPt[i].includes('Row 2') || headPt[i].includes('Row 3') || headPt[i].includes('Row 4') || headPt[i].includes('flex items-center justify-between') || headPt[i].includes('Next')){
    console.log('HEAD PT L' + (i+1) + ':', headPt[i].trim().slice(0,60));
  }
}
