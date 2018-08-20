"use strict";

$(document).ready(function() {

  $("#new-tweet-content").on("click", function(event){
    $("#error-msg").slideUp();
  });

  $("#new-tweet-submit").on("click", function(event) {
    event.preventDefault();
    if ($("#new-tweet-content").val() === "") {
      $("#error-msg").text("Please fill out the content in your tweet!").slideDown();
    } else if ($(".new-tweet textarea").val().length > 140) {
      $("#error-msg").text("Seems like your tweet content is too long. Please limited it within 140 characters.").slideDown();
    } else {
      let $rawTweetText = $("#new-tweet-content").serialize();
      $("#tweets-container").empty();
      $("#new-tweet-content").val("");
      $(".counter").text("140");
      $.post("/tweets", $rawTweetText, function (){
        loadTweets();
      });
    }
  });

});