// convertWordlist.js
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'assets', 'wordlist.txt');
const outputPath = path.join(__dirname, 'assets', 'wordlist.js');

const txt = fs.readFileSync(inputPath, 'utf-8');
const words = txt
  .split(/\r?\n/)
  .map(w => w.trim())
  .filter(w => w.length > 0)
  .map(w => w.replace(/"/g, '\\"')); // escape quotes

const jsArray =
  '// This file is auto-generated from wordlist.txt\n' +
  'export default [\n' +
  words.map(w => `  "${w}",`).join('\n') +
  '\n];\n';

fs.writeFileSync(outputPath, jsArray, 'utf-8');
console.log('wordlist.js generated successfully!');