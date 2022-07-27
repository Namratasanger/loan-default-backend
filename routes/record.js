const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/connection");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, response) {
  let db_connect = dbo.getDb("loan-default");
  const data = JSON.parse(req.body.data);
  console.log(data);
  let dumpData = {};

  Object.keys(data).forEach(
    (key) => (dumpData = { ...dumpData, [key.split("-").join("_")]: data[key] })
  );

  //   console.log(dumpData);
  db_connect.collection("client-data").insertOne(dumpData, function (err, res) {
    if (err) throw err;
    response.json({
      code: 200,
      message: "Data dumped",
    });
  });
});

// This section will help you create a new record.
recordRoutes.route("/approve_status").get(function (req, res) {
  let db_connect = dbo.getDb("loan-default");
  let response = {
    code: 404,
    message: "Error",
  };
  let startTime = Math.floor(Date.now() / 1000);
  db_connect
    .collection("approval-status")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = recordRoutes;
