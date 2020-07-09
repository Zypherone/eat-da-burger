module.exports = function(app, db) {

  // Import the model (cat.js) to use its database functions.
  //var burger = require("../models/db.js");

  // Create all our routes and set up logic within those routes where required.
  app.get("/", function(req, res) {
    db.all(function(data) {
      var hbsObject = {
        burgers: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });

  app.post("/api/burgers", function(req, res) {
    db.create([
      "name"
    ], [
      req.body.name
    ], function(result) {
      console.log(result);
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    });
  });

  app.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    db.update({
      devoured: req.body.devoured
    }, condition, function(result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });

  app.delete("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    db.delete(condition, function(result) {
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });

};