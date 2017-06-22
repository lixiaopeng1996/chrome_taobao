chrome.browserAction.onClicked.addListener(function() {
    var newURL = "tab.html";
    chrome.tabs.create({ url: newURL });

});
