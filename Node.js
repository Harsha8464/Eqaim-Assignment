const fs = require('fs');

// Specify the desired Node.js version
const desiredNodeVersion = '16.0.0'; // Change this to the version you want to use

// Read the current Node.js version from .nvmrc
const nvmrcPath = '.nvmrc'; // Adjust the path as needed
let currentVersion = '';

try {
  currentVersion = fs.readFileSync(nvmrcPath, 'utf8').trim();
  console.log(`Current Node.js version in .nvmrc: ${currentVersion}`);
} catch (err) {
  console.error(`Error reading .nvmrc file: ${err.message}`);
  process.exit(1);
}

// Update the Node.js version to the desired version
if (currentVersion === desiredNodeVersion) {
  console.log(`Node.js version is already ${desiredNodeVersion}. No update needed.`);
} else {
  try {
    fs.writeFileSync(nvmrcPath, desiredNodeVersion);
    console.log(`Updated Node.js version to ${desiredNodeVersion} in .nvmrc.`);
  } catch (err) {
    console.error(`Error updating .nvmrc file: ${err.message}`);
    process.exit(1);
  }
}
