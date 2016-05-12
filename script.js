const tweetDialog = document.getElementById('global-tweet-dialog');
let over140 = false;
const buttonMarkup = `
<button type="button" class="btn primary-btn tweet-btn tweet-over-140">
  <span class="button-text tweeting-text">
    <span class="Icon Icon--tweet"></span>Tweet over 140
  </span>
</button>`;

// Listen for tweet length
tweetDialog.addEventListener('keyup', e => {
    if(e.target.classList.contains('tweet-box')) {
      const maxReached = tweetDialog.querySelector('.max-reached');
      if(maxReached && !over140) {
        over140 = true;
        showControls();
      } else if(!maxReached && over140) {
        over140 = false;
        hideControls();
      }
  }
});

// Inject button element
function showControls() {
  const holder = document.createElement('div');
  holder.innerHTML = buttonMarkup;
  tweetDialog.querySelector('.TweetBoxToolbar-tweetButton').appendChild(holder.children[0]);
}

// Remove button element
function hideControls() {
  tweetDialog.querySelector('.tweet-over-140').remove();
}

// Process over 140 tweet submissions
tweetDialog.addEventListener('click', e => {
  if(e.target.classList.contains('tweet-over-140')) {
    let text = tweetDialog.querySelector('.tweet-box-shadow').value;
  }
});
