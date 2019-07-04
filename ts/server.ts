import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as knex from "knex";

const port = 7000;

const server = express();

server.use(cors());

server.use(bodyParser.json({ limit: "10mb" }));

server.listen(port, err => {
  if (err) console.log(err);
  else console.log(`server listening on port ${port}`);
});
