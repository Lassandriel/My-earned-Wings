import fs from 'fs';
import pngToIco from 'png-to-ico';

const input = 'public/img/Game_icon.png';
const output = 'public/img/Game_icon.ico';

console.log(`Konvertiere ${input} zu ${output}...`);

pngToIco(input)
  .then(buf => {
    fs.writeFileSync(output, buf);
    console.log('Erfolgreich konvertiert!');
  })
  .catch(err => {
    console.error('Fehler bei der Konvertierung:', err);
    process.exit(1);
  });
