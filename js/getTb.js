chrome.storage.local.get('product_name', function (result) {
    channels = result.product_name;
    $("#product-name").val(channels);
});

chrome.storage.local.get('product_list_price', function (result) {
    channels = result.product_list_price;
    $("#product-list-price").val(channels);
});

chrome.storage.local.get('product_price', function (result) {
    channels = result.product_price;
    $("#product-price").val(channels);
});

chrome.storage.local.get('product_source', function (result) {
    channels = result.product_source;
    $("#product-source").val(channels);
});

chrome.storage.local.get('product_store', function (result) {
    channels = result.product_store;
    $("#product-store").val(channels);
});

chrome.storage.local.get('product_option_colors', function (result) {
    channels = result.product_option_colors;
    var colorsBody = $("#colors");
    $.each(channels, function (key,item) {
        html = '<div class="form-group"><input type="text" value="'+item+'" class="form-control"><span class="glyphicon glyphicon-remove-circle remove-option"></span></div>';
        colorsBody.append(html);
    });
});

chrome.storage.local.get('product_option_sizes', function (result) {
    channels = result.product_option_sizes;
    var sizesBody = $("#sizes");
    $.each(channels, function (key,item) {
        //  glyphicon glyphicon-remove-circle
        html = '<div class="form-group"><input type="text" value="'+item+'" class="form-control"><span class="glyphicon glyphicon-remove-circle remove-option"></span></div>';
        sizesBody.append(html);
    });
});

chrome.storage.local.get('product_features', function (result) {
    channels = result.product_features;
    var featureBody = $("#feature");
    $.each(channels, function (key,item) {
        var fea = item.split(':');
        html = '<div class="col-md-2"><span class="glyphicon glyphicon-remove-circle remove-feature"></span><div class="form-group"><input type="text" value="'+fea[0]+'" class="form-control"></div><div class="form-group"><input type="text" value="'+fea[1]+'" class="form-control"></div></div>';

        featureBody.append(html);
        console.log(fea);


    });
});

$(function() {
    $(document.body).on('click', '.remove-option', function() {
        $(this).parent().remove();
    });
    $(document.body).on('click', '.remove-feature', function() {
        $(this).parent().remove();
    });
    $("#submit-info").click(function () {
         submitInfo();
    });
});

function submitInfo(){

    var url = '';

    var apiUser = '';
    var apiKey = '';
    var shopId = $("#product-shop-id").val();
    var name = $("#product-name").val();
    var slug = $("#product-slug").val();
    var status = $("").val();
    var source = $("#product-source").val();
    var listPrice = $("#product-list-price").val();
    var price = $("#product-price").val();
    var amount = $("#product-store").val();
    var options = $("").val();
    var features = $("").val();




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






