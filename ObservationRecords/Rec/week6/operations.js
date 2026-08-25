const fs = require('fs').promises;

async function writeFile() {
  try {
    const content = 'Hello, this is new text written to the file!';
    
    // (fileName, dataToWrite)
    await fs.writeFile('newfile.txt', content);
    
    console.log('File created and saved successfully!');
  } catch (err) {
    console.error('Failed to write file:', err.message);
  }
}

writeFile();
