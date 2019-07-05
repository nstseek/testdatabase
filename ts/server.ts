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
        user: 'nstseek',
        password: process.argv[2],
        database: 'XE',
    }
});

console.log(process.argv[2]);
console.log('response: ');

async function logging() {
  const query = await knexSQL.select('*').from('MESSAGES');
  console.log(query);
}

server.use(cors());

server.use(bodyParser.json({ limit: "10mb" }));

logging();

server.listen(port, err => {
  if (err) console.log(err);
  else console.log(`server listening on port ${port}`);
});
