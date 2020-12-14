const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
// const { expressRequestLogger, expressErrorLogger } = require("common").logger;

const registerRoomsRouter = require("../routes").registerEndpoints;

// const {
//   RESPONSE_STATUS_FAILED,
//   formatResponse,
//   formatError,
// } = require("common").utils.api;

function runServer(app) {
  applyPreRequestMiddlewares(app);
  registerApplicationEndpoints(app);
  //addNotFoundRoute(app);
  //applyPostRequestMiddlewares(app);
}

function applyPreRequestMiddlewares(app) {
  app.use(helmet());
  //app.use(cors({ origin: config.rooms.allowedOrigin, credentials: true }));
  app.use(cors());
  app.options("*", cors());
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  //app.use(expressRequestLogger);
  app.use("/health", (req, res) => {
    res.status(200).send({});
  });
}

// function applyPostRequestMiddlewares(app) {
//   app.use(expressErrorLogger);
// }

function registerApplicationEndpoints(app) {
  registerRoomsRouter(app);
}

// function addNotFoundRoute(app) {
//   app.use((req, res) => {
//     const error = formatError("Not found");
//     const response = formatResponse(RESPONSE_STATUS_FAILED, {}, [error]);
//     res.status(HTTPStatus.NOT_FOUND).send(response);
//   });
// }

module.exports = {
  runServer,
};
