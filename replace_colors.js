const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/landing');

function replaceColorsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace hex codes
  content = content.replace(/#8e1b42/gi, '#000000');
  content = content.replace(/#731433/gi, '#171717');
  content = content.replace(/#fdf2f5/gi, '#f5f5f5');
  content = content.replace(/#f9a8bf/gi, '#d4d4d4');
  content = content.replace(/#FCF8F9/gi, '#FAFAFA');

  // Replace tailwind rose classes
  content = content.replace(/\brose-50\b/g, 'neutral-50');
  content = content.replace(/\brose-100\b/g, 'neutral-100');
  content = content.replace(/\brose-200\b/g, 'neutral-200');
  content = content.replace(/\brose-300\b/g, 'neutral-300');
  content = content.replace(/\brose-400\b/g, 'neutral-400');
  content = content.replace(/\brose-500\b/g, 'neutral-500');
  content = content.replace(/\brose-600\b/g, 'neutral-600');
  content = content.replace(/\brose-700\b/g, 'neutral-700');
  content = content.replace(/\brose-800\b/g, 'neutral-800');
  content = content.replace(/\brose-900\b/g, 'neutral-900');
  content = content.replace(/\brose-950\b/g, 'neutral-950');

  // Replace tailwind pink classes
  content = content.replace(/\bpink-50\b/g, 'gray-50');
  content = content.replace(/\bpink-100\b/g, 'gray-100');
  content = content.replace(/\bpink-200\b/g, 'gray-200');
  content = content.replace(/\bpink-300\b/g, 'gray-300');
  content = content.replace(/\bpink-400\b/g, 'gray-400');
  content = content.replace(/\bpink-500\b/g, 'gray-500');
  content = content.replace(/\bpink-600\b/g, 'gray-600');
  content = content.replace(/\bpink-700\b/g, 'gray-700');
  content = content.replace(/\bpink-800\b/g, 'gray-800');
  content = content.replace(/\bpink-900\b/g, 'gray-900');
  content = content.replace(/\bpink-950\b/g, 'gray-950');

  fs.writeFileSync(filePath, content, 'utf8');
}

function traverseDir(currentPath) {
  const files = fs.readdirSync(currentPath);
  for (const file of files) {
    const fullPath = path.join(currentPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverseDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      replaceColorsInFile(fullPath);
    }
  }
}

// Also process page.tsx and Header.tsx if they exist in landing
const layoutPath = path.join(__dirname, 'src/app/landing/layout.tsx');
if (fs.existsSync(layoutPath)) replaceColorsInFile(layoutPath);

const pagePath = path.join(__dirname, 'src/app/landing/page.tsx');
if (fs.existsSync(pagePath)) replaceColorsInFile(pagePath);

const headerPath = path.join(__dirname, 'src/components/Header.tsx');
if (fs.existsSync(headerPath)) replaceColorsInFile(headerPath);

const appPagePath = path.join(__dirname, 'src/app/page.tsx');
if (fs.existsSync(appPagePath)) replaceColorsInFile(appPagePath);

traverseDir(dir);
console.log('Colors replaced successfully.');
