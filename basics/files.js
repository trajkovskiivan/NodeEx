const fs = require("fs");


// Reading files
fs.readFile('./docs/blog1.txt', (err, data) => {
  if (err) console.log(err);
  console.log(data.toString());
});
console.log('Last line')


// Writing files
fs.writeFile('./docs/blog2.txt', 'Hello Again', (err) => {
  if (err) console.log(err);
  console.log('File was written')
})


// directories
if (!fs.existsSync(`${__dirname}/assets`)) {
  fs.mkdir(`${__dirname}/assets`, (err) => {
    if (err) console.log(err);
    console.log('Folder Created')
  })
} else {
  fs.rmdir(`${__dirname}/assets`, (err) => {
    if (err) console.log(err);
    console.log('Folder Deleted')
  })
}



// Deliting files

if (fs.existsSync('./docs/deleteMe.txt')) {
  fs.unlink('./docs/deleteMe.txt', (err) => {
    if (err) console.log(err);
    console.log("File Deleted")
  })
} else {
  fs.writeFile('./docs/deleteMe.txt', 'Hello Again', (err) => {
    if (err) console.log(err);
    console.log('File was written')
  })
}

