import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const assetsDir = path.join(distDir, 'assets');

// Fix index.html
const htmlPath = path.join(distDir, 'index.html');
if (fs.existsSync(htmlPath)) {
  let html = fs.readFileSync(htmlPath, 'utf8');
  html = html.replace(/(href|src)="\//g, '$1="./');
  fs.writeFileSync(htmlPath, html);
}

// Fix CSS files in assets
if (fs.existsSync(assetsDir)) {
  const files = fs.readdirSync(assetsDir);
  files.forEach((file) => {
    if (file.endsWith('.css')) {
      const filePath = path.join(assetsDir, file);
      let css = fs.readFileSync(filePath, 'utf8');
      // Replace absolute paths with relative paths from /assets/ back up to root then to img
      css = css.replace(/url\(\s*['"]?\/img\//g, 'url(\'../img/');
      fs.writeFileSync(filePath, css);
    }
  });
}

console.log('Fixed paths for Electron distribution!');
