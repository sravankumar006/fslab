const fs = require('fs/promises');
const readline = require('readline/promises');
const path = require('path');
const { stdin: input, stdout: output } = require('process');

async function runFileManager() {
  const rl = readline.createInterface({ input, output });

  try {
    console.log("=== Node.js File Management Utility ===");

    // Step 1: Prompt for filename and initial content
    const rawFileName = await rl.question('Enter filename (e.g., sample.txt): ');
    const fileName = rawFileName.trim() || 'test.txt';
    const filePath = path.join(__dirname, fileName);

    const initialContent = await rl.question('Enter initial content to write: ');

    // Step 2: Create / Write File
    console.log(`\n1. Creating and writing to '${fileName}'...`);
    await fs.writeFile(filePath, initialContent, 'utf-8');
    console.log('✔ File written successfully.');

    // Step 3: Read Initial Contents
    console.log(`\n2. Reading contents of '${fileName}':`);
    const initialRead = await fs.readFile(filePath, 'utf-8');
    console.log(`--- Content Start ---\n${initialRead}\n--- Content End ---`);

    // Step 4: Prompt for extra content and append
    const additionalContent = await rl.question('\nEnter content to append: ');
    console.log(`\n3. Appending content to '${fileName}'...`);
    await fs.appendFile(filePath, `\n${additionalContent}`, 'utf-8');
    console.log('✔ Content appended successfully.');

    // Step 5: Read and Display Final Contents
    console.log(`\n4. Final contents of '${fileName}':`);
    const finalRead = await fs.readFile(filePath, 'utf-8');
    console.log(`-------------------------------------\n${finalRead}\n-------------------------------------`);

  } catch (error) {
    console.error('An error occurred during file operations:', error.message);
  } finally {
    rl.close();
  }
}

runFileManager();