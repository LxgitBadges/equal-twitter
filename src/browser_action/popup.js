document.addEventListener('DOMContentLoaded', function () {
  var twitterSetAllVerified;

  chrome.storage.sync.get("twitterSetAllVerified", function(result){
    twitterSetAllVerified = result.twitterSetAllVerified;

    var status = document.querySelector('.js-status');
    var buttonLabel = document.querySelector('.js-toggle');
    
    buttonLabel.innerHTML = twitterSetAllVerified ? 'Unverify everyone!' : 'Verify everyone!';
    if (twitterSetAllVerified === true) {
      status.innerHTML = 'Everyone is verified';
    } else if (twitterSetAllVerified === false) {
      status.innerHTML = 'Everyone is not verified';
    } else {
      status.innerHTML = 'Twitter default';
    }
  });

  document.querySelector('.js-toggle').addEventListener('click', function() {
    chrome.storage.sync.set({ "twitterSetAllVerified": !twitterSetAllVerified }, function(){
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
        window.close();
      });
    });
  });

  document.querySelector('.js-reset').addEventListener('click', function(e) {
    chrome.storage.sync.clear(function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
        window.close();
      });
    });
  });
});