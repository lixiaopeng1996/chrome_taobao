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

    $(document.body).on('click', 'img', function(event) {
        var width = this.clientWidth;
        var height = this.clientHeight;
        $(this).parent().css('width', width);
        $(".current-image-width").html(width);
        $(".current-image-height").html(height);
        $(this).cropper({
            aspectRatio: 4 / 3,
            zoomable: false,
            rotatable : false,
            autoCropArea: 0.8,
            width: 100,
            height: 100,
            crop: function(e) {
                // Output the result data for cropping image.


                console.log('-------------');
                console.log(e.x);

                console.log(e.y);

                console.log(e.width);

                console.log(e.height);


                $(".select-x").html(e.x);
                $(".select-y").html(e.y);
                $(".select-w").html(e.width);
                $(".select-h").html(e.height);



            }
        });
        $image = $(this);
    });

    $("#ok").click(function () {
        //alert(123);
        console.log($image.cropper("getCanvasData"))
    });


   // $("#image-container").css("display","none");
});



