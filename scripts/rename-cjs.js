import fs from 'node:fs';

fs.renameSync('./dist/cjs/index.js', './dist/cjs/index.cjs');
fs.renameSync('./dist/cjs/index.js.map', './dist/cjs/index.cjs.map');
fs.renameSync('./dist/cjs/index.d.ts', './dist/cjs/index.cts');
fs.renameSync('./dist/cjs/index.d.ts.map', './dist/cjs/index.d.cts.map');
