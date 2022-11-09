/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


/**
 * takes a tweet string as an argument
 * returns appending html element 
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
      <p class="tweet-content">${tweet.content.text}</p>
      <footer>
        <p><span class="tweet-age">${tweet.created_at}</span> days ago</p>
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

const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    $('.tweet-log').append(createTweetElement(tweet));
  }
}


$(document).ready(function() {
  const $tweetForm = $('form');
  // Event listener for submit button
  $tweetForm.on('submit', function(event) {
    event.preventDefault();
    const tweetText = $tweetForm.serialize();
    console.log(tweetText);
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: tweetText,
    })
    .then((response) => {
      console.log('response', response);
    })
    .catch((err) => {
      console.log('Error', err);
    })

    /* $.ajax({
      method: 'GET',
      url: '/tweets/',
    })
    .then((response) => {
      console.log('response', response);
    })
    .catch((err) => {
      console.log('Error', err);
    }) */
  })
})