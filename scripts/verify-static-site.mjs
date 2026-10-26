#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const htmlPath = resolve(root, "index.html");
const cssPath = resolve(root, "styles.css");
const failures = [];

if (!existsSync(htmlPath)) failures.push("Missing index.html");
if (!existsSync(cssPath)) failures.push("Missing styles.css");

if (existsSync(htmlPath)) {
  const html = readFileSync(htmlPath, "utf8");
  const checks = [
    ["global enterprise positioning", /A global enterprise/i.test(html)],
    ["legacy independent enterprise wording removed", !/independent enterprise/i.test(html)],
    ["canonical homepage URL", /<link rel="canonical" href="https:\/\/reignsound\.org\/"\s*\/>/.test(html)],
    ["IBM Plex typography reference", /IBM Plex Sans/.test(html)],
    ["RCCS section retained", /Reignsound Color Classification System/.test(html)],
    ["footer documentation section retained", /Documentation &amp; Technology/.test(html)],
    ["static stylesheet linked", /href="styles\.css"/.test(html)],
  ];
  for (const [name, passed] of checks) {
    console.log(`${passed ? "PASS" : "FAIL"} ${name}`);
    if (!passed) failures.push(name);
  }
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
