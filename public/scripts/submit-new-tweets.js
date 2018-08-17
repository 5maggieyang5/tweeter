$(document).ready(function() {
  $("#new-tweet-submit").on("click", function(event) {
    event.preventDefault();
    let $rawTweetText = $("#new-tweet-content").serialize();
    console.log($rawTweetText);
    $("#tweets-container").empty();
    $("#new-tweet-content").val("");
    $(".counter").text("140");
    $.post("/tweets", $rawTweetText, function (){
      loadPage();
    });
  });
});