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

    var content = {};

    chrome.storage.local.get('publish', function (result) {
        var publish = result.publish;
        if (publish == "yes") {
             var status = "instock";
        } else {
             var status = "disabled";
        }
        content.status = status;
    });

    chrome.storage.local.get('shop_id_show', function (result) {
        var shop_id_show  = result.shop_id_show;
        if (shop_id_show == "yes") {
             var shop_id = $("#product-shop-id").val();
            content.shop_id = shop_id;
        }
    });
    content.name = $("#product-name").val();
    content.slug = $("#product-slug").val();
    content.source = $("#product-source").val();
    content.listPrice = $("#product-list-price").val();
    content.price = $("#product-price").val();
    content.amount = $("#product-store").val();

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
    //console.log(options);
    content.options = options;

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
    // console.log(features);
    content.features = features;

    var data = {};
    var url = {};
    data.data = content;
    chrome.storage.local.get('site', function (result) {
        var channels = result.site;
        data.ccshop_apiuser = channels.site_api_user;
        data.ccshop_apikey = channels.site_api_key;
        url.info = channels.site_api_info;
        url.image = channels.site_api_image;

    });
    console.log(url);

    console.log(data);

    $.ajax({
        type:"POST",
        url:url.info,
        data:data,
        datatype: "json",
        beforeSend:function(){
            $("#submit-info").html("loading");
        },
        success:function(data){
            console.log(data);

        },
        complete: function(XMLHttpRequest, textStatus){
            $("#submit-info").html("提交信息");
        },
        error: function(){
            console.log('error');
        }
    });
}






