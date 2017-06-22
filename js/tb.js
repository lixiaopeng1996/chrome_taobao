$(function() {
    console.log('this is taobao');

    var tb_pname = getName();
    var tb_list_price = getListPrice();
    var tb_price = getPrice();
    var tb_source = getSource();
    var tb_store = getStore();


    console.log(tb_pname);
    console.log(tb_list_price);
    console.log(tb_price);
    console.log(tb_source);
    console.log(tb_store);









    function getName() {
        return $(".tb-main-title").data('title');
    }

    function getListPrice() {
        return $("#J_StrPrice em.tb-rmb-num").text();
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


});

