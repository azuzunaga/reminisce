module.exports = app => {
  require("./authRoutes")(app);
  require("./projectRoutes")(app);
  require("./draftRoutes")(app);
  require("./saveRoutes")(app);
  require("./revisionRoutes")(app);
  require("./mergeRoutes")(app);
};
