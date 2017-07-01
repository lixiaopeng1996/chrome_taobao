chrome.storage.local.get('product_images', function (result) {
    var channels = result.product_images;
    var imageListBody = $("#image-list");
    $.each(channels, function (key,item) {
        console.log(item);
        var html = '<div class="row"><img src="'+item+'"></div>'
        imageListBody.append(html);

    });





});


