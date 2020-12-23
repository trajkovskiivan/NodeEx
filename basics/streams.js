const fs = require("fs");

const readStream = fs.createReadStream(`${__dirname}/docs/blog3.txt`, {encoding: "utf-8"});
const writeStream = fs.createWriteStream(`${__dirname}/docs/blog4.txt`);

// readStream.on('data', (chunk) => {
//   console.log('----- New Chunk -----');
//   console.log(chunk);
//   writeStream.write(` \n NEW CHUNK \n`);
//   writeStream.write(chunk);
// });


// piping

readStream.pipe(writeStream);