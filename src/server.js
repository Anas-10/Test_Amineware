const fs = require('fs');

function comparer(s1, s2) {
  const r1 = s1.charAt(0).localeCompare(s2.charAt(0));
  if (r1 !== 0) {
    return r1;
  }

  const r2 = s1.slice(-1).localeCompare(s2.slice(-1));
  if (r2 !== 0) {
    return r2;
  }

  const regex = /[A-Z](\d{8})[A-Z]/;
  const num1 = parseInt(s1.match(regex)[1]);
  const num2 = parseInt(s2.match(regex)[1]);
  return num1 - num2;
}

function tri(strings ) {
  return strings.sort(comparer)
}

const inpt = 'src/input.txt';
const fileS = fs.readFileSync(inpt, 'utf8').split('\n')

const resultat = tri(fileS);

const outpt = 'src/output.txt';
fs.writeFileSync(outpt, resultat.join('\n'));
