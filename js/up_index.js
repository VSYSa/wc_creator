/**
 * Created by vlad- on 29.07.2017.
 */

var updator={
    update_PL: function () {
        var i= $.ajax({
            type:'post',
            url:'main/updator.php',//url адрес файла обработчика
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
            url:'main/updator.php',//url адрес файла обработчика
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
            url:'main/updator.php',//url адрес файла обработчика
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
            url:'main/updator.php',//url адрес файла обработчика
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
            url:'status/up_status.php',//url адрес файла обработчика
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
            url:'status/up_status.php',//url адрес файла обработчика
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
            url:'status/up_status.php',//url адрес файла обработчика
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
var up_indicators_store={
        up_quantiti_products:0,
        up_quantiti_errors:0,
        up_uploaded_products:0,
        up_updated_products_information:0,
        up_updated_products:0,
        up_status_updating:0,
        up_status_step_updating:0,
        up_time_of_last_update:0,
        up_time_of_start_updating:0,
        up_uploaded_products_time:0,
        up_updated_products_information_time:0,
        up_updated_products_time:0,
        get_indicators: function () {
            $.ajax({
                type:'post',//тип запроса: get,post либо head
                url:'status/up_status.php',//url адрес файла обработчика
                cache: false,
                data:{'what_to_do':'get_all_information'},//параметры запроса
                response:'text',//тип возвращаемого ответа text либо xml
                async:true,
                error: function(){
                    console.log('ajax error on getting')
                },
                success:function (data) {
                    data = jQuery.parseJSON(data);
                    up_indicators_store.up_quantiti_products=parseInt(data['quantiti_products']);
                    up_indicators_store.up_quantiti_errors=parseInt(data['quantiti_errors']);
                    up_indicators_store.up_uploaded_products=parseInt(data['uploaded_products']);
                    up_indicators_store.up_updated_products_information=parseInt(data['updated_products_information']);
                    up_indicators_store.up_updated_products=parseInt(data['updated_products']);
                    up_indicators_store.up_status_updating=parseInt(data['status_updating']);
                    up_indicators_store.up_status_step_updating=parseInt(data['status_step_updating']);
                    up_indicators_store.up_time_of_last_update=parseInt(data['time_of_last_update']);
                    up_indicators_store.up_time_of_start_updating=parseInt(data['time_of_start_updating']);
                    up_indicators_store.up_uploaded_products_time=parseInt(data['uploaded_products_time']);
                    up_indicators_store.up_updated_products_information_time=parseInt(data['updated_products_information_time']);
                    up_indicators_store.up_updated_products_time=parseInt(data['updated_products_time']);
                    up_indicators_store.update_all();
                    return ;
                }
            });
        },
        update_all:function () {

            $('#up_quantiti_products').html(up_indicators_store.up_quantiti_products);
            $('#up_count_errors').html(up_indicators_store.up_quantiti_errors);
            $('#up_uploaded_products').html(up_indicators_store.up_uploaded_products);
            $('#up_updated_products_information').html(up_indicators_store.up_updated_products_information);
            $('#up_updated_products').html(up_indicators_store.up_updated_products);

            if(up_indicators_store.up_status_step_updating==1){
                $('#up_progress_uploaded_products').addClass('active');
                $('#up_progress_updated_products_information').removeClass('active');
                $('#up_progress_updated_products').removeClass('active');
                $('#up_uploaded_products_time').html('Осталось '+timer(up_indicators_store.up_uploaded_products_time*up_indicators_store.up_quantiti_products/up_indicators_store.up_uploaded_products));
                console.log(up_indicators_store.up_uploaded_products_time*up_indicators_store.up_quantiti_products/up_indicators_store.up_uploaded_products);
            }else if(up_indicators_store.up_status_step_updating==2){
                $('#up_progress_uploaded_products').removeClass('active');
                $('#up_progress_updated_products_information').addClass('active');
                $('#up_progress_updated_products').removeClass('active');
                $('#up_updated_products_information_time').html('Осталось '+timer(up_indicators_store.up_updated_products_information_time*up_indicators_store.up_quantiti_products/up_indicators_store.up_updated_products_information));
                $('#up_uploaded_products_time').html('Готово за '+timer(up_indicators_store.up_uploaded_products_time));
            }else if(up_indicators_store.up_status_step_updating==3){
                $('#up_progress_uploaded_products').removeClass('active');
                $('#up_progress_updated_products_information').removeClass('active');
                $('#up_progress_updated_products').addClass('active');
                $('#up_updated_products_time').html('Осталось '+timer(up_indicators_store.up_updated_products_time*up_indicators_store.up_quantiti_products/up_indicators_store.up_updated_products));
                $('#up_uploaded_products_time').html('Готово за '+timer(up_indicators_store.up_uploaded_products_time));
                $('#up_updated_products_information_time').html('Сделано за '+timer(up_indicators_store.up_updated_products_information_time));
            }else if(up_indicators_store.up_status_step_updating==0){
                $('#up_progress_uploaded_products').removeClass('active');
                $('#up_progress_updated_products_information').removeClass('active');
                $('#up_progress_updated_products').removeClass('active');
                $('#up_uploaded_products_time').html('Готово за '+timer(up_indicators_store.up_uploaded_products_time));
                $('#up_updated_products_information_time').html('Закончено за '+timer(up_indicators_store.up_updated_products_information_time));
                $('#up_updated_products_time').html('Закончено за '+timer(up_indicators_store.up_updated_products_time));
            }
            if(up_indicators_store.up_status_updating==1){
                $('#up_status_updating').html('В процессе обновления');
                up_start_updating();
            }else if(up_indicators_store.up_status_updating==2) {
                $('#up_status_updating').html('Обновление приостановлено');
                up_start_updating();
            }else if(up_indicators_store.up_status_updating==0){
                $('#up_status_updating').html('Обновление выключено');
                up_end_of_updating();
            }else if(up_indicators_store.up_status_updating==10) {
                $('#up_status_updating').html('Обновление закончено');
                up_end_of_updating();
            }
            $('#up_progress_uploaded_products div').width(100*up_indicators_store.up_uploaded_products/up_indicators_store.up_quantiti_products+'%');
            $('#up_progress_updated_products_information div').width(100*up_indicators_store.up_updated_products_information/up_indicators_store.up_quantiti_products+'%');
            $('#up_progress_updated_products div').width(100*up_indicators_store.up_updated_products/up_indicators_store.up_quantiti_products+'%');
            $('#up_time_from_start').html(timer(Math.floor(Date.now()/1000)-up_indicators_store.up_time_of_start_updating));
            $('#up_time_to_end').html(timer(Math.floor(((Math.floor(Date.now()/1000)-up_indicators_store.up_time_of_start_updating)/(up_indicators_store.up_uploaded_products+up_indicators_store.up_updated_products_information+up_indicators_store.up_updated_products))*up_indicators_store.up_quantiti_products*3)
            ));
            //time_to_end();
            //timers.updating_indicators = setTimeout(indicators.update,2000);
        }

}

var up_errors={

    get: function () {
        load_start();
        $('.dataTables_wrapper').remove();
        $.ajax({
            type:'post',//тип запроса: get,post либо head
            url:'status/up_status.php',//url адрес файла обработчика
            cache: false,
            data:{'what_to_do':'get_errors'},//параметры запроса
            response:'text',//тип возвращаемого ответа text либо xml
            async:true,
            error: function(){
                console.log('ajax error on getting')
            },
            success:function (data) {//возвращаемый результат от сервера
                data = jQuery.parseJSON(data);

                create_record('#up_errors', '<table id="up_errors_table" >                    <thead><tr><th>ID</th><th>Time</th><th>Code</th><th>Message</th><th>Link</th><th>Shop</th></tr></thead>                    <tfoot><tr ><th>ID</th><th>Time</th><th>Code</th><th>Message</th><th>Link</th><th>Shop</th></tr></tfoot>                    <tbody id="up_errors_table_tbody"> </tbody>                    </table>');


                    for (var i = 0; i < data.length; i++) {
                        var up_error_product ='<tr class="up_added_row_of_error_table">'+
                                '<td>'+data[i]['id']+'</td>'+
                                '<td>'+moment(data[i]['time']*1000).format("DD-MM-YYYY h:mm:ss")+'</td>'+
                                '<td>'+data[i]['error_code']+'</td>'+
                                '<td>'+data[i]['data']+'</td>'+
                                '<td> <a href="'+data[i]['url']+'" target="_blank" class="btn btn-info btn-lg"><span class="glyphicon glyphicon-link"></span> Link  </a></td>'+
                                '<td>'+data[i]['shop']+'</td>'+'</tr>';
                        create_record('#up_errors_table_tbody', up_error_product);



                    }

                sorting_tables('#up_errors_table')
                load_finish();
            }
        });
    },
    clear_all:function () {
        var i= $.ajax({
            type:'post',
            url:'status/up_status.php',//url адрес файла обработчика
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

$('#up_errors_menu').on("click", function(){
    up_errors.get();
});
$('#up_errors_refresh').on("click", function(){
    up_errors.get();
});
$('#up_errors_clearall').on("click", function(){
    up_errors.clear_all();
});

function up_live_indicators() {
    up_indicators_store.get_indicators();

}

var up_timers = {
    live_indicators:0
}
/*
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
*/

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
function StartStop(plase) {
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
    var record = document.createElement('tr');
    record.className = 'well added_record';
    record.innerHTML = text;
    //$(plase).append(record);
    $(text).appendTo(plase);
};
function sorting_tables(plase) {
    // Setup - add a text input to each footer cell
    $(plase+' tfoot th').each( function () {
        var title = $(this).text();
        $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
    } );

    // DataTable
    var table = $(plase).DataTable();

    // Apply the search
    table.columns().every( function () {
        var that = this;

        $( 'input', this.footer() ).on( 'keyup change', function () {
            if ( that.search() !== this.value ) {
                that
                    .search( this.value )
                    .draw();
            }
        } );
    } );
}
function up_start_updating(){
    $('#up_continue_buttons').show();
    $('#up_start_buttons').hide();
    if(up_timers.live_indicators===0){
        up_timers.live_indicators = setInterval(up_live_indicators,2000);
    }
}
function up_end_of_updating() {
    $('#up_continue_buttons').hide();
    $('#up_start_buttons').show();
    clearInterval(up_timers.live_indicators);
    up_timers.live_indicators=0;
}
$('#up_update_info').on("click", function(){
    up_click_btn()
});
$('#up_startparsing').on("click", function(){
    up_click_btn();
    updator.startparsing();
});
$('#up_update_PL').on("click", function(){
    up_click_btn();
    updator.update_PL();
});
$('#up_update_PI').on("click", function(){
    up_click_btn();
    updator.update_PI();
});
$('#up_upload_PL').on("click", function(){
    up_click_btn();
    updator.upload_PL();
});
$('#up_continue_updating').on("click", function(){
    up_click_btn();
    updator.contiune();
});
$('#up_pause_updating').on("click", function(){
    up_click_btn();
    updator.pause();
});
$('#up_stop_updating').on("click", function(){
    up_click_btn();
    updator.stop();
});
function up_click_btn(time = 500){
    load_start();
    setTimeout(up_indicators_store.get_indicators,time);
    setTimeout(load_finish,time+100);
}

up_indicators_store.get_indicators();

