var setAllVerified;

chrome.extension.sendMessage({}, function(response) {
  chrome.storage.sync.get("twitterSetAllVerified", function(result){
    setAllVerified = result.twitterSetAllVerified;
  
    var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      setInterval(init, 1000);

    }
    }, 10);
  });
});

function init() {
  var badgeHtml = '<span class="Icon Icon--verified"><span class="u-hiddenVisually">Verified account</span></span>';

  var badgeElements = document.getElementsByClassName('UserBadges');

  for (var i = 0; i < badgeElements.length; i++) {
    var badgeWrapper = badgeElements[i];
    var badge = badgeWrapper.firstElementChild;

    if (setAllVerified) {
      if (!badge) {
        badgeWrapper.innerHTML = badgeHtml;
      }
    } else {
      if (badge) {
        badge.remove();
      }
    }
  }

  // profile page
  var profileBadgeElement = document.getElementsByClassName('ProfileHeaderCard-badges');
  var profileCardElement = document.getElementsByClassName('ProfileHeaderCard-name');

  if (profileCardElement.length) {
    if (setAllVerified) {
      if (!profileBadgeElement.length) {
        var badgeHtml = "<span class='ProfileHeaderCard-badges'>" + badgeHtml + "</span>";
        profileCardElement[0].insertAdjacentHTML('beforeend', badgeHtml);
      }
    } else {
      if (profileBadgeElement.length) {
        profileBadgeElement[0].remove();
      }
    }
  }
}