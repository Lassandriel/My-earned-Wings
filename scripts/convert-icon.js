import fs from 'fs';
import pngToIco from 'png-to-ico';

pngToIco('public/img/Game_Icon.png')
  .then(buf => {
    fs.writeFileSync('public/img/Game_Icon.ico', buf);
    console.log('Icon converted successfully!');
  })
  .catch(err => {
    console.error('Error converting icon:', err);
  });
