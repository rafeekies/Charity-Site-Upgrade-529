const fs = require('fs');
const path = require('path');

// Function to recursively search for files
function findFiles(dir, extensions) {
  let results = [];
  
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Recursively search subdirectories
      results = results.concat(findFiles(filePath, extensions));
    } else {
      // Check if file has one of the specified extensions
      const ext = path.extname(file).toLowerCase();
      if (extensions.includes(ext)) {
        results.push(filePath);
      }
    }
  });
  
  return results;
}

// Function to check if a file contains the default React import
function hasDefaultReactImport(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return content.includes('import React from \'react\'');
  } catch (err) {
    console.error(`Error reading file ${filePath}:`, err);
    return false;
  }
}

// Main function
function findReactImports() {
  try {
    // Find all .js and .jsx files in the src directory
    const files = findFiles('src', ['.js', '.jsx']);
    
    // Filter files that contain the default React import
    const filesWithDefaultImport = files.filter(file => hasDefaultReactImport(file));
    
    if (filesWithDefaultImport.length === 0) {
      console.log('No files with default React import found');
    } else {
      console.log('Files with default React import:');
      filesWithDefaultImport.forEach(file => {
        console.log(file);
      });
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

// Run the function
findReactImports();
