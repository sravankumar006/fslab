const path = require('path');


const filePath = "C:\\Users\\SAMSUNG\\OneDrive\\Desktop\\3RD YEAR\\fs lab\\ObservationRecords\\Rec\\week4\\main.js";


// Get the directory name
console.log(`Directory Name: ${path.dirname(filePath)}`); // /users/john/documents


// Get the filename
console.log(`File Name: ${path.basename(filePath)}`); // report.txt


// Get the file extension
console.log(`File Extension: ${path.extname(filePath)}`); // .txt


// Join path segments to create a new path
const newPath = path.join(__dirname, 'data', 'config.json');
console.log(`Joined Path: ${newPath}`); // C:\path\to\your\app\data\config.json
