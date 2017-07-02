$(function () {
    $("#image-container").hide();
    chrome.storage.local.get('product_thumbs', function (result) {
        var channels = result.product_thumbs;
        var thumbListBody = $("#thumb-list");
        $.each(channels, function (key,item) {
            console.log(item);
            var html = '<div class="row"><img src="'+item+'"></div>'
            thumbListBody.append(html);

        });
        $("#thumbs-num").html(channels.length);
    });


    chrome.storage.local.get('product_images', function (result) {
        var channels = result.product_images;
        var imageListBody = $("#image-list");
        $.each(channels, function (key,item) {
            var html = '<div class="row"><img src="'+item+'"></div>'
            imageListBody.append(html);

        });
        $("#images-num").html(channels.length);
    });

    $("#preview-image").click(function () {
        $("#image-container").show();
    });

    $("#thumb-list .glyphicon-remove").click(function () {
        $("#image-container").hide();
    });




});



