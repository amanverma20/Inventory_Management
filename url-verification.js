#!/usr/bin/env node

// URL Configuration Verification Script
// This script checks that all hardcoded URLs have been properly replaced with environment variables

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking for hardcoded URLs in the project...\n');

// Directories to check
const checkDirs = [
    'Frontend_Inventory/src',
    'Backend_Inventory/controllers',
    'Backend_Inventory'
];

// Patterns to look for (hardcoded URLs)
const dangerousPatterns = [
    /http:\/\/localhost:\d+/g,
    /https:\/\/localhost:\d+/g,
    /localhost:\d+/g
];

// Files to exclude from checks (test files, documentation, etc.)
const excludeFiles = [
    'test-deployment.js', // This legitimately has the deployment URL
    'HARDCODED_URL_FIXES_SUMMARY.md',
    'url-verification.js'
];

let issuesFound = 0;
let filesChecked = 0;

function checkFile(filePath) {
    const filename = path.basename(filePath);
    
    // Skip excluded files
    if (excludeFiles.includes(filename)) {
        return;
    }
    
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        filesChecked++;
        
        dangerousPatterns.forEach(pattern => {
            const matches = content.match(pattern);
            if (matches) {
                console.log(`❌ Found hardcoded URL in ${filePath}:`);
                matches.forEach(match => {
                    const lineNumber = content.substring(0, content.indexOf(match)).split('\n').length;
                    console.log(`   Line ${lineNumber}: ${match}`);
                });
                issuesFound++;
            }
        });
    } catch (error) {
        console.log(`⚠️  Could not read file: ${filePath}`);
    }
}

function checkDirectory(dirPath) {
    try {
        const entries = fs.readdirSync(dirPath, { withFileTypes: true });
        
        entries.forEach(entry => {
            const fullPath = path.join(dirPath, entry.name);
            
            if (entry.isDirectory()) {
                checkDirectory(fullPath);
            } else if (entry.isFile() && (entry.name.endsWith('.js') || entry.name.endsWith('.jsx'))) {
                checkFile(fullPath);
            }
        });
    } catch (error) {
        console.log(`⚠️  Could not read directory: ${dirPath}`);
    }
}

// Check all directories
checkDirs.forEach(dir => {
    console.log(`Checking directory: ${dir}`);
    checkDirectory(dir);
});

console.log(`\n📊 Verification Results:`);
console.log(`   Files checked: ${filesChecked}`);
console.log(`   Issues found: ${issuesFound}`);

if (issuesFound === 0) {
    console.log(`\n✅ SUCCESS: No hardcoded URLs found!`);
    console.log(`   All URLs are properly using environment variables or utility functions.`);
} else {
    console.log(`\n❌ ISSUES FOUND: ${issuesFound} files contain hardcoded URLs`);
    console.log(`   Please review and fix the issues listed above.`);
}

console.log(`\n🔧 Recommended next steps:`);
console.log(`   1. Restart both frontend and backend servers`);
console.log(`   2. Test API connectivity in browser`);
console.log(`   3. Verify image loading works correctly`);
console.log(`   4. Test password reset email links`);