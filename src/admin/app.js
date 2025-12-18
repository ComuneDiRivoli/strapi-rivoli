const config = {
  locales: ["it"],
  translations: {
    it: {
      "Auth.form.welcome.title": "Benvenuto sull'intranet del Comune di Rivoli",
      "Auth.form.welcome.subtitle":
        "Collegati inserendo la tua mail e la tua password",
      "HomePage.header.title": "Buongiorno {name}",
      "HomePage.header.subtitle":
        "Benvenuto nel tuo pannello di amministrazione",

      "global.back": "Indietro",
      "app.utils.published": "Pubblicato",
      "app.components.ToggleCheckbox.off-label": "Falso",
      "app.components.ToggleCheckbox.on-label": "Vero",

      "components.RelationInput.addOrCreate": "My custom label",
    },
  },
};

const bootstrap = (app) => {
  console.log(app);
};

export default {
  config,
  bootstrap,
};
