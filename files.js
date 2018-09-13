const { createReadStream, createWriteStream } = require('fs');
const { Transform } = require('stream');

const input = createReadStream('toto.txt', 'utf8');
const output = createWriteStream('result.txt', 'utf8');

class UppercaseTransform extends Transform {
  _transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase());
  }
}

input
  .pipe(new UppercaseTransform())
  .pipe(output);

// input.on('data', chunk => {
//   console.log('input: ', chunk);
//   output.write(chunk.toUpperCase());
// });

// input.on('end', () => {
//   console.log('input: end');
//   output.end();
// });
