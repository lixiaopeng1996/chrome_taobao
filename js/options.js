$(function () {

    // 背景设置
    chrome.storage.local.get('bgSrc', function (result) {
        var imageUrl = result.bgSrc;

        $("body").css('background-image', 'url(' + imageUrl + ')');
    });

    // 页面加载
    chrome.storage.local.get('imageSize', function (result) {
        var channels = result.imageSize;
        $("#image_width").val(channels.width);
        $("#image_height").val(channels.height);
    });

    chrome.storage.local.get('shop_id_show', function (result) {
        var channels = result.shop_id_show;
        if (channels == "yes") {
            $("#shop_id_yes").attr("checked", "true");
        } else {
            $("#shop_id_no").attr("checked", "true");
        }
    });

    chrome.storage.local.get('publish', function (result) {
        var channels = result.publish;
        if (channels == "yes") {
            $("#publish_yes").attr("checked", "true");
        } else {
            $("#publish_no").attr("checked", "true");
        }
    });

    chrome.storage.local.get('option_filter', function (result) {
        var channels = result.option_filter;
        $("#option_filter").val(channels);
    });

    chrome.storage.local.get('feature_filter', function (result) {
        var channels = result.feature_filter;
        $("#feature_filter").val(channels);
    });


    chrome.storage.local.get('site', function (result) {
        var channels = result.site;

        $("#site_name").val(channels.site_name);

        $("#site_api_info").val(channels.site_api_info);

        $("#site_api_image").val(channels.site_api_image);

        $("#site_api_user").val(channels.site_api_user);

        $("#site_api_key").val(channels.site_api_key);

        $("#site_price_n").val(channels.site_price_n);
    });


    $("#default-options").click(function () {
        // 允许通知
        if (Notification.permission !== "denied") {
            Notification.requestPermission(function (permission) {
                if (permission === "granted") {
                     var message_notification = new Notification('操作成功', {
                         icon: '../images/icon48.png',
                         body: "您现在可以正式接收来自我的通知了"
                     });
                    setTimeout(function(){
                        message_notification.close();
                    }, 3000);
                }
            });
        }
        var url = './data/config.json';
        $.getJSON(url,function(result){
            $.each(result, function(i, field){
               if (i == "images") {
                   var imageSize = {};
                   $("#image_height").val(field.height);
                   $("#image_width").val(field.width);
                   imageSize.width = field.height;
                   imageSize.height = field.width;
                   chrome.storage.local.set({'imageSize': imageSize});
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
                   var site = {};
                   $("#site_name").val(field.name);
                   $("#site_api_info").val(field.site_api_info);
                   $("#site_api_image").val(field.site_api_image);
                   $("#site_api_user").val(field.site_api_user);
                   $("#site_api_key").val(field.site_api_key);
                   $("#site_price_n").val(field.site_price_n);

                   site.site_name = field.name;
                   site.site_api_info = field.site_api_info;
                   site.site_api_image = field.site_api_image;
                   site.site_api_user = field.site_api_user;
                   site.site_api_key = field.site_api_key;
                   site.site_price_n = field.site_price_n;
                   chrome.storage.local.set({'site': site});

               }

               if (i == "options") {
                   $("#option_filter").val(field.join("&"));
                   chrome.storage.local.set({'option_filter': field.join("&")});
               }

               if (i == "features") {
                   $("#feature_filter").val(field.join("&"));
                   chrome.storage.local.set({'feature_filter': field.join("&")});
               }

            });
        });
        alert("初始化成功");
    });

    $("#custom-options").click(function () {
        var imageSize = {};
        imageSize.width = $("#image_width").val();
        imageSize.height = $("#image_height").val();
        chrome.storage.local.set({'imageSize': imageSize});

        var shop_id_show = $("input[name='shop_id_show']:checked").val();
        chrome.storage.local.set({'shop_id_show': shop_id_show});

        var publish = $("input[name='publish']:checked").val();
        console.log(publish);
        chrome.storage.local.set({'publish': publish});

        var option_filter = $("#option_filter").val();
        chrome.storage.local.set({'option_filter': option_filter});

        var feature_filter = $("#feature_filter").val();
        chrome.storage.local.set({'feature_filter': feature_filter});

        var bgSrc = $("input[name='bg-src']:checked").val();
        console.log(bgSrc);
        chrome.storage.local.set({'bgSrc': bgSrc});

        var site = {};
        site.site_name = $("#site_name").val();
        site.site_api_info = $("#site_api_info").val();
        site.site_api_image = $("#site_api_image").val();
        site.site_api_user = $("#site_api_user").val();
        site.site_api_key = $("#site_api_key").val();
        site.site_price_n = $("#site_price_n").val();
        chrome.storage.local.set({'site': site});
        alert('修改成功');
    });
});

