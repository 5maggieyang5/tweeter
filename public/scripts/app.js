"use strict";
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//convert ms to days **this function was edit from https://gist.github.com/flangofas/714f401b63a1c3d84aaa**
function findDaysAgo(ms) {
  var days, total_hours, total_minutes, total_seconds;
  var todayDateINms = new Date().getTime();
  var msAgo = todayDateINms - ms;

  total_seconds = parseInt(Math.floor(msAgo / 1000));
  total_minutes = parseInt(Math.floor(total_seconds / 60));
  total_hours = parseInt(Math.floor(total_minutes / 60));
  days = parseInt(Math.floor(total_hours / 24));

  return days < 0 ? 0 : days;
};

function createTweetElement (tweetData) {
  let daysAgo      = findDaysAgo(tweetData.created_at);
  let $tweet       = $("<article>").addClass("tweet");
  let $header      = $("<header>");
  let $img         = $("<img>").attr("src", tweetData.user.avatars.small)
  let $author      = $("<div>").addClass("author").text(tweetData.user.name);
  let $handler     = $("<div>").addClass("handler").text(tweetData.user.handle);
  let $tweetBody   = $("<div>").addClass("tweet-body");
  let $littleTweet = $("<p>").text(tweetData.content.text);
  let $footer      = $("<footer>");
  let $time        = $("<span>").text(daysAgo + " days ago");
  let $icons       = $("<span>").addClass("icons");
  let $flagIcon    = $("<i>").addClass("fas fa-flag");
  let $retweetIcon = $("<i>").addClass("fas fa-retweet");
  let $likeIcon    = $("<i>").addClass("fas fa-heart");

  $tweet.append($header);
    $header.append($img);
    $header.append($author);
    $header.append($handler);

  $tweet.append($tweetBody);
    $tweetBody.append($littleTweet);

  $tweet.append($footer);
    $footer.append($time);
    $footer.append($icons);
      $icons.append($flagIcon);
      $icons.append($retweetIcon);
      $icons.append($likeIcon);

  return $tweet;
};

function renderTweets(tweets) {
  for (var tweetData of tweets) {
    var $tweet = createTweetElement(tweetData);
    $("#tweets-container").append($tweet);
  }
}

function loadTweets() {
  $.get("/tweets", function(data) {
    renderTweets(data);
  });
}

$(document).ready(function() {
  loadTweets();

  $("#compose-button").on("click", function(event) {
    $(".new-tweet").slideToggle();
    $("#new-tweet-content").focus();
  })
});




