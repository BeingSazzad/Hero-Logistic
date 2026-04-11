const fs = require('fs');
const path = require('path');

function walk(dir) {
  fs.readdirSync(dir).forEach(file => {
    let p = path.join(dir, file);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (p.endsWith('.jsx')) {
      let c = fs.readFileSync(p, 'utf8');
      
      let updated = c.replace(/<h1([^>]*)className=["']([^"']+)["']([^>]*)>/g, (match, before, cName, after) => {
        let newC = cName.replace(/font\-(black|semibold|medium|normal|extrabold|light)/g, 'font-bold');
        if (!newC.includes('font-bold') && !newC.includes('hero-h1')) {
          newC += ' font-bold';
        }
        return `<h1${before}className="${newC}"${after}>`;
      });
      
      if (c !== updated) {
        fs.writeFileSync(p, updated, 'utf8');
        console.log(`Updated: ${p}`);
      }
    }
  });
}

walk('e:/Project/investor/logistic/src/pages');
