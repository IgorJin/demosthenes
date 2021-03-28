const contactsRouter = require("./rest/contacts");
const tasksRouter = require("./rest/tasks");
const usersRouter = require("./rest/users");
const eventsRouter = require("./rest/events");

function registerEndpoints(app) {
  app.get("/", (req, res) => {
    res.send("Hello on index page");
  });
  app.use("/api/tasks", tasksRouter);
  app.use("/api/contacts", contactsRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/events", eventsRouter);
}

module.exports = { registerEndpoints };
