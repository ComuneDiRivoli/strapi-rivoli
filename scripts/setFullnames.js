// scripts/setFullnames.js
const { createStrapi } = require('@strapi/strapi');

async function main() {
  // Boot Strapi
  const strapi = await createStrapi();
  await strapi.load();

  console.log('🔄 Updating full names for employees...');

  const employees = await strapi.db.query('api::employee.employee').findMany({
    limit: 1000,
  });

  for (const emp of employees) {
    const name = emp.name || '';
    const surname = emp.surname || '';
    const fullname = `${name} ${surname}`.trim();

    await strapi.db.query('api::employee.employee').update({
      where: { id: emp.id },
      data: { fullname },
    });

    console.log(`✅ Updated: ${fullname}`);
  }

  console.log('🎉 Done!');
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Error:', err);
  process.exit(1);
});
