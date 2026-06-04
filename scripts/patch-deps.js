/**
 * Post-install patch: fix cuer@0.0.3 passing border:0 to qr which requires border>=1.
 * See: https://github.com/wevm/cuer (bug: border:0 is invalid for qr@1)
 * Patches both the flat node_modules copy and any pnpm virtual store copy.
 */
const fs = require('fs');
const path = require('path');
const { globSync } = require('fs');

const root = path.join(__dirname, '..');

function patchFile(file) {
  if (!fs.existsSync(file)) return false;
  let src = fs.readFileSync(file, 'utf8');
  if (src.includes('border: 0,')) {
    fs.writeFileSync(file, src.replace('border: 0,', 'border: 2,'), 'utf8');
    console.log('[patch-deps] Patched:', file);
    return true;
  }
  return false;
}

// Flat node_modules copy
patchFile(path.join(root, 'node_modules', 'cuer', '_dist', 'QrCode.js'));

// pnpm virtual store copies (any version/variant)
const pnpmDir = path.join(root, 'node_modules', '.pnpm');
if (fs.existsSync(pnpmDir)) {
  for (const entry of fs.readdirSync(pnpmDir)) {
    if (entry.startsWith('cuer@')) {
      const candidate = path.join(pnpmDir, entry, 'node_modules', 'cuer', '_dist', 'QrCode.js');
      patchFile(candidate);
    }
  }
}

console.log('[patch-deps] done');
