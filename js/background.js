chrome.browserAction.onClicked.addListener(function() {
    var newURL = "tab.html";
    chrome.tabs.create({ url: newURL });

});


chrome.extension.onMessage.addListener(function(objRequest, _, sendResponse){
    var strText = objRequest.txt;

    console.log(strText);


});