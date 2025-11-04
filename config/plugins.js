module.exports = ({ env }) => ({
  // ...
  slugify: {
    enabled: true,
    config: {
      contentTypes: {
        article: {
          field: "slug",
          references: "title",
        },
      },
    },
  },
  "strapi-csv-import-export": {
    config: {
      authorizedExports: ["api::employee.employee"],
      authorizedImports: ["api::employee.employee"],
    },
  },
  // ...
});
