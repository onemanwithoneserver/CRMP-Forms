const fs = require('fs');
const path = require('path');

const BASE = 'c:/Users/mlmma/OneDrive/Documents/GitHub/CRMP-Forms/forms/src/pages/seller/PostType';

// ─── Shared MapDialog component text ────────────────────────────────────────

const MAP_DIALOG_COMPONENT = `
// ─── Map Dialog ──────────────────────────────────────────────────────────────

interface MapDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (lat: string, lng: string) => void
  initialLat: string
  initialLng: string
}

function MapDialog({ isOpen, onClose, onConfirm, initialLat, initialLng }: MapDialogProps) {
  const [lat, setLat] = useState(initialLat)
  const [lng, setLng] = useState(initialLng)
  const [pinPosition, setPinPosition] = useState<{ x: number; y: number } | null>(null)
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState('')
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      setLat(initialLat)
      setLng(initialLng)
      setPinPosition(null)
      setFetching(false)
      setError('')
    }
  }, [isOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleAutoFetch = useCallback(() => {
    if (!navigator.geolocation) { setError('Geolocation is not supported.'); return }
    setFetching(true)
    setError('')
    navigator.geolocation.getCurrentPosition(
      pos => {
        const fLat = pos.coords.latitude.toFixed(6)
        const fLng = pos.coords.longitude.toFixed(6)
        setLat(fLat)
        setLng(fLng)
        setFetching(false)
        if (mapRef.current) {
          const r = mapRef.current.getBoundingClientRect()
          setPinPosition({ x: r.width / 2, y: r.height / 2 })
        }
      },
      () => { setError('Unable to fetch location. Please allow location access.'); setFetching(false) },
      { timeout: 10000 }
    )
  }, [])

  const handleMapClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapRef.current) return
    const rect = mapRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setPinPosition({ x, y })
    const latVal = (17.385 + (0.5 - y / rect.height) * 0.25).toFixed(6)
    const lngVal = (78.487 + (x / rect.width - 0.5) * 0.25).toFixed(6)
    setLat(latVal)
    setLng(lngVal)
    setError('')
  }, [])

  if (!isOpen) return null
  const canConfirm = lat.trim() !== '' && lng.trim() !== ''

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative w-full sm:max-w-2xl bg-white sm:rounded-[14px] shadow-2xl border border-[#E2E8F0] flex flex-col overflow-hidden max-h-screen sm:max-h-[calc(100vh-2rem)]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#F1F5F9] bg-gradient-to-r from-[#F8FAFC] to-white shrink-0">
          <div className="flex items-center gap-2">
            <MapPin size={15} className="text-[#C89B3C]" />
            <span className="text-[14px] font-semibold text-[#0F172A] font-['Outfit']">Select Location on Map</span>
          </div>
          <button type="button" onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-[6px] hover:bg-[#F1F5F9] transition-colors"
            aria-label="Close">
            <X size={15} className="text-[#64748B]" />
          </button>
        </div>
        {/* Map Canvas */}
        <div
          ref={mapRef}
          onClick={handleMapClick}
          className="relative w-full flex-1 min-h-[320px] overflow-hidden select-none cursor-crosshair bg-[#EEF1F6]"
          role="application"
          aria-label="Map canvas - click to place pin"
        >
          <div className="absolute inset-0 map-dot-bg" />
          {!pinPosition && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">
              <MapPin size={40} className="text-[#C89B3C] opacity-60" />
              <span className="text-[13px] font-medium font-['Outfit'] text-[#64748B]">Click anywhere on the map to drop a pin</span>
            </div>
          )}
          {lat && lng && pinPosition && (
            <div className="absolute top-3 left-3 bg-white/90 rounded-[6px] px-3 py-1.5 text-[11px] font-mono text-[#1C2A44] shadow-sm border border-[#E2E8F0] pointer-events-none">
              {lat}, {lng}
            </div>
          )}
          <div className="absolute bottom-4 inset-x-0 flex justify-center z-10">
            <button type="button" onClick={e => { e.stopPropagation(); handleAutoFetch() }} disabled={fetching}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.15)] border border-[#E2E8F0] text-[13px] font-semibold font-['Outfit'] text-[#1C2A44] hover:bg-[#F8FAFC] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150">
              <Navigation size={13} className={fetching ? 'animate-spin text-[#2563EB]' : 'text-[#2563EB]'} />
              {fetching ? 'Fetching...' : 'Auto-fetch My Location'}
            </button>
          </div>
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            {pinPosition && (
              <g transform={\`translate(\${pinPosition.x}, \${pinPosition.y})\`}>
                <ellipse cx="0" cy="5" rx="7" ry="3" fill="rgba(0,0,0,0.2)" />
                <path d="M0,-36 C-12,-36 -18,-25 -18,-16 C-18,0 0,5 0,5 C0,5 18,0 18,-16 C18,-25 12,-36 0,-36 Z" fill="#EF4444" stroke="#fff" strokeWidth="2" />
                <circle cx="0" cy="-18" r="7" fill="white" opacity="0.9" />
              </g>
            )}
          </svg>
        </div>
        {/* Coordinate strip */}
        <div className="px-4 py-3 bg-[#F8FAFC] border-t border-[#F1F5F9] shrink-0">
          {error && (
            <div className="flex items-center gap-1.5 mb-2 text-[12px] font-['Outfit'] text-[#DC2626]">
              <AlertCircle size={13} />{error}
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-[#475569] font-['Outfit']">Latitude</label>
              <input type="text" value={lat} onChange={e => setLat(e.target.value)} placeholder="e.g. 17.418980"
                className="w-full px-2.5 py-1.5 rounded-[6px] border border-[#E2E8F0] bg-white text-[13px] font-['Outfit'] text-[#0F172A] focus:outline-none focus:border-[#94A3B8] placeholder-[#94A3B8]" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-[#475569] font-['Outfit']">Longitude</label>
              <input type="text" value={lng} onChange={e => setLng(e.target.value)} placeholder="e.g. 78.343770"
                className="w-full px-2.5 py-1.5 rounded-[6px] border border-[#E2E8F0] bg-white text-[13px] font-['Outfit'] text-[#0F172A] focus:outline-none focus:border-[#94A3B8] placeholder-[#94A3B8]" />
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-[#F1F5F9] shrink-0">
          <button type="button" onClick={onClose}
            className="px-4 py-2 rounded-[6px] text-[13px] font-semibold font-['Outfit'] text-[#475569] border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors">
            Cancel
          </button>
          <button type="button" onClick={() => { onConfirm(lat, lng); onClose() }} disabled={!canConfirm}
            className="flex items-center gap-1.5 px-4 py-2 rounded-[6px] text-[13px] font-semibold font-['Outfit'] bg-[#0F172A] text-white hover:bg-[#1E293B] disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
            <Check size={13} /> Confirm Location
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
`;

// ─── Patch Location.tsx ──────────────────────────────────────────────────────

const LOC_PATH = path.join(BASE, 'Location.tsx');
let locLines = fs.readFileSync(LOC_PATH, 'utf8').split('\n');

// 1. Add ReactDOM import after line 0 (import React...)
locLines.splice(1, 0, "import ReactDOM from 'react-dom'");

// 2. Add X, Check, AlertCircle to lucide import
//    Find the "  Navigation," line and insert after it
const navIdx = locLines.findIndex(l => l.trim() === 'Navigation,');
locLines.splice(navIdx + 1, 0, '  X,', '  Check,', '  AlertCircle,');

// 3. Insert MapDialog before "export default function Location"
const exportIdx = locLines.findIndex(l => l.startsWith('export default function Location('));
const mapDialogLines = MAP_DIALOG_COMPONENT.split('\n');
locLines.splice(exportIdx, 0, ...mapDialogLines);

// 4. Replace state+handler block in Location()
//    After the insertion above, find the new export line index
const exportIdx2 = locLines.findIndex(l => l.startsWith('export default function Location('));
// Find lines after export: orrZoningList line
const orrIdx = locLines.findIndex((l, i) => i > exportIdx2 && l.includes('const [orrZoningList'));
// Find the end of handleMapClick (the }, []) followed by blank + return)
// Look for 'return (' after orrIdx
const returnIdx = locLines.findIndex((l, i) => i > orrIdx && l.trim() === 'return (');
// Replace orrIdx..returnIdx-1 with new state block
const newStateBlock = [
  '  const [orrZoningList, setOrrZoningList] = useState<string[]>(ORR_ZONING_OPTIONS)',
  '  const [mapOpen, setMapOpen] = useState(false)',
  '',
  '  const update = (payload: Record<string, string>) =>',
  '    dispatch({ type: \'updateData\', payload })',
  '',
  '  return (',
];
locLines.splice(orrIdx, returnIdx - orrIdx + 1, ...newStateBlock);

// 5. Replace return opening to add Fragment + MapDialog render
//    Find the return ( line (now at orrIdx + newStateBlock.length - 1)
const returnIdx2 = locLines.findIndex((l, i) => i >= orrIdx && l.trim() === 'return (');
// Line after return ( should be the <div ref={sectionRef}>
const sectionDivIdx = returnIdx2 + 1;
const sectionDivLine = locLines[sectionDivIdx];
// Replace just the sectionDiv line with Fragment wrapper + MapDialog + sectionDiv
locLines.splice(sectionDivIdx, 1,
  '    <>',
  '      <MapDialog',
  '        isOpen={mapOpen}',
  '        onClose={() => setMapOpen(false)}',
  '        onConfirm={(lat, lng) => update({ latitude: lat, longitude: lng })}',
  '        initialLat={fd.latitude}',
  '        initialLng={fd.longitude}',
  '      />',
  sectionDivLine.replace(/^\s+/, '      '), // keep original div but fix indent
);

// 6. Replace inline canvas block with trigger button
//    Find ref={mapRef} (first occurrence after export)
const mapRefIdx = locLines.findIndex((l, i) => i > exportIdx2 && l.trim() === 'ref={mapRef}');
// The canvas div starts 2 lines before ref={mapRef}: <div\n  ref={mapRef}
const canvasStartIdx = mapRefIdx - 1; // the <div
// Go back 1 more to get the parent <div className="flex flex-col gap-1.5 w-full">
const outerDivIdx = canvasStartIdx - 1;
// The outer block ends at the closing </div> of the lat/lng grid section
// Find the first '            </div>' after the lat/lng TextField lines
const lngFieldIdx = locLines.findIndex((l, i) => i > mapRefIdx && l.includes('label="Longitude"') && l.includes('fd.longitude'));
// The </div> sequence after lat/lng: </div> (grid), </div> (outer flex)
const gridCloseIdx = lngFieldIdx + 1; // </div> for grid
const outerCloseIdx = gridCloseIdx + 1; // </div> for outer flex

// Build the trigger button replacement
const triggerBlock = [
  '            {/* Map Location */}',
  '            <div className="flex flex-col gap-1.5 w-full">',
  "              <label className=\"text-[12px] font-medium text-[#475569] pl-0.5 font-['Outfit']\">Map Location</label>",
  '              <button',
  '                type="button"',
  '                onClick={() => setMapOpen(true)}',
  '                className="h-[38px] w-full flex items-center gap-2 px-3 rounded-[6px] border border-[#BFDBFE] bg-[#EFF6FF] text-[13px] font-semibold font-[\'Outfit\'] text-[#2563EB] hover:bg-[#DBEAFE] hover:border-[#93C5FD] transition-all duration-150 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"',
  '              >',
  '                <MapPin size={14} className="shrink-0 text-[#C89B3C]" />',
  '                {fd.latitude && fd.longitude',
  '                  ? `${fd.latitude}, ${fd.longitude}`',
  "                  : 'Select Location on Map'}",
  '                {fd.latitude && fd.longitude && (',
  '                  <span className="ml-auto text-[11px] font-normal text-[#64748B]">Change</span>',
  '                )}',
  '              </button>',
  '              <div className="grid grid-cols-2 gap-2">',
  '                <TextField label="Latitude" value={fd.latitude} placeholder="e.g. 17.41898" readOnly onChange={() => {}} />',
  '                <TextField label="Longitude" value={fd.longitude} placeholder="e.g. 78.34377" readOnly onChange={() => {}} />',
  '              </div>',
  '            </div>',
];
locLines.splice(outerDivIdx, outerCloseIdx - outerDivIdx + 1, ...triggerBlock);

// 7. Fix closing: replace last 3 lines (</div>\n  )\n}) with closing fragment
const lastIdx = locLines.length - 1;
// The last lines should be: </div>  )  }
if (locLines[lastIdx] === '}' && locLines[lastIdx - 1].trim() === ')' && locLines[lastIdx - 2].trim() === '</div>') {
  locLines.splice(lastIdx - 2, 3,
    '      </div>',
    '    </>',
    '  )',
    '}'
  );
} else {
  console.log('WARNING: closing pattern not found. Last 5 lines:');
  for (let i = lastIdx - 4; i <= lastIdx; i++) console.log(i, JSON.stringify(locLines[i]));
}

fs.writeFileSync(LOC_PATH, locLines.join('\n'), 'utf8');
console.log('Location.tsx done. Lines:', locLines.length);

// ─── Patch PostType.tsx ──────────────────────────────────────────────────────

const PT_PATH = path.join(BASE, 'PostType.tsx');
let ptLines = fs.readFileSync(PT_PATH, 'utf8').split('\n');

// 1. Add ReactDOM import after line 0
ptLines.splice(1, 0, "import ReactDOM from 'react-dom'");

// 2. Add X, Check, AlertCircle to lucide import
const navIdx2 = ptLines.findIndex(l => l.trim() === 'Navigation,');
ptLines.splice(navIdx2 + 1, 0, '  X,', '  Check,', '  AlertCircle,');

// 3. Insert MapDialog before PROPERTY_TYPE_CARDS
const ptCardsIdx = ptLines.findIndex(l => l.startsWith('const PROPERTY_TYPE_CARDS'));
ptLines.splice(ptCardsIdx, 0, ...MAP_DIALOG_COMPONENT.split('\n'));

// 4. Replace pinPosition state + handlers in PostType() with mapOpen
const ptExportIdx = ptLines.findIndex(l => l.startsWith('export default function PostType('));
const ptPinIdx = ptLines.findIndex((l, i) => i > ptExportIdx && l.includes('const [pinPosition, setPinPosition]'));
// Find postTypeSectionRef line that comes after the handlers
const ptSectionRefIdx = ptLines.findIndex((l, i) => i > ptPinIdx && l.trim().startsWith('const postTypeSectionRef'));
// Replace ptPinIdx..(ptSectionRefIdx-1) with just mapOpen
ptLines.splice(ptPinIdx, ptSectionRefIdx - ptPinIdx,
  '  const [mapOpen, setMapOpen] = useState(false)',
  ''
);

// 5. Replace return opening in PostType() to add Fragment + MapDialog
const ptReturnIdx = ptLines.findIndex((l, i) => i > ptExportIdx && l.trim() === 'return (');
const ptFirstDivIdx = ptReturnIdx + 1;
// Replace the first div (flex flex-col h-full) with fragment + MapDialog + div
ptLines.splice(ptFirstDivIdx, 1,
  '    <>',
  '      <MapDialog',
  '        isOpen={mapOpen}',
  '        onClose={() => setMapOpen(false)}',
  "        onConfirm={(lat, lng) => setLocalLocation(s => ({ ...s, latitude: lat, longitude: lng }))}",
  '        initialLat={localLocation.latitude}',
  '        initialLng={localLocation.longitude}',
  '      />',
  '      <div className="flex flex-col h-full bg-[#fafafa]">',
);

// 6. Replace inline canvas block in PostType return
const ptMapRefIdx = ptLines.findIndex((l, i) => i > ptExportIdx && l.trim() === 'ref={mapRef}');
const ptOuterDivIdx = ptMapRefIdx - 2; // back 2 to get the <div className="flex flex-col gap-1.5 w-full">
const ptLngFieldIdx = ptLines.findIndex((l, i) => i > ptMapRefIdx && l.includes('label="Longitude"') && l.includes('localLocation.longitude'));
const ptGridCloseIdx = ptLngFieldIdx + 1;
const ptOuterCloseIdx = ptGridCloseIdx + 1;

const ptTriggerBlock = [
  '              {/* Map Location */}',
  '              <div className="flex flex-col gap-1.5 w-full">',
  "                <label className=\"text-xs font-semibold text-[#445069] pl-0.5 font-['Outfit']\">Map Location</label>",
  '                <button',
  '                  type="button"',
  '                  onClick={() => setMapOpen(true)}',
  "                  className=\"h-[38px] w-full flex items-center gap-2 px-3 rounded-[6px] border border-[#BFDBFE] bg-[#EFF6FF] text-[13px] font-semibold font-['Outfit'] text-[#2563EB] hover:bg-[#DBEAFE] hover:border-[#93C5FD] transition-all duration-150\"",
  '                >',
  '                  <MapPin size={14} className="shrink-0 text-[#C89B3C]" />',
  '                  {localLocation.latitude && localLocation.longitude',
  '                    ? `${localLocation.latitude}, ${localLocation.longitude}`',
  "                    : 'Select Location on Map'}",
  '                  {localLocation.latitude && localLocation.longitude && (',
  '                    <span className="ml-auto text-[11px] font-normal text-[#64748B]">Change</span>',
  '                  )}',
  '                </button>',
  '                <div className="grid grid-cols-2 gap-2">',
  '                  <TextField label="Latitude" value={localLocation.latitude} placeholder="e.g. 17.41898" readOnly onChange={() => {}} />',
  '                  <TextField label="Longitude" value={localLocation.longitude} placeholder="e.g. 78.34377" readOnly onChange={() => {}} />',
  '                </div>',
  '              </div>',
];
ptLines.splice(ptOuterDivIdx, ptOuterCloseIdx - ptOuterDivIdx + 1, ...ptTriggerBlock);

// 7. Fix closing: add </> before the last ) }
const ptLastIdx = ptLines.length - 1;
if (ptLines[ptLastIdx] === '}' && ptLines[ptLastIdx - 1].trim() === ')') {
  ptLines.splice(ptLastIdx - 1, 2,
    '    </>',
    '  )',
    '}'
  );
} else {
  console.log('WARNING: PT closing pattern not found. Last 5 lines:');
  for (let i = ptLastIdx - 4; i <= ptLastIdx; i++) console.log(i, JSON.stringify(ptLines[i]));
}

fs.writeFileSync(PT_PATH, ptLines.join('\n'), 'utf8');
console.log('PostType.tsx done. Lines:', ptLines.length);
