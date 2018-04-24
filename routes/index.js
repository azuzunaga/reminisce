module.exports = app => {
  require("./authRoutes")(app);
  require("./projectRoutes")(app);
  require("./draftRoutes")(app);
};
