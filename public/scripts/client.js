/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const makeStringSafe = function (string) {
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
}

/**
 * Takes array of tweet object as argument
 * Calls createTweetElement on each tweet object and appends rendered html elements to  section.tweet-log
 * Return undefined
*/
const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    $('.tweet-log').prepend(createTweetElement(tweet));
  }
}

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
    console.log('Error: ', err)
  })
};


$(document).ready(function() {
  const $tweetForm = $('form');
  const $tweetTextArea = $('textarea');
  const $tweetOutput = $('output');
  // AJAX request to load weets imediately upon document ready
  loadTweets();
  // Event listener for submit button
  $tweetForm.on('submit', function(event) {
    event.preventDefault();
    const tweetText = $(this).serialize();
    if (tweetText.length > 145) {
      event.preventDefault();
      return $('.warning-long').addClass('hide');
    }
    if (tweetText.length <= 5) {
      event.preventDefault();
      return $('.warning-empty').addClass('hide');
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
        $('.warning').removeClass('hide');
        loadTweets();
      })
      .catch((err) => {
        console.log('Error', err);
      })
  })
})