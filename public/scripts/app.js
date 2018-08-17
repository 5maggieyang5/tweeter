/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

//convert ms to days **this function was edit from https://gist.github.com/flangofas/714f401b63a1c3d84aaa**
function findDaysAgo(ms) {
  var days, total_hours, total_minutes, total_seconds;
  var todayDateINms = new Date().getTime();
  var msAgo = todayDateINms - ms;

  total_seconds = parseInt(Math.floor(msAgo / 1000));
  total_minutes = parseInt(Math.floor(total_seconds / 60));
  total_hours = parseInt(Math.floor(total_minutes / 60));
  days = parseInt(Math.floor(total_hours / 24));

  return days;
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
  $tweet.append($tweetBody);
  $tweet.append($footer);

  $header.append($img);
  $header.append($author);
  $header.append($handler);

  $tweetBody.append($littleTweet);

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

function loadPage() {
  $.get("/tweets", function(data) {
    renderTweets(data);
  })
}

$(document).ready(function() {
  loadPage();
});




