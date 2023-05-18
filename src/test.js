const fs = require('fs');
const path = require('path');
const text = fs.readFileSync(path.resolve('./scripts/lib.bundle.js'), 'utf8');
eval(text);
console.log(Postman.Faker);

// const script = 'var x = 5;';

// eval(script);

// console.log(x); 