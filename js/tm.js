$(function() {
    console.log('this is tmall');
    $("html, body").animate({ scrollTop: 1000 }, 2000);

    var tb_pname = getName();
    var tb_list_price = getListPrice();
    var tb_price = getPrice();
    var tb_source = getSource();
    var tb_store = getStore();
    var tb_colors = getColors();
    var tb_sizes = getSizes();
    var tb_features = getFeatures();
    var tb_images = getImage();
    var tb_thumbs = getThumbs();




     console.log(tb_pname);
     console.log(tb_list_price);
     console.log(tb_price);
     console.log(tb_source);
     console.log(tb_store);
    // console.log(tb_colors);
    // console.log(tb_sizes);
    // console.log(tb_features);
    // console.log(tb_images);
    console.log(tb_thumbs);


    chrome.storage.local.set({'product_name': tb_pname});
    chrome.storage.local.set({'product_list_price': tb_list_price});
    chrome.storage.local.set({'product_price': tb_price});
    chrome.storage.local.set({'product_source': tb_source});
    chrome.storage.local.set({'product_store': tb_store});
    chrome.storage.local.set({'product_option_colors': tb_colors});
    chrome.storage.local.set({'product_option_sizes': tb_sizes});
    chrome.storage.local.set({'product_features': tb_features});
    chrome.storage.local.set({'product_images': tb_images});


    function getName() {
        return $.trim($("#J_DetailMeta h1").text());
    }

    function getListPrice() {
        return $("#J_StrPriceModBox .tm-price").text();
    }

    function getPrice() {
        return $(".tm-promo-price .tm-price").text();
    }

    function getSource() {
        return window.location.href;
    }

    function getStore() {
        var store =  $("#J_EmStock").text();
        console.log(store);
        var num = store.match(/\d+/g);
        if (num) {
            return num[0];
        } else {
            return 0;
        }
    }

    function getColors() {
        var colors = new Array();
        $(".J_TSaleProp.tb-img > li > a > span").each(function(){
            colors.push($(this).text());
        });
        return colors;
    }

    function getSizes() {
        var sizes =  new Array();
        $(".J_TMySizeProp.J_Prop_measurement ul > li>a>span").each(function(){
            sizes.push($(this).text());
        });
        return sizes;
    }

    function getFeatures() {
        var features = new Array();
        $(".attributes-list li").each(function () {
            features.push($(this).text());
        });
        return features;
    }

    function getImage() {
        var images = new Array();
        var imageSize = {};
        chrome.storage.local.get('imageSize', function (result) {
            var channels = result.imageSize;
            imageSize.width = channels.width;
            imageSize.height = channels.height;
        });

        $("img").each(function(){
            var width = this.clientWidth;
            var height = this.clientHeight;
            if(width > imageSize.width && height > imageSize.height && this.src){
                images.push(this.src);
                console.log(this.src);
            }
        });
        var uniqueImages = [];
        $.each(images, function(i, el){
            if($.inArray(el, uniqueImages) === -1) uniqueImages.push(el);
        });
        return $.unique(uniqueImages);
    }

    //tb-viewer-original-pic
    function getThumbs() {
        var thumbs = Array();
        $(document.body).on('mouseout', '#J_UlThumb img', function(event) {
            thumbs.push($("#J_ImgBooth").attr('src'));
            var uniqueThumbs = [];
            $.each(thumbs, function(i, el){
                if($.inArray(el, uniqueThumbs) === -1) uniqueThumbs.push(el);
            });
            chrome.storage.local.set({'product_thumbs': $.unique(uniqueThumbs)});
        });
    }

});

