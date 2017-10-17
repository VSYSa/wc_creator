/**
 * Created by vlad- on 29.07.2017.
 */

var creator={
    start_creating: function ($str) {
        var i= $.ajax({
            type:'post',//тип запроса: get,post либо head
            url:'main/creator.php',//url адрес файла обработчика
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
            url:'main/creator.php',//url адрес файла обработчика
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
            url:'main/creator.php',//url адрес файла обработчика
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
            url:'main/creator.php',//url адрес файла обработчика
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
            url:'status/cr_status.php',//url адрес файла обработчика
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
            url:'status/cr_status.php',//url адрес файла обработчика
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
            url:'status/cr_status.php',//url адрес файла обработчика
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
            url:'status/cr_status.php',//url адрес файла обработчика
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
var cr_indicators_store={
        cr_quantity_urls:0,
        cr_quantiti_errors:0,
        cr_quantity_parsed_urls:0,
        cr_quantity_urls_to_parsing:0,
        cr_quantity_found_products:0,
        cr_continue_creating:0,
        cr_status_updating:0,
        cr_goods_uploaded:0,
        time_of_start_updating:0,
        time_of_end_updating:0,
        cr_quantity_downloaded_from_our_PL:0,
        quantiti_products_in_our_shop:0,
        cr_memory_usage:0,
        last_updated:0,
        cr_next_url_to_updating:'',
        get_indicators: function () {
        $.ajax({
            type:'post',//тип запроса: get,post либо head
            url:'status/cr_status.php',//url адрес файла обработчика
            cache: false,
            data:{'what_to_do':'get_all_information'},//параметры запроса
            response:'text',//тип возвращаемого ответа text либо xml
            async:true,
            error: function(){
                console.log('ajax error on getting')
            },
            success:function (data) {
                data = jQuery.parseJSON(data);
                cr_indicators_store.cr_quantity_urls=parseInt(data['quantity_urls']);
                cr_indicators_store.cr_quantiti_errors=parseInt(data['quantiti_errors']);
                cr_indicators_store.cr_quantity_parsed_urls=parseInt(data['quantity_parsed_urls']);
                cr_indicators_store.cr_quantity_urls_to_parsing=parseInt(data['quantity_urls_to_parsing']);
                cr_indicators_store.cr_quantity_found_products=parseInt(data['quantity_found_products']);
                cr_indicators_store.cr_continue_creating=parseInt(data['continue_creating']);
                cr_indicators_store.cr_quantity_downloaded_from_our_PL=parseInt(data['quantity_downloaded_from_our_PL']);
                cr_indicators_store.cr_goods_uploaded=parseInt(data['goods_uploaded']);
                cr_indicators_store.cr_status_updating=parseInt(data['status_updating']);
                cr_indicators_store.time_of_start_updating=parseInt(data['time_of_start_updating']);
                cr_indicators_store.time_of_end_updating=parseInt(data['time_of_end_updating']);
                cr_indicators_store.quantiti_products_in_our_shop=parseInt(data['quantiti_products_in_our_shop']);
                cr_indicators_store.cr_memory_usage=parseInt(data['memory_usage']);
                cr_indicators_store.last_updated=parseInt(data['last_updated']);
                cr_indicators_store.cr_next_url_to_updating=data['next_url_to_updating'];
                cr_indicators_store.update_all();
                return ;
            }
        });
    },
        update_all:function () {
            $('#cr_quantity_urls').html(cr_indicators_store.cr_quantity_urls);
            $('#cr_count_errors').html(cr_indicators_store.cr_quantiti_errors);
            $('#cr_quantity_parsed_urls').html(cr_indicators_store.cr_quantity_parsed_urls);
            $('#cr_quantity_urls_to_parsing').html(cr_indicators_store.cr_quantity_urls_to_parsing);
            $('#cr_quantity_found_products').html(cr_indicators_store.cr_quantity_found_products);
            $('#updated_products').html(cr_indicators_store.updated_products);
            $('#cr_quantity_downloaded_from_our_PL').html(cr_indicators_store.cr_quantity_downloaded_from_our_PL);
            $('#cr_goods_uploaded').html(cr_indicators_store.cr_goods_uploaded);
            $('#cr_memory_usage').html((cr_indicators_store.cr_memory_usage/1000000).toLocaleString('ru'));
            $('#cr_next_url_to_updating a').attr('href',cr_indicators_store.cr_next_url_to_updating);
    
    
            if(cr_indicators_store.cr_status_updating==1){
                $('#cr_progress_quantity_parsed_urls').addClass('active');
                $('#cr_progress_goods_uploaded').removeClass('active');
                $('#cr_progress_quantity_downloaded_from_our_PL').removeClass('active');
                $('#cr_status_updating').html('Загрузка товаров');
            }else if(cr_indicators_store.cr_status_updating==2){
                $('#cr_progress_quantity_parsed_urls').removeClass('active');
                $('#cr_progress_updated_products_information').addClass('active');
                $('#cr_progress_quantity_downloaded_from_our_PL').removeClass('active');
                $('#cr_status_updating').html('Загрузка наших товаров');
                $('#updated_products_information_time').html('Осталось '+timer(cr_indicators_store.updated_products_information_time*cr_indicators_store.quantity_products/cr_indicators_store.updated_products_information));
            }else if(cr_indicators_store.cr_status_updating==3){
                $('#cr_progress_quantity_parsed_urls').removeClass('active');
                $('#cr_progress_updated_products_information').removeClass('active');
                $('#cr_progress_quantity_downloaded_from_our_PL').addClass('active');
                $('#cr_status_updating').html('Выборка новых продуктов');
            }else if(cr_indicators_store.cr_status_updating==4){
                $('#cr_progress_quantity_parsed_urls').removeClass('active');
                $('#cr_progress_quantity_downloaded_from_our_PL').removeClass('active');
                $('#cr_progress_goods_uploaded').addClass('active');
                $('#cr_status_updating').html('Загрузка новых товаров');
                $('#cr_uploaded_products_time').html('Готово за '+timer(cr_indicators_store.cr_uploaded_products_time));
                $('#updated_products_information_time').html('Закончено за '+timer(cr_indicators_store.updated_products_information_time));
                $('#cr_updated_products_time').html('Закончено за '+timer(cr_indicators_store.cr_updated_products_time));
            }else if(cr_indicators_store.cr_status_updating==10 || cr_indicators_store.cr_status_updating==0){
                $('#cr_progress_quantity_parsed_urls').removeClass('active');
                $('#cr_progress_quantity_downloaded_from_our_PL').removeClass('active');
                $('#cr_progress_goods_uploaded').removeClass('active');
                $('#cr_status_updating').html('Закончено');
                $('#cr_time_from_start').html('Готово за '+timer(cr_indicators_store.time_of_end_updating-cr_indicators_store.time_of_start_updating));
            }
    
            if(cr_indicators_store.cr_continue_creating==1){
                $('#cr_continue_creating').html('В процессе обновления');
                start_creating();
            }else if(cr_indicators_store.cr_continue_creating==2) {
                $('#cr_continue_creating').html('Обновление приостановлено');
                start_creating();
            }else if(cr_indicators_store.cr_continue_creating==0){
                $('#cr_continue_creating').html('Обновление выключено');
                end_of_creating();
            }else if(cr_indicators_store.cr_continue_creating==10){
                $('#cr_continue_creating').html('Процесс завершен');
                end_of_creating();
            }else{
                start_creating();
            }
    
            $('#cr_progress_quantity_parsed_urls div').width(100*cr_indicators_store.cr_quantity_parsed_urls/cr_indicators_store.cr_quantity_urls+'%');
            $('#cr_progress_goods_uploaded div').width(100*cr_indicators_store.cr_goods_uploaded/cr_indicators_store.cr_quantity_found_products+'%');
            $('#cr_progress_quantity_downloaded_from_our_PL div').width(100*cr_indicators_store.cr_quantity_downloaded_from_our_PL/cr_indicators_store.quantiti_products_in_our_shop+'%');
    
            $('#cr_time_from_start').html(timer(Math.floor(Date.now()/1000)-cr_indicators_store.time_of_start_updating));
            $('#cr_time_last_updated').html(timer(Math.floor(Date.now()/1000)-cr_indicators_store.last_updated+2));
            /*
            $('#progress_updated_products div').width(100*cr_indicators_store.updated_products/cr_indicators_store.quantity_products+'%');
            $('#time_to_end').html(timer(Math.floor(((Math.floor(Date.now()/1000)-cr_indicators_store.time_of_start_updating)/(cr_indicators_store.uploaded_products+cr_indicators_store.updated_products_information+cr_indicators_store.updated_products))*cr_indicators_store.quantity_products*3)
            ));
            */
        }
}


var cr_errors={

    get: function () {
        load_start();
        $('.dataTables_wrapper').remove();
        $.ajax({
            type:'post',//тип запроса: get,post либо head
            url:'status/cr_status.php',//url адрес файла обработчика
            cache: false,
            data:{'what_to_do':'get_errors'},//параметры запроса
            response:'text',//тип возвращаемого ответа text либо xml
            async:true,
            error: function(){
                console.log('ajax error on getting')
            },
            success:function (data) {//возвращаемый результат от сервера
                data = jQuery.parseJSON(data);

                create_record('#cr_errors', error_head('cr'));

                for (var i = 0; i < data.length; i++) {

                    create_record('#cr_errors_table_tbody', error_table(data[i],'cr'));
                }

                sorting_tables('#cr_errors_table');
                load_finish();
            }
        });
    },
    clear_all:function () {
        var i= $.ajax({
            type:'post',
            url:'status/cr_status.php',//url адрес файла обработчика
            cache: false,
            data:{'what_to_do':'clear_all_errors'},//параметры запроса
            response:'text',//тип возвращаемого ответа text либо xml
            async:true,
            error: function(){
                console.log('ajax error on posting')
            },
            success:function (data) {//возвращаемый результат от сервера
            }
        });
        i.abort();
    },
    count_errors: {
        value: 0,
        set: function (a) {
            this.value = a;
            $('#count_errors').html(this.value);
        },
        down: function () {
            this.value -= 1;
            $('#count_errors').html(this.value);
        }

    },
    clear_rows: function ($str) {
        $.ajax({
            type:'post',//тип запроса: get,post либо head
            url:'status/cr_status.php',//url адрес файла обработчика
            cache: false,
            data:{'what_to_do':'clear_errors_row','row_id':$str},//параметры запроса
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

$('#cr_errors_menu').on("click", function(){
    cr_errors.get();
    cr_click_btn();
});
$('#cr_errors_refresh').on("click", function(){
    cr_errors.get();
    cr_click_btn();
});
$('#cr_errors_clear').on("click", function(){
    load_start();

    var selected =$('#cr_errors .selected');
    if (selected.length != 0) {
        cr_errors.clear_rows(JSON.stringify(clear_errors_row(selected)));
    } else if(confirm('Do yo want remove all rows of error log?')){
        cr_errors.clear_all();
    }
    cr_errors.get();
    cr_click_btn();
});

function cr_live_indicators() {
    cr_indicators_store.get_indicators();

}
var cr_timers = {
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

function cr_click_btn(time = 500){
    load_start();
    setTimeout(cr_indicators_store.get_indicators,time);
    setTimeout(load_finish,time+100);
}


function start_creating(){
    $('#cr_continue_buttons').show();
    $('#cr_start_buttons').hide();
    if(cr_timers.live_indicators===0){
        cr_timers.live_indicators = setInterval(cr_live_indicators,1100);
    }
}
function end_of_creating() {
    $('#cr_continue_buttons').hide();
    $('#cr_start_buttons').show();
    clearInterval(cr_timers.live_indicators);
    cr_timers.live_indicators=0;
}
$('#cr_startupdating').on("click", function(){
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
    cr_click_btn();
});
$('#cr_startspider').on("click", function(){

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
    cr_click_btn();
});
$('#cr_upload_our_PL').on("click", function(){
    creator.upload_our_PL();
    cr_click_btn();
});
$('#cr_start_spider').on("click", function(){
    creator.start_spider();
    cr_click_btn();
});
$('#cr_create_new_products').on("click", function(){
    creator.create_new_products();
    cr_click_btn();
});
$('#cr_update_info').on("click", function(){
        cr_click_btn()
});
$('#cr_clear_all').on("click", function(){
    creator.clear_all();
    cr_click_btn();
});
$('#cr_continue_updating').on("click", function(){
    creator.contiune();
    cr_click_btn();
});
$('#cr_pause_updating').on("click", function(){
    creator.pause();
    cr_click_btn();
});
$('#cr_stop_updating').on("click", function(){
    creator.stop();
    cr_click_btn();
});

cr_indicators_store.get_indicators();


