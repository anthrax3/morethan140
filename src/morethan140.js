export default class MoreThan140 {

  constructor(container) {
    this.container    = container;
    this.tweetBox     = this.find('.tweet-box');
    this.tweetCounter = this.find('.tweet-counter');
    this.tweetButton  = this.find('button.tweet-action');
    this.urlPrefix    = 'http://lukechilds.github.io/morethan140/#';
    this.intervals    = {};
    this.running      = false;
    this.start();
  }

  find(selector) {
    return this.container.querySelector(selector);
  }

  injectButton() {
    const holder = document.createElement('div');
    holder.innerHTML = `
    <button type="button" class="btn primary-btn tweet-btn tweet-over-140">
      <span class="button-text tweeting-text">
        <span class="Icon Icon--tweet"></span>Tweet over 140
      </span>
    </button>`;
    const button = holder.children[0];
    button.addEventListener('click', () => {
      this.tweetBox.innerText = this.encodeTweet(this.tweetBox.innerText);
      this.tweetButton.disabled = false;
      this.tweetButton.click();
    });
    this.find('.TweetBoxToolbar-tweetButton').appendChild(button);

    return button;
  }

  moreThan140() {
    return this.tweetCounter.classList.contains('max-reached');
  }

  encodeTweet(text) {
    return this.urlPrefix + encodeURIComponent(text);
  }

  decodeTweet(encodedText) {
    return decodeURIComponent(encodedText.substring(this.urlPrefix.length));
  }

  start() {
    this.intervals.checkTweetLength = setInterval(() => {
      this.button.style.display = this.moreThan140() ? 'inline-block' : 'none';
    }, 100);

    this.intervals.decodeTweets = setInterval(() => {
      const links = document.querySelectorAll('.twitter-timeline-link:not(.not-over-140-tweet)');
      for(let i = 0; i < links.length; i++) {
        const link = links[i];
        const expandedUrl = link.getAttribute('data-expanded-url');
        if(expandedUrl && expandedUrl.indexOf(this.urlPrefix) == 0) {
          link.parentElement.innerHTML = this.decodeTweet(expandedUrl);
        } else {
          link.classList.add('not-over-140-tweet');
        }
      }
    }, 100);

    this.button = this.injectButton();
  }

  stop() {
    this.button.remove();
    clearInterval(this.intervals.checkTweetLength);
    clearInterval(this.intervals.decodeTweets);
  }

}
