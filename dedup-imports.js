const fs = require('fs');
const BASE = 'forms/src/pages/seller/PostType/';

function dedupFile(filePath) {
  let lines = fs.readFileSync(filePath, 'utf8').split('\n');

  // Remove duplicate ReactDOM import (keep first)
  let seenReactDOM = false;
  lines = lines.filter(l => {
    if (l === "import ReactDOM from 'react-dom'") {
      if (!seenReactDOM) { seenReactDOM = true; return true; }
      return false;
    }
    return true;
  });

  // Remove duplicate X, Check, AlertCircle (keep first occurrence of each)
  let xSeen = false, checkSeen = false, alertSeen = false;
  lines = lines.filter(l => {
    if (l === '  X,') { if (!xSeen) { xSeen = true; return true; } return false; }
    if (l === '  Check,') { if (!checkSeen) { checkSeen = true; return true; } return false; }
    if (l === '  AlertCircle,') { if (!alertSeen) { alertSeen = true; return true; } return false; }
    return true;
  });

  // Remove duplicate MapDialog interface (keep first) 
  let mapDialogIfaceSeen = false;
  lines = lines.filter(l => {
    if (l === 'interface MapDialogProps {') {
      if (!mapDialogIfaceSeen) { mapDialogIfaceSeen = true; return true; }
      return false;
    }
    return true;
  });

  return lines;
}

// ─── Fix Location.tsx ────────────────────────────────────────────────────────
const LOC_PATH = BASE + 'Location.tsx';
let loc = dedupFile(LOC_PATH);
fs.writeFileSync(LOC_PATH, loc.join('\n'), 'utf8');
console.log('Location.tsx: lines=', loc.length);

// ─── Fix PostType.tsx ────────────────────────────────────────────────────────
const PT_PATH = BASE + 'PostType.tsx';
let pt = dedupFile(PT_PATH);
fs.writeFileSync(PT_PATH, pt.join('\n'), 'utf8');
console.log('PostType.tsx: lines=', pt.length);
