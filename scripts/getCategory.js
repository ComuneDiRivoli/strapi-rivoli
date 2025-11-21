// ./src/import/import.js

const fs = require("fs");
const path = require("path");
const { createStrapi } = require("@strapi/strapi");

async function run() {
  // Boot Strapi
  const app = await createStrapi();
  await app.load();
  await app.start();

  const cat = await app.db.query("api::category.category").findOne({
    where: { documentId: "w5apwqqmj8o4i4fedextgr18" },
  });
  console.log(cat);
  process.exit(0);
}

run();
