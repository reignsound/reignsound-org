#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { extname, join, resolve } from "node:path";

const root = process.cwd();
const htmlPath = resolve(root, "index.html");
const cssPath = resolve(root, "styles.css");
const readmePath = resolve(root, "README.md");
const failures = [];

for (const [path, label] of [
  [htmlPath, "index.html"],
  [cssPath, "styles.css"],
  [readmePath, "README.md"],
]) {
  if (!existsSync(path)) failures.push(`Missing ${label}`);
}

function contentFiles(directory) {
  const found = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if ([".git", "node_modules", ".next", "dist", "coverage"].includes(entry.name)) continue;
      found.push(...contentFiles(join(directory, entry.name)));
    } else if (entry.isFile() && [".html", ".md"].includes(extname(entry.name).toLowerCase())) {
      found.push(join(directory, entry.name));
    }
  }
  return found;
}

const files = contentFiles(root);
const legacyPattern = /\bindependent\s+enterprise\b/i;
const legacyLocations = files.filter((path) => legacyPattern.test(readFileSync(path, "utf8")));
const homepage = existsSync(htmlPath) ? readFileSync(htmlPath, "utf8") : "";
const readme = existsSync(readmePath) ? readFileSync(readmePath, "utf8") : "";

const checks = [
  ["global enterprise positioning in homepage", /global enterprise/i.test(homepage)],
  ["global enterprise positioning in README", /global enterprise/i.test(readme)],
  ["legacy positioning removed from all HTML and Markdown", legacyLocations.length === 0],
  ["canonical homepage URL", /<link rel="canonical" href="https:\/\/reignsound\.org\/"\s*\/>/.test(homepage)],
  ["IBM Plex typography reference", /IBM Plex Sans/.test(homepage)],
  ["RCCS section retained", /Reignsound Color Classification System/.test(homepage)],
  ["footer documentation section retained", /Documentation &amp; Technology/.test(homepage)],
  ["static stylesheet linked", /href="styles\.css"/.test(homepage)],
];

for (const [name, passed] of checks) {
  console.log(`${passed ? "PASS" : "FAIL"} ${name}`);
  if (!passed) failures.push(name);
}
if (legacyLocations.length) {
  for (const path of legacyLocations) console.error(`Legacy positioning found: ${path.slice(root.length + 1)}`);
}

if (existsSync(cssPath)) {
  const css = readFileSync(cssPath, "utf8");
  const balanced = (css.match(/{/g) ?? []).length === (css.match(/}/g) ?? []).length;
  console.log(`${balanced ? "PASS" : "FAIL"} stylesheet braces balanced`);
  if (!balanced) failures.push("stylesheet braces balanced");
}

if (failures.length) {
  console.error(`Static-site verification failed: ${failures.join("; ")}`);
  process.exitCode = 1;
} else {
  console.log("Static-site verification passed. No deployment was performed.");
}
