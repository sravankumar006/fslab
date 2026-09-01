const fs = require('fs');

// 1. Writing to a file
const content = 'This is new content for the file.';
fs.writeFile('newfile.txt', content, err => {
  if (err) throw err;
  console.log('File has been saved!');

  // 2. Reading the file
  fs.readFile('newfile.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log('Read data:', data);

    // 3. Appending to the file
    fs.appendFile('newfile.txt', '\nThis is appended content.', err => {
      if (err) throw err;
      console.log('Content appended!');

      // 4. Checking if the file exists
      fs.access('newfile.txt', fs.constants.F_OK, (err) => {
        if (err) {
          console.log('File does not exist.');
        } else {
          console.log('File exists.');

          // 5. Deleting the file
          fs.unlink('newfile.txt', err => {
            if (err) throw err;
            console.log('File was deleted.');
          });
        }
      });
    });
  });
});