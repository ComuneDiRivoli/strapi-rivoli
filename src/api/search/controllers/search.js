module.exports = {
  async global(ctx) {
    const { q } = ctx.query;
    if (!q) return (ctx.body = { error: "Missing ?q=" });

    const excluded = process.env.EXCLUDED_COLLECTIONS
      ? process.env.EXCLUDED_COLLECTIONS.split(",").map(s => s.trim())
      : [];

    // get all collection types
    const contentTypes = Object.values(strapi.contentTypes)
      .filter(ct => ct.kind === "collectionType")
      .filter(ct => !excluded.includes(ct.uid));

    const results = {};

    for (const ct of contentTypes) {
      const uid = ct.uid;
      const attrs = ct.attributes;

      // 1️⃣ collect all textual fields for this specific collection
      const stringFields = [];
      for (const [name, attr] of Object.entries(attrs)) {
        if (["string", "text", "richtext"].includes(attr.type)) {
          stringFields.push(name);
        }
      }

      // ignore collections with no searchable fields
      if (stringFields.length === 0) continue;

      // 2️⃣ build dynamic $or filter
      const orFilters = stringFields.map(field => ({
        [field]: { $containsi: q }
      }));

      try {
        const entries = await strapi.entityService.findMany(uid, {
          filters: { $or: orFilters },
          populate: "*",
        });

        if (entries.length > 0) {
          results[uid] = entries;
        }

      } catch (err) {
        strapi.log.error(`Search failed for ${uid}`, err);
      }
    }

    ctx.body = results;
  },
};
