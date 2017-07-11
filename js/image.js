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

    cropperObj = [];
    optionImages = [];
    thumbImages = [];
    featureImages = [];


    var api_image = '';
    var return_product_id = '';


    $(document.body).on('click', '.col-md-7 img', function(event) {
        api_image = $("#current-api-image").text();
        return_product_id = $("#return_product_id").text();
        var width = this.clientWidth;
        var height = this.clientHeight;
        var src = $(this).attr("src");
        $(this).parent().css('width', width);
        $(".current-image-width").html(width);
        $(".current-image-height").html(height);
        $("#current-image").attr("src", src);
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
                $("#current-image").attr("src", e.srcElement.currentSrc);

            }
        });
        cropperObj[src] = cropper;
    });

    document.getElementById('ok').addEventListener('click', function(){
        var src = $("#current-image").attr("src");
        var x = $(".select-x").text();
        var y = $(".select-y").text();
        var w = $(".select-w").text();
        var h = $(".select-h").text();
        var height = $(".current-image-width").text();
        var width = $(".current-image-height").text();

        // console.log(src);
        // console.log(x);
        // console.log(y);
        // console.log(w);
        // console.log(h);
        // console.log(width);
        // console.log(height);

        var imgurl =  cropperObj[src].getCroppedCanvas().toDataURL();
        var img = document.createElement("img");
        img.src = imgurl;
        var thumbImagesSrc = api_image+'?key=fa94h9a2y5bv43n2zg3s&url='+src+'&dw=600&dh=800&x='+x+'&y='+y+'&w='+w+'&h='+h+'&id='+return_product_id+'&typeid=1';
        var featureImagesSrc = api_image+'?key=fa94h9a2y5bv43n2zg3s&url='+src+'&dw=600&dh=800&x='+x+'&y='+y+'&w='+w+'&h='+h+'&id='+return_product_id+'&typeid=2';
        var noneSrc = '<img style="display: none;" class="thumbImages" data-src="'+thumbImagesSrc+'"><img style="display: none;" class="featureImages" data-src="'+featureImagesSrc+'">';
        var html = '<div class="col-md-4">'+noneSrc+'<img crossOrigin="Anonymous" src="'+imgurl+'" class="img-rounded"><span class="glyphicon glyphicon-remove-circle remove-crop-image"></span></div>';
        $("#image-select-content").append(html);

    });


    $(document.body).on('click', '.remove-crop-image', function(event) {
        var img = $(this).prev().attr('src');
        $(this).parent().remove();
    });

    $("input[name='image-type']").change(function () {
        var type = $(this).val();
        if (type == 'option') {
            $(".option-list").css("display", "block");
        } else {
            $(".option-list").css("display", "none");
        }
    });


    $("#upload-image").click(function () {
        var  imageType =  $("input[name='image-type']:checked").val();
        if (!return_product_id) {
            alert('请先创建产品');
        }
        if (imageType == 'thumb') {
            var thumbImages = $(".thumbImages");
            $(".thumbImages").each(function () {
                var src = $(this).data('src');
                uploadImage(src);
            });
        } else if (imageType == 'feature') {
            var featureImages = $(".featureImages");
            $(".featureImages").each(function () {
                var src = $(this).data('src');
                uploadImage(src);
            });

        } else {
            //http://ccshop.dev/rhsatmeljmog?key=fa94h9a2y5bv43n2zg3s&url=https://ss1.bdstun.png?v=md5&dw=600&dh=800&x=20&y=50&w=450&h=600&id=840&typeid=1&optionValue=红色
            var checkedOption = $("input[name='option-type']:checked").val();
            if (checkedOption) {
                var src = $("#current-image").attr("src");
                var x = $(".select-x").text();
                var y = $(".select-y").text();
                var w = $(".select-w").text();
                var h = $(".select-h").text();
                if (src) {
                    var url = api_image+'?key=fa94h9a2y5bv43n2zg3s&url='+src+'&dw=600&dh=800&x='+x+'&y='+y+'&w='+w+'&h='+h+'&id='+return_product_id+'&typeid=1&optionValue='+checkedOption;
                    uploadImage(url);
                } else {
                    alert('当前没有裁剪好的图片');
                }
            } else {
                alert("请选择一个现有选项");
            }
        }
    });

    function uploadImage(src) {
        $.ajax({
            type:"GET",
            url: src,
            beforeSend:function(){

            },
            success:function(data){
                console.log(data);
            },
            complete: function(XMLHttpRequest, textStatus){

            },
            error: function(){
                alert('图片上传失败, 请联系开发者');
            }
        });


    }






    $("#image-container").css("display","none");
});



