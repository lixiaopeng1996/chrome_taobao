$(function () {
    //$("#image-container").css("display","none");
    chrome.storage.local.get('product_thumbs', function (result) {
        var channels = result.product_thumbs;
        var thumbListBody = $("#thumb-list");
        $.each(channels, function (key,item) {
            //console.log(item);
            var html = '<div class="row"><img crossOrigin="Anonymous" src="'+item+'"></div>';
            thumbListBody.append(html);

        });
        $(".thumbs-num").html(channels.length);
    });

    chrome.storage.local.get('product_images', function (result) {
        var channels = result.product_images;
        var imageListBody = $("#image-list");
        $.each(channels, function (key,item) {
            var html = '<div class="row"><img crossOrigin="Anonymous" src="'+item+'"></div>';
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

    $(document.body).on('click', '.col-md-7 img', function(event) {
        var width = this.clientWidth;
        var height = this.clientHeight;
        $(this).parent().css('width', width);
        $(".current-image-width").html(width);
        $(".current-image-height").html(height);
        $("#current-image").attr("src", $(this).attr("src"));
        $image = this;
        //new Cropper
        cropper = new Cropper($image, {
            aspectRatio: 4 / 3,
            zoomable: false,
            rotatable : false,
            autoCropArea: 0.8,
            width: 100,
            height: 100,

            crop: function(e) {
                // Output the result data for cropping image.
                $(".select-x").html(e.detail.x);
                $(".select-y").html(e.detail.y);
                $(".select-w").html(e.detail.width);
                $(".select-h").html(e.detail.height);
            }
        });






    });



    document.getElementById('ok').addEventListener('click', function(){
        var src = $("#current-image").attr("src");
        var x = $(".select-x").text();
        var y = $(".select-y").text();
        var w = $(".select-w").text();
        var h = $(".select-h").text();

        var height = $(".current-image-width").text();
        var width = $(".current-image-height").text();

        console.log(src);
        console.log(x);
        console.log(y);
        console.log(w);
        console.log(h);
        console.log(width);
        console.log(height);
        var imgurl =  cropper.getCroppedCanvas().toDataURL();
        var img = document.createElement("img");
        img.src = imgurl;
        var html = '<div class="col-md-4"><img crossOrigin="Anonymous" src="'+imgurl+'" class="img-rounded"><span class="glyphicon glyphicon-remove-circle remove-crop-image"></span></div>';
        $("#image-select-content").append(html);

    });


    $(document.body).on('click', '.remove-crop-image', function(event) {
        var img = $(this).prev().attr('src');
        alert(img);
    });

    
    $("#image-container").css("display","none");
});



