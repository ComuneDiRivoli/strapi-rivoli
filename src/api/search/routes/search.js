module.exports = {
  routes: [
    {
      method: "GET",
      path: "/search",
      handler: "search.global",
      config: {
        auth: false,
      },
    },
  ],
};
