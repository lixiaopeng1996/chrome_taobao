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
    // 填充到选项图片上传区域
    var opBody = $(".option-list");
    $.each(channels, function (key,item) {
        var opHtml = '<label class="radio-inline"><input type="radio" name="option-type" value="'+item+'">'+item+'</label>';
        opBody.append(opHtml);
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

chrome.storage.local.get('site', function (result) {
    channels = result.site;
    $("#current-api-user").text(channels.site_api_user);
    $("#current-api-info").text(channels.site_api_info);
    $("#current-api-image").text(channels.site_api_image);
    $("#current-api-key").text(channels.site_api_key);
});

chrome.storage.local.get('return_product_id', function (result) {
    var channels = result.return_product_id;
    $("#return_product_id").text(channels);
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
    // 默认产品状态
    chrome.storage.local.get('publish', function (result) {
        var channels = result.publish;
        if (channels == "no") {
            $("#current-publish").text("unpublished");
        } else {
            $("#current-publish").text("instock");
        }
    });

    $("#submit-info").click(function () {
         submitInfo();
    });
});

function submitInfo(){
    var content = {};
    content.name = $("#product-name").val();
    content.slug = $("#product-slug").val();
    content.product_source = $("#product-source").val();
    content.list_price = $("#product-list-price").val();
    content.price = $("#product-price").val();
    content.amount = $("#product-store").val();
    content.status = $("#current-publish").text();

    if (!content.slug) {
        alert('请先完成翻译');
        return false;
    }

    var colors = [];
    $("input[name='colors']").each(function () {
        colors.push($(this).val());
    });

    var sizes = [];
    $("input[name='sizes']").each(function () {
        sizes.push($(this).val());
    });

    var options = {};
    options.颜色 = colors;
    options.尺寸 = sizes;
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
    var features = {};
    $.each(feature_names, function (i, feature_name) {
        features[feature_name] = feature_values[i];
    });
    // console.log(features);
    content.features = features;
    var data = {};
    data.data = content;

    data.ccshop_apiuser = $("#current-api-user").text();
    data.ccshop_apikey = $("#current-api-key").text();
    var infoUrl = $("#current-api-info").text();
    var imageUrl = $("#current-api-image").text();
    console.log(data);

    $.ajax({
        type:"POST",
        url:infoUrl,
        data:data,
        datatype: "json",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        beforeSend:function(){
            $("#submit-info").html("loading");
        },
        success:function(data){
            chrome.storage.local.set({'return_product_id': data.data.id});
            $("#return_product_id").text(data.data.id);
            alert('产品创建成功, 可以开始上传图片了');
            $("#image-container").css("display","block");
        },
        complete: function(XMLHttpRequest, textStatus){
            $("#submit-info").html("提交信息");
        },
        error: function(){
            console.log('error');
            alert('产品创建失败, 请联系开发者...');
        }
    });
}






