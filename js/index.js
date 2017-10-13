/**
 * Created by vlad- on 29.07.2017.
 */

var creator={
    start_creating: function ($str) {
        var i= $.ajax({
            type:'post',//тип запроса: get,post либо head
            url:'creator.php',//url адрес файла обработчика
            cache: false,
            data:{'what_to_do':'start_creating','updating_shops':$str},//параметры запроса
            response:'text',//тип возвращаемого ответа text либо xml
            async:true,
            success:function (data) {//возвращаемый результат от сервера
                console.log(data);
            }
        });
        setTimeout(function () {i.abort();},2000);
    },
    start_spider: function ($str) {
        var i= $.ajax({
            type:'post',//тип запроса: get,post либо head
            url:'creator.php',//url адрес файла обработчика
            cache: false,
            data:{'what_to_do':'start_spider','updating_shops':$str},//параметры запроса
            response:'text',//тип возвращаемого ответа text либо xml
            async:true,
            success:function (data) {//возвращаемый результат от сервера
                console.log(data);
            }
        });
        setTimeout(function () {i.abort();},2000);
    },
    upload_our_PL: function () {
        var i= $.ajax({
            type:'post',//тип запроса: get,post либо head
            url:'creator.php',//url адрес файла обработчика
            cache: false,
            data:{'what_to_do':'update_product_list'},//параметры запроса
            response:'text',//тип возвращаемого ответа text либо xml
            async:true,
            success:function (data) {//возвращаемый результат от сервера
                console.log(data);
            }
        });
        setTimeout(function () {i.abort();},10000);
    },
    create_new_products: function () {
        var i= $.ajax({
            type:'post',//тип запроса: get,post либо head
            url:'creator.php',//url адрес файла обработчика
            cache: false,
            data:{'what_to_do':'upload_products'},//параметры запроса
            response:'text',//тип возвращаемого ответа text либо xml
            async:true,
            success:function (data) {//возвращаемый результат от сервера
                console.log(data);
            }
        });
        setTimeout(function () {i.abort();},2000);
    },
    stop: function () {
        $.ajax({
            type:'post',//тип запроса: get,post либо head
            url:'status.php',//url адрес файла обработчика
            cache: false,
            data:{'what_to_do':'stop_creating'},//параметры запроса
            response:'text',//тип возвращаемого ответа text либо xml
            async:true,
            error: function(){
                console.log('ajax error on getting')
            },
            success:function (data) {//возвращаемый результат от сервера
                console.log(data);
            }
        });
    },
    pause: function () {
        $.ajax({
            type:'post',//тип запроса: get,post либо head
            url:'status.php',//url адрес файла обработчика
            cache: false,
            data:{'what_to_do':'pause_creating'},//параметры запроса
            response:'text',//тип возвращаемого ответа text либо xml
            async:true,
            error: function(){
                console.log('ajax error on getting')
            },
            success:function (data) {//возвращаемый результат от сервера
                console.log(data);
            }
        });
    },
    contiune: function () {
        $.ajax({
            type:'post',//тип запроса: get,post либо head
            url:'status.php',//url адрес файла обработчика
            cache: false,
            data:{'what_to_do':'continue_creating'},//параметры запроса
            response:'text',//тип возвращаемого ответа text либо xml
            async:true,
            error: function(){
                console.log('ajax error on getting')
            },
            success:function (data) {//возвращаемый результат от сервера
                console.log(data);
            }
        });
    },
    clear_all: function () {
        $.ajax({
            type:'post',//тип запроса: get,post либо head
            url:'status.php',//url адрес файла обработчика
            cache: false,
            data:{'what_to_do':'clear_all'},//параметры запроса
            response:'text',//тип возвращаемого ответа text либо xml
            async:true,
            error: function(){
                console.log('ajax error on getting')
            },
            success:function (data) {//возвращаемый результат от сервера
                console.log(data);
            }
        });
    }
}
var indicators_store={
    quantity_urls:0,
    quantity_parsed_urls:0,
    quantity_urls_to_parsing:0,
    quantity_found_products:0,
    continue_creating:0,
    status_updating:0,
    goods_uploaded:0,
    time_of_start_updating:0,
    time_of_end_updating:0,
    quantity_downloaded_from_our_PL:0,
    quantiti_products_in_our_shop:0,
    memory_usage:0,
    last_updated:0,
    next_url_to_updating:'',
    get_indicators: function () {
    $.ajax({
        type:'post',//тип запроса: get,post либо head
        url:'status.php',//url адрес файла обработчика
        cache: false,
        data:{'what_to_do':'get_all_information'},//параметры запроса
        response:'text',//тип возвращаемого ответа text либо xml
        async:true,
        error: function(){
            console.log('ajax error on getting')
        },
        success:function (data) {
            data = jQuery.parseJSON(data);
            indicators_store.quantity_urls=parseInt(data['quantity_urls']);
            indicators_store.quantity_parsed_urls=parseInt(data['quantity_parsed_urls']);
            indicators_store.quantity_urls_to_parsing=parseInt(data['quantity_urls_to_parsing']);
            indicators_store.quantity_found_products=parseInt(data['quantity_found_products']);
            indicators_store.continue_creating=parseInt(data['continue_creating']);
            indicators_store.quantity_downloaded_from_our_PL=parseInt(data['quantity_downloaded_from_our_PL']);
            indicators_store.goods_uploaded=parseInt(data['goods_uploaded']);
            indicators_store.status_updating=parseInt(data['status_updating']);
            indicators_store.time_of_start_updating=parseInt(data['time_of_start_updating']);
            indicators_store.time_of_end_updating=parseInt(data['time_of_end_updating']);
            indicators_store.quantiti_products_in_our_shop=parseInt(data['quantiti_products_in_our_shop']);
            indicators_store.memory_usage=parseInt(data['memory_usage']);
            indicators_store.last_updated=parseInt(data['last_updated']);
            indicators_store.next_url_to_updating=data['next_url_to_updating'];
            indicators_store.update_all();
            return ;
        }
    });
    },
    update_all:function () {
        $('#quantity_urls').html(indicators_store.quantity_urls);
        $('#quantity_parsed_urls').html(indicators_store.quantity_parsed_urls);
        $('#quantity_urls_to_parsing').html(indicators_store.quantity_urls_to_parsing);
        $('#quantity_found_products').html(indicators_store.quantity_found_products);
        $('#updated_products').html(indicators_store.updated_products);
        $('#quantity_downloaded_from_our_PL').html(indicators_store.quantity_downloaded_from_our_PL);
        $('#goods_uploaded').html(indicators_store.goods_uploaded);
        $('#memory_usage').html((indicators_store.memory_usage/1000000).toLocaleString('ru'));
        $('#next_url_to_updating a').attr('href',indicators_store.next_url_to_updating);


        if(indicators_store.status_updating==1){
            $('#progress_quantity_parsed_urls').addClass('active');
            $('#progress_goods_uploaded').removeClass('active');
            $('#progress_quantity_downloaded_from_our_PL').removeClass('active');
            $('#status_updating').html('Загрузка товаров');
        }else if(indicators_store.status_updating==2){
            $('#progress_quantity_parsed_urls').removeClass('active');
            $('#progress_updated_products_information').addClass('active');
            $('#progress_quantity_downloaded_from_our_PL').removeClass('active');
            $('#status_updating').html('Загрузка наших товаров');
            $('#updated_products_information_time').html('Осталось '+timer(indicators_store.updated_products_information_time*indicators_store.quantity_products/indicators_store.updated_products_information));
        }else if(indicators_store.status_updating==3){
            $('#progress_quantity_parsed_urls').removeClass('active');
            $('#progress_updated_products_information').removeClass('active');
            $('#progress_quantity_downloaded_from_our_PL').addClass('active');
            $('#status_updating').html('Выборка новых продуктов');
        }else if(indicators_store.status_updating==4){
            $('#progress_quantity_parsed_urls').removeClass('active');
            $('#progress_quantity_downloaded_from_our_PL').removeClass('active');
            $('#progress_goods_uploaded').addClass('active');
            $('#status_updating').html('Загрузка новых товаров');
            $('#uploaded_products_time').html('Готово за '+timer(indicators_store.uploaded_products_time));
            $('#updated_products_information_time').html('Закончено за '+timer(indicators_store.updated_products_information_time));
            $('#updated_products_time').html('Закончено за '+timer(indicators_store.updated_products_time));
        }else if(indicators_store.status_updating==10 || indicators_store.status_updating==0){
            $('#progress_quantity_parsed_urls').removeClass('active');
            $('#progress_quantity_downloaded_from_our_PL').removeClass('active');
            $('#progress_goods_uploaded').removeClass('active');
            $('#status_updating').html('Закончено');
            $('#time_from_start').html('Готово за '+timer(indicators_store.time_of_end_updating-indicators_store.time_of_start_updating));
        }

        if(indicators_store.continue_creating==1){
            $('#continue_creating').html('В процессе обновления');
        }else if(indicators_store.continue_creating==2) {
            $('#continue_creating').html('Обновление приостановлено');
        }else if(indicators_store.continue_creating==0){
            $('#continue_creating').html('Обновление выключено');
        }else if(indicators_store.continue_creating==10){
            $('#continue_creating').html('Процесс завершен');
            end_of_updating();
            clearTimeout(timers.live_indicators);
        }

        $('#progress_quantity_parsed_urls div').width(100*indicators_store.quantity_parsed_urls/indicators_store.quantity_urls+'%');
        $('#progress_goods_uploaded div').width(100*indicators_store.goods_uploaded/indicators_store.quantity_found_products+'%');
        $('#progress_quantity_downloaded_from_our_PL div').width(100*indicators_store.quantity_downloaded_from_our_PL/indicators_store.quantiti_products_in_our_shop+'%');

        $('#time_from_start').html(timer(Math.floor(Date.now()/1000)-indicators_store.time_of_start_updating));
        $('#time_last_updated').html(timer(Math.floor(Date.now()/1000)-indicators_store.last_updated+2));
        /*
        $('#progress_updated_products div').width(100*indicators_store.updated_products/indicators_store.quantity_products+'%');
        $('#time_to_end').html(timer(Math.floor(((Math.floor(Date.now()/1000)-indicators_store.time_of_start_updating)/(indicators_store.uploaded_products+indicators_store.updated_products_information+indicators_store.updated_products))*indicators_store.quantity_products*3)
        ));
        */
    }

}
function live_indicators() {
    indicators_store.get_indicators();
    timers.live_indicators = setTimeout("live_indicators()",1100);

}
var timers = {
    live_indicators:0
}


function dop_z(varr){
    if(varr<=9 && varr>=0){
        return ('0'+varr);
    }
    return varr;
}
function timer(time_in_second) {
    var edd=0,edh=0,edm=0,eds=0;
    var time='';

    eds=time_in_second;
    while((eds/60)>=1){
        edm+=Math.floor(eds/60);
        eds=Math.floor(eds%60);
    }
    while((edm/60)>=1){
        edh+=Math.floor(edm/60);;
        edm=Math.floor(edm%60);
    }
    while((edh/24)>=1){
        edd+=Math.floor(edh/24);
        edh=Math.floor(edh%24);
    }

    time =  dop_z(edd) + ':' +dop_z(edh) + ':' + dop_z(edm) + ':'+dop_z(eds);

    return time;
}

function create_record(plase, text){
    var record = document.createElement('div');
    record.className = 'well added_record';
    record.innerHTML = text;
    $(plase).prepend(record);
};
$('#errors').on("click", '#delete_product',function(){
    indicators.count_errors.down();
    var id = $(this).data(id);
    ajax.add_to_remove_product(id.id);
    $(this).parent().remove(500);
});
$('#err').on("click", function(){
    load_start();
    $('.added_record').remove();
    get.errors();
});
function load_start(){
    $('#content').css({opacity:0.5});
    $('#loader').fadeIn( 200, "linear")
}
function load_finish(){
    $('#loader').fadeOut( 100, "linear");
    $('#content').css({opacity:1});
}
function start_creating(){
    $('#continue_buttons').show();
    $('#start_buttons').hide();
    live_indicators();
}
function end_of_updating() {
    $('#continue_buttons').hide();
    $('#start_buttons').show();
}
$('#startupdating').on("click", function(){
    start_creating();
    var checked_inputs=[];
    if($("#update_magia-sveta").is(':checked')){
        checked_inputs.push('http://magia-sveta.ru/');
    }
    if($("#update_antares").is(':checked')){
        checked_inputs.push('http://antares-svet.ru/');
    }
    if($("#update_electra").is(':checked')){
        checked_inputs.push('http://www.electra.ru/');
    }
    creator.start_creating(JSON.stringify(checked_inputs));
});
$('#startspider').on("click", function(){
    start_creating();
    var checked_inputs=[];
    if($("#update_magia-sveta").is(':checked')){
        checked_inputs.push('http://magia-sveta.ru/');
    }
    if($("#update_antares").is(':checked')){
        checked_inputs.push('http://antares-svet.ru/');
    }
    if($("#update_electra").is(':checked')){
        checked_inputs.push('http://www.electra.ru/');
    }
    creator.start_spider(JSON.stringify(checked_inputs));
});
$('#upload_our_PL').on("click", function(){
    start_creating();
    creator.upload_our_PL();
});
$('#start_spider').on("click", function(){
    start_creating();
    creator.start_creating();
});
$('#create_new_products').on("click", function(){
    start_creating();
    creator.create_new_products();
});
$('#clear_all').on("click", function(){
    creator.clear_all();
    indicators_store.get_indicators();
});
$('#continue_updating').on("click", function(){
    creator.contiune();
});
$('#pause_updating').on("click", function(){
    creator.pause();
});
$('#stop_updating').on("click", function(){
    end_of_updating();
    creator.stop();
});

indicators_store.get_indicators();
setTimeout(function () {
    if(indicators_store.continue_creating==0){
        $('#continue_buttons').hide();
    }else{
        $('#start_buttons').hide();
        live_indicators();
    }

    load_finish();
},500);


//
//
//
//
//
//
//
//
//
//



/**
 * Created by vlad- on 29.07.2017.
 */

var parser={
    update_PL: function () {
        var i= $.ajax({
            type:'post',
            url:'updating.php',//url адрес файла обработчика
            cache: false,
            data:{'what_to_do':'update_PL'},//параметры запроса
            response:'text',//тип возвращаемого ответа text либо xml
            async:true,
            error: function(){
                console.log('ajax error on getting')
            },
            success:function (data) {//возвращаемый результат от сервера
                console.log(data);
            }
        });
        i.abort();
    },
    update_PI: function () {
        var i= $.ajax({
            type:'post',//тип запроса: get,post либо head
            url:'updating.php',//url адрес файла обработчика
            cache: false,
            data:{'what_to_do':'update_PI'},//параметры запроса
            response:'text',//тип возвращаемого ответа text либо xml
            async:true,
            error: function(){
                console.log('ajax error on getting')
            },
            success:function (data) {//возвращаемый результат от сервера
                console.log(data);
            }
        });
        i.abort();
    },
    upload_PL: function () {
        var i= $.ajax({
            type:'post',//тип запроса: get,post либо head
            url:'updating.php',//url адрес файла обработчика
            cache: false,
            data:{'what_to_do':'upload_PL'},//параметры запроса
            response:'text',//тип возвращаемого ответа text либо xml
            async:true,
            error: function(){
                console.log('ajax error on getting')
            },
            success:function (data) {//возвращаемый результат от сервера
                console.log(data);
            }
        });
        i.abort();
    },
    startparsing: function () {
        var i= $.ajax({
            type:'post',//тип запроса: get,post либо head
            url:'updating.php',//url адрес файла обработчика
            cache: false,
            data:{'what_to_do':'update_product'},//параметры запроса
            response:'text',//тип возвращаемого ответа text либо xml
            async:true,
            success:function (data) {//возвращаемый результат от сервера
                console.log(data);
            }
        });
        i.abort();
    },
    stop: function () {
        $.ajax({
            type:'post',//тип запроса: get,post либо head
            url:'status.php',//url адрес файла обработчика
            cache: false,
            data:{'what_to_do':'stop_parsing'},//параметры запроса
            response:'text',//тип возвращаемого ответа text либо xml
            async:true,
            error: function(){
                console.log('ajax error on getting')
            },
            success:function (data) {//возвращаемый результат от сервера
                console.log(data);
            }
        });
    },
    pause: function () {
        $.ajax({
            type:'post',//тип запроса: get,post либо head
            url:'status.php',//url адрес файла обработчика
            cache: false,
            data:{'what_to_do':'pause_parsing'},//параметры запроса
            response:'text',//тип возвращаемого ответа text либо xml
            async:true,
            error: function(){
                console.log('ajax error on getting')
            },
            success:function (data) {//возвращаемый результат от сервера
                console.log(data);
            }
        });
    },
    contiune: function () {
        $.ajax({
            type:'post',//тип запроса: get,post либо head
            url:'status.php',//url адрес файла обработчика
            cache: false,
            data:{'what_to_do':'continue_parsing'},//параметры запроса
            response:'text',//тип возвращаемого ответа text либо xml
            async:true,
            error: function(){
                console.log('ajax error on getting')
            },
            success:function (data) {//возвращаемый результат от сервера
                console.log(data);
            }
        });
    }


}
var indicators_store={
    quantiti_products:0,
    quantiti_errors:0,
    uploaded_products:0,
    updated_products_information:0,
    updated_products:0,
    status_updating:0,
    status_step_updating:0,
    time_of_last_update:0,
    time_of_start_updating:0,
    uploaded_products_time:0,
    updated_products_information_time:0,
    updated_products_time:0,
    update_all:function () {
        $('#up_quantiti_products').html(indicators_store.quantiti_products);
        $('#count_errors').html(indicators_store.quantiti_errors);
        $('#up_uploaded_products').html(indicators_store.uploaded_products);
        $('#up_updated_products_information').html(indicators_store.updated_products_information);
        $('#up_updated_products').html(indicators_store.updated_products);


        if(indicators_store.status_step_updating==1){
            $('#up_progress_uploaded_products').addClass('active');
            $('#up_progress_updated_products_information').removeClass('active');
            $('#up_progress_updated_products').removeClass('active');
            //$('#status_step_updating').html('Загрузка товаров');
            $('#up_uploaded_products_time').html('Осталось '+timer(indicators_store.uploaded_products_time*indicators_store.quantiti_products/indicators_store.uploaded_products));
            console.log(indicators_store.uploaded_products_time*indicators_store.quantiti_products/indicators_store.uploaded_products);
        }else if(indicators_store.status_step_updating==2){
            $('#up_progress_uploaded_products').removeClass('active');
            $('#up_progress_updated_products_information').addClass('active');
            $('#up_progress_updated_products').removeClass('active');
            //$('#status_step_updating').html('Обновление информации о товарах');
            $('#up_updated_products_information_time').html('Осталось '+timer(indicators_store.updated_products_information_time*indicators_store.quantiti_products/indicators_store.updated_products_information));
            $('#up_uploaded_products_time').html('Готово за '+timer(indicators_store.uploaded_products_time));
        }else if(indicators_store.status_step_updating==3){
            $('#up_progress_uploaded_products').removeClass('active');
            $('#up_progress_updated_products_information').removeClass('active');
            $('#up_progress_updated_products').addClass('active');
            ///$('#status_step_updating').html('Обновление товаров на сайте');
            $('#up_updated_products_time').html('Осталось '+timer(indicators_store.updated_products_time*indicators_store.quantiti_products/indicators_store.updated_products));
            $('#up_uploaded_products_time').html('Готово за '+timer(indicators_store.uploaded_products_time));
            $('#up_updated_products_information_time').html('Сделано за '+timer(indicators_store.updated_products_information_time));
        }else if(indicators_store.status_step_updating==0){
            $('#up_progress_uploaded_products').removeClass('active');
            $('#up_progress_updated_products_information').removeClass('active');
            $('#up_progress_updated_products').removeClass('active');
            //$('#status_step_updating').html('Обновление выключено');
            $('#up_uploaded_products_time').html('Готово за '+timer(indicators_store.uploaded_products_time));
            $('#up_updated_products_information_time').html('Закончено за '+timer(indicators_store.updated_products_information_time));
            $('#up_updated_products_time').html('Закончено за '+timer(indicators_store.updated_products_time));
        }
        if(indicators_store.status_updating==1){
            $('#up_status_updating').html('В процессе обновления');
        }else if(indicators_store.status_updating==2) {
            $('#up_status_updating').html('Обновление приостановлено');
        }else if(indicators_store.status_updating==0){
            $('#up_status_updating').html('Обновление выключено');
        }
        $('#up_progress_uploaded_products div').width(100*indicators_store.uploaded_products/indicators_store.quantiti_products+'%');
        $('#up_progress_updated_products_information div').width(100*indicators_store.updated_products_information/indicators_store.quantiti_products+'%');
        $('#up_progress_updated_products div').width(100*indicators_store.updated_products/indicators_store.quantiti_products+'%');
        $('#up_time_from_start').html(timer(Math.floor(Date.now()/1000)-indicators_store.time_of_start_updating));
        $('#up_time_to_end').html(timer(Math.floor(((Math.floor(Date.now()/1000)-indicators_store.time_of_start_updating)/(indicators_store.uploaded_products+indicators_store.updated_products_information+indicators_store.updated_products))*indicators_store.quantiti_products*3)
        ));
        //time_to_end();
        //timers.updating_indicators = setTimeout(indicators.update,2000);
    }

}
var get={
    indicators: function () {
        $.ajax({
            type:'post',//тип запроса: get,post либо head
            url:'status.php',//url адрес файла обработчика
            cache: false,
            data:{'what_to_do':'get_all_information'},//параметры запроса
            response:'text',//тип возвращаемого ответа text либо xml
            async:true,
            error: function(){
                console.log('ajax error on getting')
            },
            success:function (data) {
                data = jQuery.parseJSON(data);
                indicators_store.quantiti_products=parseInt(data['quantiti_products']);
                indicators_store.quantiti_errors=parseInt(data['quantiti_errors']);
                indicators_store.uploaded_products=parseInt(data['uploaded_products']);
                indicators_store.updated_products_information=parseInt(data['updated_products_information']);
                indicators_store.updated_products=parseInt(data['updated_products']);
                indicators_store.status_updating=parseInt(data['status_updating']);
                indicators_store.status_step_updating=parseInt(data['status_step_updating']);
                indicators_store.time_of_last_update=parseInt(data['time_of_last_update']);
                indicators_store.time_of_start_updating=parseInt(data['time_of_start_updating']);
                indicators_store.uploaded_products_time=parseInt(data['uploaded_products_time']);
                indicators_store.updated_products_information_time=parseInt(data['updated_products_information_time']);
                indicators_store.updated_products_time=parseInt(data['updated_products_time']);
                return ;
            }
        });
        //timers.uploading_indicators = setTimeout(get.indicators,2000);
    },
    errors: function () {
        $.ajax({
            type:'post',//тип запроса: get,post либо head
            url:'status.php',//url адрес файла обработчика
            cache: false,
            data:{'what_to_do':'get_errors'},//параметры запроса
            response:'text',//тип возвращаемого ответа text либо xml
            async:true,
            error: function(){
                console.log('ajax error on getting')
            },
            success:function (data) {//возвращаемый результат от сервера
                data = jQuery.parseJSON(data);
                for (var i = 0; i < data.length; i++) {
                    var error_product = '№' + (i + 1) + ' При обновлении <a href="' +
                        data[i]['product_url'] + '" target="_blank">товара</a> с id = ' +
                        data[i]['product_id'] + ', от <a href="' + data[i]['parsing_url'] + '" target="_blank">поставщика</a> выдал ошибку: ' +
                        data[i]['text'] + ' <button class="btn btn-danger" id="delete_product" data-id="' + data[i]['product_id'] + '">удалить?</button>'
                    create_record('#errors', error_product);
                }
                load_finish();
            }
        });
    }
}
var indicators={
    count_errors:{
        value:0,
        set: function (a) {
            this.value=a;
            $('#count_errors').html(this.value);
        },
        down: function () {
            this.value-=1;
            $('#count_errors').html(this.value);
        }

    }

}
function live_indicators() {
    get.indicators();
    indicators_store.update_all();
    timers.live_indicators = setTimeout(live_indicators,2000);

}
var timers = {
    live_indicators:0
}
var ajax = {
    add_to_remove_product: function (id) {
        $.ajax({
            type: 'post',//тип запроса: get,post либо head
            url: 'status.php',//url адрес файла обработчика
            cache: false,
            data: {'what_to_do': 'add_to_remove_product', 'product_id': id},//параметры запроса
            response: 'text',//тип возвращаемого ответа text либо xml
            async: true,
            success: function (data) {//возвращаемый результат от сервера
                return;
            }
        });
    },
    remove_product: function (id) {
        $.ajax({
            type: 'post',//тип запроса: get,post либо head
            url: 'parser/products.php',//url адрес файла обработчика
            cache: false,
            data: {'what_to_do': 'remove_product', 'product_id': id},//параметры запроса
            response: 'text',//тип возвращаемого ответа text либо xml
            async: true,
            success: function (data) {//возвращаемый результат от сервера
                return;
            }
        });
    }
};


function dop_z(varr){
    if(varr<=9 && varr>=0){
        return ('0'+varr);
    }
    return varr;
}

function ClearСlock() {
    clearTimeout(clocktimer);
    clearTimeout(clocktimerback);
    h=1;m=1;tm=1;s=0;ts=0;ms=0;
    init=0;
    readout='00:00:00.00';
    $('#indicators_plase_mini_clock').html(readout);
}
function timer(time_in_second) {
    var edd=0,edh=0,edm=0,eds=0;
    var time='';

    eds=time_in_second;
    while((eds/60)>=1){
        edm+=Math.floor(eds/60);
        eds=Math.floor(eds%60);
    }
    while((edm/60)>=1){
        edh+=Math.floor(edm/60);;
        edm=Math.floor(edm%60);
    }
    while((edh/24)>=1){
        edd+=Math.floor(edh/24);
        edh=Math.floor(edh%24);
    }

    time =  dop_z(edd) + ':' +dop_z(edh) + ':' + dop_z(edm) + ':'+dop_z(eds);

    return time;
}
//Функция запуска и остановки
function StartStop() {
    if (init==0){
        ClearСlock();
        time_to_end();
        dateObj = new Date();
        StartTIME();
        init=1;
    } else {
        clearTimeout(clocktimer);
        clearTimeout(clocktimerback);
        init=0;
    }
}
function create_record(plase, text){
    var record = document.createElement('div');
    record.className = 'well added_record';
    record.innerHTML = text;
    $(plase).prepend(record);
};
$('#errors').on("click", '#delete_product',function(){
    indicators.count_errors.down();
    var id = $(this).data(id);
    ajax.add_to_remove_product(id.id);
    $(this).parent().remove(500);
});
$('#err').on("click", function(){
    load_start();
    $('.added_record').remove();
    get.errors();
});
function load_start(){
    $('#content').css({opacity:0.5});
    $('#loader').fadeIn( 200, "linear")
}
function load_finish(){
    $('#loader').fadeOut( 100, "linear");
    $('#content').css({opacity:1});
}
function start_parsing(){
    $('#continue_buttons').show();
    $('#start_buttons').hide();
    live_indicators();
}
function end_of_updating() {
    $('#continue_buttons').hide();
    $('#start_buttons').show();
}
$('#up_startparsing').on("click", function(){
    start_parsing();
    parser.startparsing();
});
$('#up_update_PL').on("click", function(){
    start_parsing();
    parser.update_PL();
});
$('#up_update_PI').on("click", function(){
    start_parsing();
    parser.update_PI();
});
$('#up_upload_PL').on("click", function(){
    start_parsing();
    parser.upload_PL();
});
$('#up_continue_updating').on("click", function(){
    parser.contiune();
});
$('#up_pause_updating').on("click", function(){
    parser.pause();
});
$('#up_stop_updating').on("click", function(){
    end_of_updating();
    parser.stop();
});
function on_load_page() {
    $.ajax({
        type:'post',//тип запроса: get,post либо head
        url:'status.php',//url адрес файла обработчика
        cache: false,
        data:{'what_to_do':'get_all_information'},//параметры запроса
        response:'text',//тип возвращаемого ответа text либо xml
        async:true,
        error: function(){
            console.log('ajax error on getting')
        },
        success:function (data) {
            data = jQuery.parseJSON(data);
            indicators_store.quantiti_products=parseInt(data['quantiti_products']);
            indicators_store.quantiti_errors=parseInt(data['quantiti_errors']);
            indicators_store.uploaded_products=parseInt(data['uploaded_products']);
            indicators_store.updated_products_information=parseInt(data['updated_products_information']);
            indicators_store.updated_products=parseInt(data['updated_products']);
            indicators_store.status_updating=parseInt(data['status_updating']);
            indicators_store.status_step_updating=parseInt(data['status_step_updating']);
            indicators_store.time_of_last_update=parseInt(data['time_of_last_update']);
            indicators_store.time_of_start_updating=parseInt(data['time_of_start_updating']);
            indicators_store.update_all();
            if(data['status_updating']==0){
                $('#continue_buttons').hide();
            }else{
                $('#start_buttons').hide();
                live_indicators();
            }

            load_finish();
            return ;
        }
    });
}
on_load_page();