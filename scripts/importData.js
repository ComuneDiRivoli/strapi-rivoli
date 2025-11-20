// ./src/import/import.js

const fs = require('fs');
const path = require('path');
const { createStrapi } = require('@strapi/strapi');

async function run() {
  // Boot Strapi
  const app = await createStrapi();
  await app.load();
	await app.start();

  const filePath = path.join(__dirname, 'intranetExport.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  for (const item of data) {
    try {
      await app.db.query('api::article.article').create({
        data: item,
      });
      console.log('Created:', item.title);
    } catch (err) {
      console.error('Failed:', err);
    }
  }

  console.log('--- DONE ---');
  process.exit(0);
}

run();
