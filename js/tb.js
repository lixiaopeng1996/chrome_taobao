$(function() {
    console.log('this is taobao');

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




    // console.log(tb_pname);
    // console.log(tb_list_price);
    // console.log(tb_price);
    // console.log(tb_source);
    // console.log(tb_store);
    // console.log(tb_colors);
    // console.log(tb_sizes);
    // console.log(tb_features);
    // console.log(tb_images);
    // console.log(tb_thumbs);


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
        return $(".tb-main-title").data('title');
    }

    function getListPrice() {
        var sprice = $("#J_StrPrice em.tb-rmb-num").text();
        var price = sprice.split('-');
        return price[0];
    }

    function getPrice() {
        return $("#J_PromoPriceNum").text();
    }

    function getSource() {
        return window.location.href;
    }

    function getStore() {
        return $("#J_SpanStock").text();
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
        $("img").each(function(){
            var width = this.clientWidth;
            var height = this.clientHeight;
            if(width > 300 && height > 300 && this.src){
                images.push(this.src);
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
        $(document.body).on('mouseout', '.tb-viewer-thumb', function(event) {
            $(".tb-viewer-original-pic").each(function () {
                thumbs.push(this.href);
            });
            var uniqueThumbs = [];
            $.each(thumbs, function(i, el){
                if($.inArray(el, uniqueThumbs) === -1) uniqueThumbs.push(el);
            });
            chrome.storage.local.set({'product_thumbs': $.unique(uniqueThumbs)});
            //return $.unique(thumbs);
        });

    }

});

