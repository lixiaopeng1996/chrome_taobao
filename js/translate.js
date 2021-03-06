$(function () {
    $("#one-translate").click(function () {
        var product_name = $("#product-name").val();
        if (!product_name) {
            alert("没有产品名");
            return false;
        }
        var urls = {};
        urls.name = 'https://www.googleapis.com/language/translate/v2?q='+product_name+'&target=ja&key=AIzaSyArw8bJc450lGPIaYBoJzQIijqsArKksJA';
        urls.slug = 'https://www.googleapis.com/language/translate/v2?q='+product_name+'&target=en&key=AIzaSyArw8bJc450lGPIaYBoJzQIijqsArKksJA';

       $.each(urls, function (key, url) {
           translate(key, url);
       });
    });


    function translate(key, url) {
        var result = '';
        $.ajax({
            type:"GET",
            url: url,
            beforeSend:function(){
                $("#one-translate").html('正在翻译');
            },
            success:function(data){
                if (data) {
                    if (data.data.translations[0].translatedText) {
                         result = data.data.translations[0].translatedText;
                         //console.log(result);
                         if (key == 'name') {
                             $("#product-name").val(result);
                         }
                         if (key == 'slug') {
                             $("#product-slug").val(result.replace(/[\W]+/g, '-'));
                         }
                    } else {
                         result = 'error';
                    }
                }
                $("#one-translate").html('翻译完成');
            },
            complete: function(XMLHttpRequest, textStatus){

            },
            error: function(){
                 result = 'error';
            }
        });

    }
});