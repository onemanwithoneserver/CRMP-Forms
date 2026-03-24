const {execSync} = require('child_process');
const fs = require('fs');
const BASE = 'forms/src/pages/seller/PostType/';

// ─── Read HEAD versions and current truncated versions ───────────────────────
const headLoc = execSync('git show HEAD:' + BASE + 'Location.tsx').toString().split('\n');
const headPt  = execSync('git show HEAD:' + BASE + 'PostType.tsx').toString().split('\n');

const curLoc = fs.readFileSync(BASE + 'Location.tsx', 'utf8').split('\n');
const curPt  = fs.readFileSync(BASE + 'PostType.tsx',  'utf8').split('\n');

// ─── Restore Location.tsx ────────────────────────────────────────────────────
// Current file ends at line 554 (index 553): "            </div>" (trigger block close)
// HEAD suffix starts at index 337: the blank line before the h-px separator
// HEAD suffix ends at the last line of the file (index headLoc.length - 1)
const locSuffixStart = 337; // 0-indexed, blank line before first h-px separator
const locSuffix = headLoc.slice(locSuffixStart); // rows 2-4 + closings

// Build new Location.tsx: current truncated content + HEAD suffix
const newLoc = [...curLoc, ...locSuffix];
fs.writeFileSync(BASE + 'Location.tsx', newLoc.join('\n'), 'utf8');
console.log('Location.tsx restored. Lines:', newLoc.length);
console.log('Last 6 lines:');
newLoc.slice(-6).forEach((l, i) => console.log(newLoc.length - 6 + i + 1, JSON.stringify(l)));

// ─── Restore PostType.tsx ────────────────────────────────────────────────────
// Current file ends at line 766 (index 765): "              </div>" (trigger block close)
// HEAD PT Row2 separator (h-px) is at L427 (index 426)
// The blank line before it should be at index 425
const ptSuffixStart = 425; // 0-indexed
const ptSuffix = headPt.slice(ptSuffixStart); // rows 2-4 + nav footer + closings

// Build new PostType.tsx: current truncated content + HEAD suffix  
const newPt = [...curPt, ...ptSuffix];
fs.writeFileSync(BASE + 'PostType.tsx', newPt.join('\n'), 'utf8');
console.log('\nPostType.tsx restored. Lines:', newPt.length);
console.log('Last 6 lines:');
newPt.slice(-6).forEach((l, i) => console.log(newPt.length - 6 + i + 1, JSON.stringify(l)));
