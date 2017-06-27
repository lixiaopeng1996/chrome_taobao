chrome.storage.local.get('product_name', function (result) {
    var channels = result.product_name;
    $("#product-name").val(channels);
});

chrome.storage.local.get('product_list_price', function (result) {
    var channels = result.product_list_price;
    $("#product-list-price").val(channels);
});

chrome.storage.local.get('product_price', function (result) {
    var channels = result.product_price;
    $("#product-price").val(channels);
});

chrome.storage.local.get('product_source', function (result) {
    var channels = result.product_source;
    $("#product-source").val(channels);
});

chrome.storage.local.get('product_store', function (result) {
    var channels = result.product_store;
    $("#product-store").val(channels);
});

chrome.storage.local.get('product_option_colors', function (result) {
    var channels = result.product_option_colors;
    var colorsBody = $("#colors");
    $.each(channels, function (key,item) {
        var html = '<div class="form-group"><input name="colors" type="text" value="'+item+'" class="form-control"><span class="glyphicon glyphicon-remove-circle remove-option"></span></div>';
        colorsBody.append(html);
    });
});

chrome.storage.local.get('product_option_sizes', function (result) {
    var channels = result.product_option_sizes;
    var sizesBody = $("#sizes");
    $.each(channels, function (key,item) {
        var html = '<div class="form-group"><input name="sizes" type="text" value="'+item+'" class="form-control"><span class="glyphicon glyphicon-remove-circle remove-option"></span></div>';
        sizesBody.append(html);
    });
});

chrome.storage.local.get('product_features', function (result) {
    var channels = result.product_features;
    var featureBody = $("#feature");
    $.each(channels, function (key,item) {
        var fea = item.split(':');
        var html = '<div class="col-md-2"><span class="glyphicon glyphicon-remove-circle remove-feature"></span><div class="form-group"><input name="feature" type="text" value="'+fea[0]+'" class="form-control"></div><div class="form-group"><input name="feature_value" type="text" value="'+fea[1]+'" class="form-control"></div></div>';
        featureBody.append(html);
        //console.log(fea);
    });
});

$(function() {
    $(document.body).on('click', '.remove-option', function() {
        $(this).parent().remove();
    });
    $(document.body).on('click', '.remove-feature', function() {
        $(this).parent().remove();
    });

    // 是否显示店铺id
    chrome.storage.local.get('shop_id_show', function (result) {
        var channels = result.shop_id_show;
        if (channels == "no") {
            $("#product-shop-id").parent().remove();
        }
    });


    $("#submit-info").click(function () {
         submitInfo();
    });
});

function submitInfo(){

    var data = [];
    chrome.storage.local.get('site_api_info', function (result) {
         var url = result.site_api_info;
         data['url'] = url;
    });

    chrome.storage.local.get('site_api_user', function (result) {
         var apiUser = result.site_api_user;
         data['apiUser'] = apiUser;
    });

    chrome.storage.local.get('site_api_key', function (result) {
         var apiKey = result.site_api_key;
         data['apiKey'] = apiKey;
    });

    chrome.storage.local.get('publish', function (result) {
        var publish = result.publish;
        if (publish == "yes") {
             var status = "instock";
        } else {
             var status = "disabled";
        }
        data['status'] = status;
    });

    chrome.storage.local.get('shop_id_show', function (result) {
        var shop_id_show  = result.shop_id_show;
        if (shop_id_show == "yes") {
             var shop_id = $("#product-shop-id").val();
        } else {
             var shop_id = 0;
        }
        data['shop_id'] = shop_id;
    });
    var name = $("#product-name").val();
    var slug = $("#product-slug").val();
    var source = $("#product-source").val();
    var listPrice = $("#product-list-price").val();
    var price = $("#product-price").val();
    var amount = $("#product-store").val();

    // console.log(data);
    // console.log(name);
    // console.log(slug);
    // console.log(source);
    // console.log(listPrice);
    // console.log(price);
    // console.log(amount);


    var colors = [];
    $("input[name='colors']").each(function () {
        colors.push($(this).val());
    });

    var sizes = [];
    $("input[name='sizes']").each(function () {
        sizes.push($(this).val());
    });

    var options = [];
    options['颜色'] = colors;
    options['尺寸'] = sizes;
    console.log(options);

    var feature_names = [];
    var feature_values = [];
    $("input[name='feature']").each(function () {
        feature_names.push($(this).val());
    });
    $("input[name='feature_value']").each(function () {
        feature_values.push($(this).val());
    });
    var features = [];
    $.each(feature_names, function (i, feature_name) {
        features[feature_name] = feature_values[i];
    });
    console.log(features);

    $.ajax({
        type:"POST",
        url:"testLogin.aspx",
        data:{Name:"sanmao",Password:"sanmaoword"},
        datatype: "html",
        beforeSend:function(){$("#msg").html("logining");},

        success:function(data){
            $("#msg").html(decodeURI(data));
        },
        complete: function(XMLHttpRequest, textStatus){
            alert(XMLHttpRequest.responseText);
            alert(textStatus);
        },
        error: function(){
        }
    });
}






