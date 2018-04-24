module.exports = app => {
  require("./authRoutes")(app);
  require("./projectRoutes")(app);
};
