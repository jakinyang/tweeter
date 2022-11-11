/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const makeStringSafe = function(string) {
  let span = document.createElement("span");
  span.appendChild(document.createTextNode(string));
  return span.innerHTML;
};

/**
 * Takes a tweet string as an argument
 * Returns appending html element
*/
const createTweetElement = function(tweet) {
  const $tweet = $(`
    <article class="tweet">
      <header>
        <div class="user">
          <img src="${tweet.user.avatars}" />
          <p class="user-name">${tweet.user.name}</p>
        </div>
        <p class="user-handle">${tweet.user.handle}</p>
      </header>
      <p class="tweet-content">${makeStringSafe(tweet.content.text)}</p>
      <footer>
        <p class="tweet-age">${timeago.format(tweet.created_at)}</p>
        <div class="tweet-button-group">
          <i class="fa-solid fa-flag fa-2xs"></i>
          <i class="fa-solid fa-retweet fa-2xs"></i>
          <i class="fa-solid fa-heart fa-2xs"></i>
        </div>
      </footer>
    </article>
  `);
  return $tweet;
};

/**
 * Takes array of tweet object as argument
 * Calls createTweetElement on each tweet object and appends rendered html elements to  section.tweet-log
 * Return undefined
*/
const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    $('.tweet-log').prepend(createTweetElement(tweet));
  }
};

/**
 * Takes no arguments
 * Uses jquery.ajax to make a get request to '/tweets'
 */
const loadTweets = function() {
  $.ajax({
    method: 'GET',
    url: '/tweets',
  })
    .then((response) => {
      console.log('Response: ', response);
      renderTweets(response);
    })
    .catch((err) => {
      console.log('Error: ', err);
    });
};


$(document).ready(function() {
  const $tweetForm = $('form');
  const $tweetTextArea = $('textarea');
  const $tweetOutput = $('output');
  // AJAX request to load weets imediately upon document ready
  loadTweets();

  // Scroll button toggle handler
  $(window).scroll(function() {
    if ($(this).scrollTop()) {
      $('#scroll').fadeIn();
      $('#new-tweet-btn').fadeOut();
    } else {
      $('#new-tweet-btn').fadeIn();
      $('#scroll').fadeOut();
    }
  });

  $("#scroll").click(function() {
    $("html, body").animate({scrollTop: 0}, 1000);
  });

  // New-tweet toggle handler
  $('.fa-angles-down').on('click', function() {
    if ($('.new-tweet').first().is(":hidden")) {
      $('.new-tweet').slideDown("slow");
    } else {
      $('.new-tweet').hide("slow");
    }
  });
  // Event listener for submit button
  $tweetForm.on('submit', function(event) {
    event.preventDefault();
    const tweetText = $(this).serialize();
    if (tweetText.length > 145) {
      event.preventDefault();
      $('.warning-empty').hide();
      return $('.warning-long').slideDown("slow");
    }
    if (tweetText.length <= 5) {
      event.preventDefault();
      $('.warning-long').hide();
      return $('.warning-empty').slideDown("slow");
    }
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: tweetText,
    })
      .then((response) => {
        console.log('response', response);
        $tweetTextArea.val('');
        $tweetTextArea.focus();
        $tweetOutput.text(140);
        $tweetOutput.removeClass('negative');
        $('.warning').hide();
        loadTweets();
      })
      .catch((err) => {
        console.log('Error', err);
      });
  });
});