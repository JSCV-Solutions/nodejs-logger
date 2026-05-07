import fs from 'node:fs';

fs.renameSync('./dist/esm/index.js', './dist/esm/index.mjs');
fs.renameSync('./dist/esm/index.js.map', './dist/esm/index.mjs.map');
fs.renameSync('./dist/esm/index.d.ts', './dist/esm/index.mts');
fs.renameSync('./dist/esm/index.d.ts.map', './dist/esm/index.d.mts.map');
