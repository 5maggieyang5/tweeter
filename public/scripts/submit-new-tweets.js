$(document).ready(function() {
  $("#new-tweet-submit").on("click", function(event) {
    event.preventDefault();
    if ($("#new-tweet-content").val() === "") {
      alert ("Please fill out the content in your tweet!");
    } else if ($(".new-tweet textarea").val().length > 140) {
      alert ("Seems like your tweet content is too long.. Please limited it within 140 characters.");
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