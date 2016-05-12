const tweetDialog = document.getElementById('global-tweet-dialog');
const tweetBox = tweetDialog.querySelector('.tweet-box');
const tweetButton = tweetDialog.querySelector('button.tweet-action');
const urlPrefix = 'http://lukechilds.github.io/morethan140/#';

// Inject button
const holder = document.createElement('div');
holder.innerHTML = `
<button type="button" class="btn primary-btn tweet-btn tweet-over-140">
  <span class="button-text tweeting-text">
    <span class="Icon Icon--tweet"></span>Tweet over 140
  </span>
</button>`;
const button = holder.children[0];
tweetDialog.querySelector('.TweetBoxToolbar-tweetButton').appendChild(button);

// Check tweet length
function checkTweetLength() {
  const maxReached = tweetDialog.querySelector('.max-reached');
  button.style.display = maxReached ? 'inline-block' : 'none';
}
checkTweetLength();
tweetBox.addEventListener('keyup', checkTweetLength);

// Process over 140 tweet submissions
button.addEventListener('click', () => {
  const encodedText = urlPrefix+encodeURIComponent(tweetBox.innerText);
  tweetBox.innerText = encodedText;
  tweetButton.disabled = false;
  tweetButton.click();
});

// Decode over 140 tweets
function decodeTweets() {
  const links = document.querySelectorAll('.twitter-timeline-link:not(.not-over-140-tweet)');
  for(let i = 0; i < links.length; i++) {
    const link = links[i];
    const expandedUrl = link.getAttribute('data-expanded-url');
    if(expandedUrl && expandedUrl.indexOf(urlPrefix) == 0) {
      const encodedText = expandedUrl.substring(urlPrefix.length);
      const decodedText = decodeURIComponent(encodedText);
      link.parentElement.innerHTML = decodedText;
    } else {
      link.classList.add('not-over-140-tweet');
    }
  }
}
decodeTweets();
setInterval(decodeTweets, 100);
