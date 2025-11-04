'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::article.article', ({ strapi }) => ({
  async find(ctx) {
    // Get excerpt length from query (default 40 words)
    const excerptLengthParam = parseInt(ctx.query.excerptLength, 10) || 40;

    // Fetch data using the default controller
    const { data, meta } = await super.find(ctx);

    const transformed = data.map(article => {
      const content = article?.content || '';
      const words = content.split(/\s+/).filter(Boolean);

      const excerpt =
        article?.excerpt ||
        (words.slice(0, excerptLengthParam).join(' ') +
          (words.length > excerptLengthParam ? '...' : ''));

      const excerptLength = excerpt.split(/\s+/).filter(Boolean).length;

      return {
        ...article,
				excerpt,
				excerptLength,
      };
    });

    return { data: transformed, meta };
  },
}));
