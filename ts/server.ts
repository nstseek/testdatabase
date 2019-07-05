import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as knex from "knex";
import ServerResponse from "./ServerResponse";

const port = 7000;

const table = "MESSAGES";

const server = express();

const knexSQL = knex({
  client: "oracledb",
  connection: {
    host: "127.0.0.1",
    user: "nstseek",
    password: process.argv[2],
    database: "XE"
  }
});

const JSONResponse = (message: string) => {
  const msg = new ServerResponse(message);

  return msg.message;
};

server.use(cors());

server.use(bodyParser.json({ limit: "10mb" }));

server.listen(port, err => {
  if (err) console.log(err);
  else console.log(`server listening on port ${port}`);
});

server.get("/messages", (req, res) => {
  knexSQL
    .select()
    .from(table)
    .then(data => res.json(data));
});

server.post("/messages", (req, res) => {
  if (!req.body.user) {
    res.status(400);
    res.json(JSONResponse("User is missing."));
  }

  if (!req.body.message) {
    res.status(400);
    res.json(JSONResponse("Message is missing."));
  }

  const obj = {
    CREATED_BY: req.body.user,
    MESSAGE: req.body.message
  };

  knexSQL(table).insert(obj).then( data => res.json(data) );
});
