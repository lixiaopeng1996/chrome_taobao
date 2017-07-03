$(function () {
    //$("#image-container").css("display","none");
    chrome.storage.local.get('product_thumbs', function (result) {
        var channels = result.product_thumbs;
        var thumbListBody = $("#thumb-list");
        $.each(channels, function (key,item) {
            //console.log(item);
            var html = '<div class="row"><img src="'+item+'"></div>';
            thumbListBody.append(html);

        });
        $(".thumbs-num").html(channels.length);
    });

    chrome.storage.local.get('product_images', function (result) {
        var channels = result.product_images;
        var imageListBody = $("#image-list");
        $.each(channels, function (key,item) {
            var html = '<div class="row"><img src="'+item+'"></div>';
            imageListBody.append(html);

        });
        $(".images-num").html(channels.length);
    });

    $("#preview-image").click(function () {
        $("#image-container").css("display","block");
    });

    $("#thumb-list .glyphicon-remove").click(function () {
        $("#image-container").css("display","none");
    });

    $(document.body).on('click', '#thumb-list img', function(event) {
        var width = this.clientWidth;
        var height = this.clientHeight;
        $(this).parent().css('width', width);
        $(".current-image-width").html(width);
        $(".current-image-height").html(height);
        $("#current-image").attr("src", $(this).attr("src"));
        $(this).cropper({
            aspectRatio: 4 / 3,
            zoomable: false,
            rotatable : false,
            autoCropArea: 0.8,
            width: 100,
            height: 100,
            crop: function(e) {
                // Output the result data for cropping image.
                $(".select-x").html(e.x);
                $(".select-y").html(e.y);
                $(".select-w").html(e.width);
                $(".select-h").html(e.height);
            }
        });
    });

    $("#ok").click(function () {



    });


   // $("#image-container").css("display","none");
});



