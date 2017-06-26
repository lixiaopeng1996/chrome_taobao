$(function () {
    // 页面加载

    chrome.storage.local.get('image_width', function (result) {
        channels = result.image_width;
        $("#image_width").val(channels);
    });

    chrome.storage.local.get('imahe_height', function (result) {
        channels = result.imahe_height;
        $("#image_height").val(channels);
    });

    chrome.storage.local.get('shop_id_show', function (result) {
        channels = result.shop_id_show;
        if (channels == "yes") {
            $("#shop_id_yes").attr("checked", "true");
        } else {
            $("#shop_id_no").attr("checked", "true");
        }
    });

    chrome.storage.local.get('publish', function (result) {
        channels = result.publish;

        if (channels == "yes") {
            $("#publish_yes").attr("checked", "true");
        } else {
            $("#publish_no").attr("checked", "true");
        }
    });

    chrome.storage.local.get('site_name', function (result) {
        channels = result.site_name;
        $("#site_name").val(channels);
    });

    chrome.storage.local.get('site_api_info', function (result) {
        channels = result.site_api_info;
        $("#site_api_info").val(channels);
    });

    chrome.storage.local.get('site_api_image', function (result) {
        channels = result.site_api_image;
        $("#site_api_image").val(channels);
    });

    chrome.storage.local.get('site_api_key', function (result) {
        channels = result.site_api_key;
        $("#site_api_key").val(channels);
    });

    chrome.storage.local.get('option_filter', function (result) {
        channels = result.option_filter;
        $("#option-filter").val(channels);
    });

    chrome.storage.local.get('feature_filter', function (result) {
        channels = result.feature_filter;
        $("#feature-filter").val(channels);
    });


    $("#default-options").click(function () {
        var url = './data/config.json';
        $.getJSON(url,function(result){
            $.each(result, function(i, field){
               console.log(field);
               console.log(i);
               if (i == "images") {
                   $("#image_height").val(field.height);
                   $("#image_width").val(field.width);
                   chrome.storage.local.set({'image_width': field.width});
                   chrome.storage.local.set({'imahe_height': field.height});
               }

               if (i == "shop_id_show") {
                   if (field == "yes"){
                       $("#shop_id_yes").attr("checked", "true");
                   } else {
                       $("#shop_id_no").attr("checked", "true");
                   }
                   chrome.storage.local.set({'shop_id_show': field});
               }

               if (i == "publish") {
                   if (field == "yes") {
                       $("#publish_yes").attr("checked", "true");
                   } else {
                       $("#publish_no").attr("checked", "true");
                   }
                   chrome.storage.local.set({'publish': field});
               }

               if (i == "sites") {
                   $("#site_name").val(field.name);
                   $("#site_api_info").val(field.site_api_info);
                   $("#site_api_image").val(field.site_api_image);
                   $("#site_api_key").val(field.site_api_key);
                   chrome.storage.local.set({'site_name': field.name});
                   chrome.storage.local.set({'site_api_info': field.site_api_info});
                   chrome.storage.local.set({'site_api_image': field.site_api_image});
                   chrome.storage.local.set({'site_api_key': field.site_api_key});
               }

               if (i == "options") {
                   $("#option-filter").val(field.join("&"));
                   chrome.storage.local.set({'option_filter': field.join("&")});
               }

               if (i == "features") {
                   $("#feature-filter").val(field.join("&"));
                   chrome.storage.local.set({'feature_filter': field.join("&")});
               }

            });
        });

    });
});

