"use strict";

$(document).ready(function() {
  // --- our code goes here ---
  $(".new-tweet textarea").keyup(function (){

    var $textarea = $(this);
    var count = 140 - $textarea.val().length;
    var $counter = $textarea.siblings(".counter");
    $counter.text(count);

    if (count < 0) {
      $counter.css("color", "red");
    } else {
      $counter.css("color", "black");
    }

  });
});
