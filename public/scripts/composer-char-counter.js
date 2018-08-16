$(document).ready(function() {
  // --- our code goes here ---
  $(".new-tweet textarea").keyup(function (){

    var $textarea = $(this);
    var count = 140 - $textarea.val().length;
    var $counter = $textarea.siblings(".counter");
    var countNum = $counter.text(count);

    if (count < 0) {
      countNum.css("color", "red");
    } else {
      countNum.css("color", "black");
    }

  });
});


