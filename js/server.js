"use strict";
exports.__esModule = true;
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var knex = require("knex");
var port = 7000;
var server = express();
var knexSQL = knex({
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
server.listen(port, function (err) {
    if (err)
        console.log(err);
    else
        console.log("server listening on port " + port);
});
