#!/usr/bin/env node

import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

// Read package.json to get current version
const packageJsonPath = join(projectRoot, "package.json");
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
const version = packageJson.version;

// Extract minor version (e.g., "0.1.3" -> "0.1")
const minorVersion = version.split(".").slice(0, 2).join(".");

// Read README.md
const readmePath = join(projectRoot, "README.md");
let readmeContent = readFileSync(readmePath, "utf8");

// Count how many URLs we're updating
const oldPattern = /@outseta\/toolkit@v\d+(?:\.\d+)?/g;
const matches = readmeContent.match(oldPattern);
const matchCount = matches ? matches.length : 0;

// Update all jsDelivr URLs to use the correct minor version
const newUrl = `@outseta/toolkit@v${minorVersion}`;
const updatedContent = readmeContent.replace(oldPattern, newUrl);

// Write back to README.md
writeFileSync(readmePath, updatedContent, "utf8");

console.log(
  `✅ Updated ${matchCount} jsDelivr URLs to use version v${minorVersion}`
);
console.log(`📝 README.md has been updated with the new URLs`);
