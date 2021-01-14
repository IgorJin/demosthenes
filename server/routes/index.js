const contactsRouter = require("./rest/contacts");
const tasksRouter = require("./rest/tasks");
const usersRouter = require("./rest/users");
const meetingRouter = require("./rest/meetingRoute");

function registerEndpoints(app) {
  app.get("/", (req, res) => {
    res.send("Hello on index page");
  });
  app.use("/api/tasks", tasksRouter);
  app.use("/api/contacts", contactsRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/meetings", meetingRouter);
}

module.exports = { registerEndpoints };
