// Grab the articles as a json
$(document).on("click", "#scrapenew", function(){


$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<div class= ' card text-white bg-info mb-3'> <div class: 'card-header'> <h4>"+ data[i].title+"</h4></div><br><div class 'card-body'><p>" + data[i].link + "</p> <button type='button' class='btn btn-danger' data-id='" + data[i]._id + "'id= 'addnote'>Create Comment</button><h3>Comments:</h3><hr><p data-id='" + data[i]._id + "' id= 'comments'></p></div> </div>");
  }
});
})


// Whenever someone clicks a p tag
$(document).on("click", "#addnote", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");
  // console.log(thisId)

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
   
    // With that done, add the note information to the page
    .then(function(data) {
      // console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' ></input>");
      // A textarea to add a new note body
      // $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Comment</button>");
      // console.log(data.note)
      // $("#comments").append("<hr><div><h5> "+data+"</h5></div>");
      // If there's a note in the article
      if (data.note) {
        console.log(data.note);
        // Place the title of the note in the title input
        $("#titleinput").text(data.note.title);
        // Place the body of the note in the body textarea
        // $("textarea").text(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      // body: $("#bodyinput").val()
    }
  })
    
    // With that done
    .then(function(data) {
      $("#comments").append("<hr><div><h5> "+data.note+"</h5><button data-id='" + data._id + "' id='deletenote'>Delete Comment</button></div>");
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
$(document).on("click", "#deletenote", function(e){
  e.preventDefault();
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "PUT",
    url: "/notes/remove/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      // body: $("#bodyinput").val()
    }
  }).then(function(data) {
    if(data){
      console.log(data);
      
    }  
    
  });
  $("#comments").empty();
});