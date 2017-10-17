<?php
$acsess='true';
?>
<html>
<head>
    <meta charset="utf-8">
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    <script src="https://momentjs.com/downloads/moment.js" ></script>
    <script src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js" ></script>
    <link type="text/css" rel="stylesheet" href="https://cdn.datatables.net/1.10.16/css/jquery.dataTables.min.css">
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">


    <script type="text/javascript">
        $(document).ready(function()
        {
            var navItems = $('.admin-menu li > a');
            var navListItems = $('.admin-menu li');
            var allWells = $('.admin-content');
            var allWellsExceptFirst = $('.admin-content:not(:first)');

            allWellsExceptFirst.hide();
            navItems.click(function(e)
            {
                e.preventDefault();
                navListItems.removeClass('active');
                $(this).closest('li').addClass('active');

                allWells.hide();
                var target = $(this).attr('data-target-id');
                $('#' + target).show();
            });
        });
    </script>
    <script type="text/javascript" src=""></script>
    <link type="text/css" rel="stylesheet" href="style/adminstyle.css">
    <link type="text/css" rel="stylesheet" href="style/loading.css">


</head>
<body>
<div id="loader"><div class="containr">
        <div class="gearbox">
            <div class="overlay"></div>
            <div class="gear one">
                <div class="gear-inner">
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                </div>
            </div>
            <div class="gear two">
                <div class="gear-inner">
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                </div>
            </div>
            <div class="gear three">
                <div class="gear-inner">
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                </div>
            </div>
            <div class="gear four large">
                <div class="gear-inner">
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                </div>
            </div>
        </div>
        <h1>Loading...</h1>
    </div>
</div>
<div id="content" style="opacity:0.5" class="container">
    <div class="row">
        <div class="col-md-3">
            <ul class="nav nav-pills nav-stacked admin-menu">
                <li class="active"><a href="#" data-target-id="home"><i class="fa fa-home fa-fw"></i>Home</a></li>
                <li><a  data-target-id="Creating"><i class="fa fa-list-alt fa-fw"></i>Creating</a></li>
                <li><a  data-target-id="Updating"><i class="fa fa-file-o fa-fw"></i>Updating</a></li>
                <li><a  data-target-id="charts"><i class="fa fa-bar-chart-o fa-fw"></i>Charts</a></li>
                <li><a  data-target-id="table"><i class="fa fa-table fa-fw"></i>Table</a></li>
                <li><a  data-target-id="forms"><i class="fa fa-tasks fa-fw"></i>Forms</a></li>
                <li><a  data-target-id="calender"><i class="fa fa-calendar fa-fw"></i>Calender</a></li>
                <li id="cr_errors_menu"><a  data-target-id="cr_errors"><i class="fa fa-pencil fa-fw"></i>creating errors <div id="cr_count_errors"> 0 </div></a></li>
                <li id="up_errors_menu"><a  data-target-id="up_errors"><i class="fa fa-pencil fa-fw"></i>updating errors <div id="up_count_errors"> 0 </div></a></li>
            </ul>
        </div>
        <div class="col-md-9 well admin-content" id="home">
            <p>
                Hello! This is a forked snippet.<br>
                It is for users, which use one-page layouts.
            </p>
            <p>
                Here's the original one from BhaumikPatel: <a href="http://bootsnipp.com/snippets/featured/vertical-admin-menu" target="_BLANK">Vertical Admin Menu</a>
                <br>
                Thank you Baumik!
            </p>
        </div>
        <div class="col-md-9 well admin-content" id="Creating">
            <div class="row">
                <div class="col-md-8">
                    <div>
                        <button id="cr_update_info" type="button" class="btn btn-default btn-sm" style="float: right;">
                            <span class="glyphicon glyphicon-refresh"></span> Refresh
                        </button>
                    </div>
                    <h2>Информация</h2>
                    <div class="row">
                        <div class="col-md-8">Ссылок найдено: </div>   <div id="cr_quantity_urls" class="col-md-4">0</div>
                        <div class="col-md-8">Количество ссылок, ожидающие обработку:
                        </div>
                        <div class="col-md-4"><div id="cr_quantity_urls_to_parsing">0</div></div>
                        <div class="col-md-8">Количество обработанных ссылок:
                            <div id="cr_progress_quantity_parsed_urls" class="progress"><div class="progress-bar progress-bar-striped"></div></div>
                        </div>   <div  class="col-md-4"><div id="cr_quantity_parsed_urls">0</div><div id="cr_uploaded_products_time">0</div></div>
                        <div class="col-md-8">
                            Продуктов найдено:
                        </div>
                        <div id="cr_quantity_found_products" class="col-md-4">
                            0
                        </div>
                        <div class="col-md-8">
                            Товаров загружено из магазина:
                            <div id="cr_progress_quantity_downloaded_from_our_PL" class="progress"><div class="progress-bar progress-bar-striped"></div></div>
                        </div>
                        <div id="cr_quantity_downloaded_from_our_PL" class="col-md-4">
                            0
                        </div>
                        <div class="col-md-8">Загружено товаров в магазин:
                            <div id="cr_progress_goods_uploaded" class="progress"><div class="progress-bar progress-bar-striped"></div></div>
                        </div>
                        <div class="col-md-4"><div id="cr_goods_uploaded">
                                0
                            </div>
                            <div id="cr_updated_products_time">
                                0
                            </div>
                        </div>
                        <div class="col-md-8">Шаг выполнения: </div>   <div  id="cr_status_updating" class="col-md-4"></div>
                        <div class="col-md-8">Времени прошло: </div>   <div  id="cr_time_from_start" class="col-md-4">0</div>
                        <div class="col-md-8">Времени прошло  последнего действия: </div>   <div  id="cr_time_last_updated" class="col-md-4">0</div>
                        <div class="col-md-8">Памяти используется: </div>   <div  id="cr_memory_usage" class="col-md-4">0</div>
                        <div class="col-md-8">Последний продукт: </div>   <div  id="cr_next_url_to_updating" class="col-md-4"><a target="_blank" href="">Link</a></div>
                        <div class="col-md-8">Статус обновления: </div>   <div id="cr_continue_creating" class="col-md-4">0</div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div id="cr_start_buttons">
                        <div class="col-md-12">
                        <p><button id='cr_startupdating' class="btn btn-success" >START UPDATING</button><button id='cr_clear_all' class="btn btn-danger">CLEAR ALL</button></p>
                        </div>
                        <div class="col-md-12">
                        <p><button id='cr_startspider' class="btn btn-success" >START SPIDER</button></p>
                        </div>
                        <div class="col-md-12">
                        <p>URL LIST <br><button id='cr_start_spider' class="btn btn-success">UPDATE</button><button id='' class="btn btn-danger">CLEAR</button></p>
                        </div>
                        <div class="col-md-12">
                        <p>LIST OF PRODUCTS IN SHOP<br><button id='cr_upload_our_PL' class="btn btn-success">UPLOAD</button><button id='cr_upload_PL' class="btn btn-danger">CLEAR</button></p>
                        </div>
                        <div class="col-md-12">
                        <p>CREATE NEW PRODUCTS <br><button id='cr_create_new_products' class="btn btn-success">UPLOAD</button><button id='cr_startparsing' class="btn btn-danger">CLEAR</button></p>
                        </div>
                        <div class="col-md-12">
                            Обновлять :<br>
                        <input  type="checkbox" class="btn-primary" id='update_magia-sveta' checked>magia-sveta</p>
                        <input  type="checkbox" class="btn-success" id='update_antares' checked>antares</p>
                        <input  type="checkbox" class="btn-info" id='update_electra' checked>electra</p>
                        </div>
                    </div>
                    <div id="cr_continue_buttons" >
                        <p><button id='cr_continue_updating' >CONTINUE UPDATING</button></p>
                        <p><button id='cr_pause_updating' >PAUSE UPDATING</button></p>
                        <p><button id='cr_stop_updating' >STOP UPDATING</button></p>
                    </div>
                </div>
            </div>



        </div>
        <div class="col-md-9 admin-content" id="Updating">


            <div class="row">
                <div class="col-md-8">
                    <div>
                        <button id="up_update_info" type="button" class="btn btn-default btn-sm" style="float: right;">
                            <span class="glyphicon glyphicon-refresh"></span> Refresh
                        </button>
                    </div>
                    <h2>Информация</h2>
                    <div class="row">
                        <div class="col-md-8">Товаров в магазине: </div>   <div id="up_quantiti_products" class="col-md-4">0</div>
                        <div class="col-md-8">Загружено товаров в базу:
                            <div id="up_progress_uploaded_products" class="progress"><div class="progress-bar progress-bar-striped"></div></div>
                        </div>   <div  class="col-md-4"><div id="up_uploaded_products">0</div><div id="up_uploaded_products_time">0</div></div>
                        <div class="col-md-8">Товары с обновленной информацией:
                            <div id="up_progress_updated_products_information" class="progress"><div class="progress-bar progress-bar-striped"></div></div>
                        </div>   <div class="col-md-4"><div id="up_updated_products_information">0</div><div id="up_updated_products_information_time">0</div></div>
                        <div class="col-md-8">Загружено товаров в магазин:
                            <div id="up_progress_updated_products" class="progress"><div class="progress-bar progress-bar-striped"></div></div>
                        </div>   <div class="col-md-4"><div id="up_updated_products">0</div><div id="up_updated_products_time">0</div></div>
                        <div class="col-md-8">Времени прошло: </div>   <div  id="up_time_from_start" class="col-md-4">0</div>
                        <div class="col-md-8">Времени осталось: </div>   <div id="up_time_to_end" class="col-md-4">0</div>
                        <!--<div class="col-md-8">Шаг обновления: </div>   <div id="status_step_updating" class="col-md-4">0</div>-->
                        <div class="col-md-8">Статус обновления: </div>   <div id="up_status_updating" class="col-md-4">0</div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div id="up_start_buttons">
                        <p><button id='up_startparsing' >START UPDATING</button></p>
                        <p><button id='up_update_PL' >UPDATE PRODUCTS LIST</button></p>
                        <p><button id='up_update_PI' >UPDATE PRODUCT INFORMATION</button></p>
                        <p><button id='up_upload_PL' >UPLOAD PRODUCTS LIST</button></p>
                        <input  type="radio" name="answer" data-update='quantiti' >количество товаров</p>
                        <input  type="radio" name="answer" data-update='prise' >цену товаров</p>
                        <input  type="radio" name="answer" data-update='all' checked>все</p>
                    </div>
                    <div id="up_continue_buttons" >
                        <p><button id='up_continue_updating' >CONTINUE UPDATING</button></p>
                        <p><button id='up_pause_updating' >PAUSE UPDATING</button></p>
                        <p><button id='up_stop_updating' >STOP UPDATING</button></p>
                    </div>
                </div>
            </div>

        </div>
        <div class="col-md-9 well admin-content" id="charts">
            Charts
        </div>
        <div class="col-md-9 well admin-content" id="table">
            Table
        </div>
        <div class="col-md-9 well admin-content" id="forms">
            Forms
        </div>
        <div class="col-md-9 well admin-content" id="cr_errors">
            <button id="cr_errors_clear" type="button" class="btn btn-default btn-sm" style="float: left;">
                <span class="glyphicon glyphicon-trash"></span> Clear
            </button>
            <button id="cr_errors_refresh" type="button" class="btn btn-default btn-sm" style="float: right;">
                <span class="glyphicon glyphicon-refresh"></span> Refresh
            </button>
        </div>
        <div class="col-md-9 admin-content" id="up_errors">
            <button id="up_errors_clear" type="button" class="btn btn-default btn-sm" style="float: left;">
                <span class="glyphicon glyphicon-trash"></span> Clear
            </button>
            <button id="up_errors_refresh" type="button" class="btn btn-default btn-sm" style="float: right;">
                <span class="glyphicon glyphicon-refresh"></span> Refresh
            </button>

        </div>
    </div>
</div>
<script type="text/javascript" src="js/main.js"></script>
<script type="text/javascript" src="js/index.js"></script>
<script type="text/javascript" src="js/up_index.js"></script>

</body>
</html>