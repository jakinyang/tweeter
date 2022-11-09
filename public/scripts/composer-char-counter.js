$(document).ready(function() {
  const $tweetForm = $('form');
  const $tweetTextArea = $('textarea');
  let $tweetOutput = $('output');

  // Event listener for text input field
  $tweetTextArea.on('input', function() {
    const $this = $(this);
    $tweetOutput.text(140 - this.value.length);
    if($tweetOutput.text() < 0) {
      $this.next().children('output').addClass('negative');
    } else {
      $this.next().children('output').removeClass('negative');
    }
  })

  // Event listener for submit button
  $tweetForm.on('submit', function(event) {
    event.preventDefault();
    $tweetTextArea.val('');
    $tweetTextArea.focus();
    $tweetOutput.text(140);
    $tweetOutput.removeClass('negative');
  })
});