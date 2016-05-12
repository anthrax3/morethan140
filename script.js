let over140 = false;

// Listen for tweet length
document.addEventListener('keyup', e => {
  if(e.target.classList.contains('tweet-box')) {
      const maxReached = document.querySelector('.max-reached');
      if(maxReached && !over140) {
        over140 = true;
        showControls();
      } else if(!maxReached && over140) {
        over140 = false;
        hideControls();
      }
  }
});

function showControls() {
  console.log('show controls');
}

function hideControls() {
  console.log('hide controls');
}
