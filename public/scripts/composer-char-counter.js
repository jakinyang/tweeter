$(document).ready(function() {
  const $tweetTextArea = $('textarea');
  const $tweetOutput = $('output');

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
});