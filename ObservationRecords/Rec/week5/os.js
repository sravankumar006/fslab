const os = require('os');


console.log(`OS Platform: ${os.platform()}`); // e.g., 'darwin', 'win32', 'linux'
console.log(`CPU Architecture: ${os.arch()}`); // e.g., 'x64'
console.log(`Total Memory: ${os.totalmem()} bytes`);
console.log(`Free Memory: ${os.freemem()} bytes`);
console.log(`Current User Info:`, os.userInfo());
