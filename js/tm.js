$(function() {
    console.log('this is tmall');
    //createButton();
    //window.scrollTo(0,document.body.scrollHeight);
    var tb_pname = getName();
    var tb_list_price = getListPrice();
    var tb_price = getPrice();
    var tb_slug = getSlug();
    var tb_source = getSource();
    var tb_store = getStore();
    var tb_colors = getColors();
    var tb_sizes = getSizes();
    var tb_features = getFeatures();
    var tb_images = getImage();
    var tb_freight = getFreight();
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
     //console.log(tb_thumbs);

    chrome.storage.local.set({'product_name': tb_pname});
    chrome.storage.local.set({'product_list_price': tb_list_price});
    chrome.storage.local.set({'product_price': tb_price});
    chrome.storage.local.set({'product_source': tb_source});
    chrome.storage.local.set({'product_store': tb_store});
    chrome.storage.local.set({'product_option_colors': tb_colors});
    chrome.storage.local.set({'product_option_sizes': tb_sizes});
    chrome.storage.local.set({'product_features': tb_features});
    chrome.storage.local.set({'product_slug': tb_slug});
    chrome.storage.local.set({'product_freight': tb_freight});

    function getName() {
        return $.trim($("#J_DetailMeta h1").text());
    }

    function getListPrice() {
        return $("#J_StrPriceModBox .tm-price").text();
    }

    function getPrice() {
        var cprice =  $(".tm-promo-price .tm-price").text();
        if (cprice) {
            return cprice;
        } else {
            return $("#J_StrPriceModBox .tm-price").text();
        }
    }

    function getSlug() {
        var url = window.location.href;

        var pattern = /id=(\d+)/;
        var result = url.match(pattern);
        if (result[1]) {
            var num = result[1];
            var y = num.toString();
            return y.split("").reverse().join("");
        } else {
            return '';
        }
    }

    function getFreight() {
        var text =$("#J_PostageToggleCont").text();
        var pattern = /\d+/;
        var result = text.match(pattern);
        if (result) {
            return result[0];
        } else {
            return 0;
        }
    }

    function getSource() {
        return window.location.href;
    }

    function getStore() {
        var store =  $("#J_EmStock").text();
       // console.log(store);
        var num = store.match(/\d+/g);
        if (num) {
            return num[0];
        } else {
            return 0;
        }
    }

    function getColors() {
        var colors = new Array();
        $(".tm-img-prop  ul > li ").each(function(){
            colors.push($(this).attr('title'));
        });
        return colors;
    }

    function getSizes() {
        var sizes =  new Array();
        $(".tb-prop.tm-sale-prop ul:first >li>a>span").each(function(){
            sizes.push($(this).text());

        });
        return sizes;
    }

    function getFeatures() {
        var features = new Array();
        $("#J_AttrUL li").each(function () {
            features.push($(this).text());
        });
        return features;
    }

    function getImage() {
        var images = new Array();
        $(document.body).on('mouseover', 'img', function(event) {
            var width = this.clientWidth;
            var height = this.clientHeight;
            if(width > 300 && height > 300 && this.src){
                images.push(this.src);
                console.log(this.src);
            }
            var uniqueImages = [];
            $.each(images, function(i, el){
                if($.inArray(el, uniqueImages) === -1) uniqueImages.push(el);
            });
            chrome.storage.local.set({'product_images': $.unique(uniqueImages)});
        });




        // //var images = new Array();
        // $("img").each(function(){
        //     var width = this.clientWidth;
        //     var height = this.clientHeight;
        //     if(width > 100 && height > 100){
        //         if($(this).attr("data-ks-lazyload") == undefined){
        //             console.log("src:"+$(this).attr("src"));
        //             images.push($(this).attr("src"));
        //         }else{
        //             images.push($(this).attr("data-ks-lazyload"));
        //             console.log("data-ks-lazyload:"+$(this).attr("data-ks-lazyload"));
        //         }
        //
        //     }
        // });
        // var uniqueImages = [];
        // $.each(images, function(i, el){
        //     if($.inArray(el, uniqueImages) === -1) uniqueImages.push(el);
        // });
        // return $.unique(uniqueImages);






       // return $.unique(uniqueImages);
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

    function createButton() {
        var button = '<button id="fetch-image">获取详情图</button>';
        $("body").append(button);
    }

    // $(document.body).on('click', '#page', function(event) {
    //     alert(123);
    //     var images = new Array();
    //     $(this).find('img').each(function (index, item) {
    //         var width = item.clientWidth;
    //         var height = item.clientHeight;
    //         if(width > 300 && height > 300 && this.src){
    //
    //             console.log(this.src);
    //             images.push(this.src);
    //         }
    //         var uniqueImages = [];
    //         $.each(images, function(i, el){
    //             if($.inArray(el, uniqueImages) === -1) uniqueImages.push(el);
    //         });
    //         chrome.storage.local.set({'product_images': $.unique(uniqueImages)});
    //
    //     });
    //
    // });

});

