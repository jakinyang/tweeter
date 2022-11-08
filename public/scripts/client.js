/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test Driver code
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

/**
 * takes a tweet string as an argument
 * returns appending html element 
*/
const createTweetElement = function(tweet) {
  const $tweet = $(`
    <article class="tweet">
      <header>
        <div class="tweet-user">
          <i class="fa-regular fa-face-meh-blank"></i>
          <p class="username">John Cena</p>
        </div>
        <p class="user-id">@cantseeyou</p>
      </header>
      <p class="tweet-content">Whatever cold-pressed cardigan, gatekeep kogi street art thundercats intelligentsia.</p>
      <footer>
        <p><span class="tweet-age">10</span> days ago</p>
        <div class="tweet-button-group">
          <i class="fa-solid fa-flag fa-2xs"></i>
          <i class="fa-solid fa-retweet fa-2xs"></i>
          <i class="fa-solid fa-heart fa-2xs"></i>
        </div>
      </footer>
    </article>
  `)
}