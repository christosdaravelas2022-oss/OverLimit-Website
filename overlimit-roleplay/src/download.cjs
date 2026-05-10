const https = require('https');
const fs = require('fs');
https.get('https://over-limit-website.vercel.app/assets/index-BrWd76o0.js', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('site.js', data);
    console.log('Downloaded site.js');
  });
});
