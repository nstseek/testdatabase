import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as knex from "knex";

const port = 7000;

const server = express();

const knexSQL = knex({
    client: 'oracledb',
    connection: {
        host: '127.0.0.1',
        port: 1527,
        user: 'nstseek',
        password: process.argv[2],
        database: 'test'
    }
});

console.log('response: ');
console.log(knexSQL.select().from('messages'));
console.log(knexSQL.select().table('messages'));

server.use(cors());

server.use(bodyParser.json({ limit: "10mb" }));

server.listen(port, err => {
  if (err) console.log(err);
  else console.log(`server listening on port ${port}`);
});
