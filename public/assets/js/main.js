$(function() {


  // Burger tasting submission.
  $("form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();


    var newBurger = {
      name: event.currentTarget[0].value.trim(),
      devoured: 0
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("Created new burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });


  // Update burger state to devoured once tried.
  $(".change-state").on("click", function(event) {
    var id = $(this).data("id");
    var newState = $(this).data("devourstate");

    var newDevourState = {
      devoured: 1
    };

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevourState
    }).then(
      function() {
        console.log("changed devour state to", newState);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  // Delete burger entry regardlesss of devour state.

  $(".delete").on("click", function(event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/burgers/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("deleted burger", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

});