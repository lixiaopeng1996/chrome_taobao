chrome.browserAction.onClicked.addListener(function() {
    var newURL = "tab.html";
    chrome.tabs.create({ url: newURL });

});

chrome.tabs.onCreated.addListener(function(tab){
    console.log(tab.id);

    chrome.storage.local.set({'product_name': '商品名称'});
});
