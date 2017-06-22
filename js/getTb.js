

chrome.storage.local.get('product_name', function (result) {
    channels = result.product_name;

    $("#product-name").val(channels);
});
