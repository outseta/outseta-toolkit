#!/usr/bin/env node

import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join, extname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

// Read package.json to get current version
const packageJsonPath = join(projectRoot, "package.json");
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
const version = packageJson.version;

// Extract minor version (e.g., "0.1.3" -> "0.1")
const minorVersion = version.split(".").slice(0, 2).join(".");

// Pattern to match URLs that need updating
const oldPattern = /@outseta\/toolkit@v\d+(?:\.\d+)?/g;
const newUrl = `@outseta/toolkit@v${minorVersion}`;

// Function to recursively find all files in a directory
function getAllFiles(dirPath, fileList = []) {
  const files = readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = join(dirPath, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (
      extname(file) === ".tsx" ||
      extname(file) === ".ts" ||
      extname(file) === ".md"
    ) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Files to process
const filesToProcess = [
  join(projectRoot, "README.md"),
  ...getAllFiles(join(projectRoot, "readme")),
];

let totalMatches = 0;
let processedFiles = 0;

// Process each file
filesToProcess.forEach((filePath) => {
  try {
    let content = readFileSync(filePath, "utf8");
    const matches = content.match(oldPattern);
    const matchCount = matches ? matches.length : 0;

    if (matchCount > 0) {
      const updatedContent = content.replace(oldPattern, newUrl);
      writeFileSync(filePath, updatedContent, "utf8");
      totalMatches += matchCount;
      processedFiles++;

      const relativePath = filePath.replace(projectRoot + "/", "");
      console.log(`📝 Updated ${matchCount} URLs in ${relativePath}`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
});

console.log(
  `✅ Updated ${totalMatches} jsDelivr URLs to use version v${minorVersion}`
);
console.log(`📁 Processed ${processedFiles} files with URL updates`);
