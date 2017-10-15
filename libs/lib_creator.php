<?php
/**
 * Created by PhpStorm.
 * User: vladislav
 * Date: 14.10.2017
 * Time: 2:14
 */

error_reporting (1);

require_once( 'settings.php' );

require_once('../api/woocommerce-api.php');

require_once( '../parser/parser.php' );








function db(){
    $db_id = mysql_connect(db_host, db_username, db_password)
    or die('Не удалось соединиться: ' . mysql_error());
    mysql_select_db('creating_products')
    or die('Не удалось выбрать базу данных');
}
db();

$mem_start = memory_get_usage();

// рекурсивный сбор ссылок с сайта, определение кто товар и загрузка информации о нем
function spider($url)
{
    mysql_query('UPDATE `settings` SET `value` = 1 WHERE `title` = "status_updating"');
    $url=addhttp($url);
    $host=parse_url($url);
    $scheme = $host['scheme'];
    $host = $host['host'];
    // URI уже проиндексирован, пропускаем
    if (mysql_fetch_array(mysql_query('SELECT COUNT(1) FROM `url_list` WHERE `url`="'.mysql_real_escape_string($url).'" AND `status_updating`=2'))[0]>0) {
        return next_url();
    }
    $content = new simple_html_dom();
    $content->load(get($url));
    if ($content == 'error') {//если страница выдала код НЕ 200
        mysql_query('UPDATE `url_list` SET `status_updating`=404 WHERE `url`="'.mysql_real_escape_string($url).'"');
        unset($content,$url,$host,$scheme,$links);
        return next_url();

    }
    $links = $content->find('a');
    for($quantity_links=0;$quantity_links<count($links);$quantity_links++){//прохожусь по всем тегам <a>
        $link = $links[$quantity_links]->href;//получаю атрибут href
        if($link{0}=='/'){//если ссылка без хоста, то добавляем хост
            $link=$scheme.'://'.$host.$link;
        }
        if( preg_match("/$host/" , $link) && !preg_match("/@/" , $link) && !this_is_file($link) && (!preg_match('/[?]/' , $link) || stripos($link,'?PAGEN'  ))){//если ссылка не ведет на другие ресурсы и если ссылка не файл и не является get запросом и не емэйл
            if(mysql_fetch_array(mysql_query('SELECT COUNT(1) FROM `url_list` WHERE `url`="'.mysql_real_escape_string($link).'"'))[0] == 0) {
                mysql_query('INSERT INTO `url_list`(`url`, `status_updating`, `date_of_uploading`, `product_status`) VALUES ("' . $link . '",1,' . time() . ',0)');
            }
        }
        unset($link);
    }
    if (is_product($content,$url)) {
        insert_product_with_data($url,$content);
    }
    mysql_query('UPDATE `url_list` SET `status_updating`=2 WHERE `url`="'.mysql_real_escape_string($url).'"');
    unset($content,$url,$host,$scheme,$links,$quantity_links);
    next_url();



}
//загрузка действуюзщих товаров из нашего магазина для сравнения
function update_product_list()
{
    mysql_query('UPDATE `settings` SET `value` = 2 WHERE `title` = "status_updating"');
    mysql_query('TRUNCATE TABLE `products_list`');
    mysql_query('ALTER TABLE `products_list` AUTO_INCREMENT=0');

    $options = array(
        'debug' => false,
        'return_as_array' => true,
        'validate_url' => false,
        'timeout' => 300,
        'ssl_verify' => true,
    );

    try {

        $client = new WC_API_Client(api_host, api_key_ck, api_key_cs, $options);
        $quantiti_products = $client->products->get_count()['count'];
        mysql_query('UPDATE `creating_products`.`settings` SET `value` = '.$quantiti_products.' WHERE `title` = "quantiti_products_in_our_shop"');
        for ($step = 0; $step < $quantiti_products; $step+=100) {
            $product_data = $client->products->get('', array('fields' => 'id,permalink,description,meta', 'filter[limit]' => 100, 'filter[offset]' => $step))['products'];
            for ($num_product = 0; $num_product < 100; $num_product++) {
                mysql_query('INSERT INTO `products_list`(`product_id`, `parsing_url`) VALUES (' . $product_data[$num_product]['id'] . ',"' . mysql_real_escape_string($product_data[$num_product]['meta']['provider_url']) . '")');
            }
            continue_update();
        }
        check_on_valid_products();



    } catch (WC_API_Client_Exception $e) {

        echo $e->getMessage() . PHP_EOL;
        echo $e->getCode() . PHP_EOL;

        if ($e instanceof WC_API_Client_HTTP_Exception) {

            print_r($e->get_request());
            print_r($e->get_response());
        }
    }
}
//оставляем в таблице товары, которых у нас нет
function check_on_valid_products(){
    mysql_query('UPDATE `settings` SET `value` = 3 WHERE `title` = "status_updating"');
    while((mysql_fetch_row(mysql_query('SELECT COUNT(1) FROM `found_products` WHERE `product_status`=1 LIMIT 1'))[0])>0){
        $url_of_download_product = mysql_fetch_row(mysql_query('SELECT `product_url` FROM `found_products` WHERE `product_status`=1 LIMIT 1'))[0];
        if(mysql_fetch_row(mysql_query('SELECT COUNT(1) FROM `products_list` WHERE `parsing_url`="'.$url_of_download_product.'"'))[0]>0){
            mysql_query('DELETE FROM `found_products` WHERE `product_url`="'.$url_of_download_product.'"');
        }else{
            mysql_query('UPDATE `found_products` SET `product_status`=2 WHERE `product_url`="'.$url_of_download_product.'"');
        }
        unset($url_of_download_product);
    }
    return;
}
//загружаем товары в магазин
function upload_products(){
    mysql_query('UPDATE `settings` SET `value` = 4 WHERE `title` = "status_updating"');
    $options = array(
        'debug' => false,
        'return_as_array' => true,
        'validate_url' => false,
        'timeout' => 300,
        'ssl_verify' => true,
    );

    try {

        $client = new WC_API_Client(api_host, api_key_ck, api_key_cs, $options);

        $get_categories = $client->products->get_categories()['product_categories'];
        $categories=array();
        foreach ($get_categories as $category){
            $categories[$category['name']]=$category['id'];
        }
        unset($get_categories);
        $get_categories=get_categories_links('
    SELECT 
      t.`category_name` AS `diller_category`,
      t1.`category_name` AS `our_category` 
    FROM `categories_сommunication` 
    JOIN `categories_dillers` t ON t.id = `categories_сommunication`.id_diller_category 
    JOIN `categories_our` t1 ON t1.id = `categories_сommunication`.id_our_category
    ');

        $name_atributes=array('base_color'=>'Цвет основания','plafond_color'=>'Цвет плафона','brand'=>'Бренд','lamp_base'=>'Цоколь','voltage'=>'Вольтаж','power'=>'Мощность','quantity_lamps'=>'Количество ламп');
        while((mysql_fetch_row(mysql_query('SELECT COUNT(1) FROM `found_products` WHERE `product_status`=3'))[0])!=0){
            $product=mysql_fetch_assoc(mysql_query('SELECT `id`, `product_url`, `title`, `quantity`, `price`, `sku`, `category`, `image` FROM `found_products` WHERE `product_status`=3'));
            mysql_query('UPDATE `found_products` SET `product_status`=105 WHERE `id`="'.$product['id'].'"');
            if($get_categories[$product['category']]=='product_to_delete'){
                mysql_query('UPDATE `found_products` SET `product_status`=535 WHERE `id`="'.$product['id'].'"');
                continue_update();
                continue;
            }
            $atributes=mysql_fetch_assoc(mysql_query('SELECT  `base_color`, `plafond_color`, `brand`, `lamp_base`, `voltage`, `power`, `quantity_lamps` FROM `found_products` WHERE `id`="'.$product['id'].'"'));


            $import = array(
                'title' => $product['title'],
                'regular_price' => $product['price'],
                'type' => 'simple',
                'status' => 'publish',
                //'sku'=> $product['sku'],
                'regular_price'=> $product['price'],
                'managing_stock'   => true,
                'sale_price' => '',
                'stock_quantity'=> $product['quantity'],
                'categories'=> array($categories[$get_categories[$product['category']]]),
                'attributes'=> array(),
                'reviews_allowed'=> 0, //отключаем комментарии
                'custom_meta'=> array(
                    'provider_url'=>$product['product_url'],
                    '_specifications_display_attributes' => yes //чтобы в теме "electra" по дефолту отображались атрибуты, без обновления страницы товара, со стороны админа
                ),
                'images' => Array (
                    array(
                        'src' => $product['image'],
                        'position' => '0'
                    )
                )
            );


            foreach ($atributes as $name => $atribut) {
                if($atribut!=""){ //если атрибут не пустой, то мы добалвяем его
                    $import['attributes'][]=
                        array(
                            'name' => $name_atributes[$name],
                            'slug' => "$name",
                            'visible'=>'true',
                            'options'=> array( $atribut )
                        );
                }
                unset($name,$atribut);

            }

            $client->products->create($import);

            mysql_query('UPDATE `found_products` SET `product_status`=4 WHERE `id`="'.$product['id'].'"');

            unset($import,$atributes,$product);
            continue_update();
        }

        unset($client,$name_atributes);



    } catch (WC_API_Client_Exception $e) {
        mysql_query('INSERT INTO `creating_products`.`errors_log` (`time`, `error_code`, `data`) VALUES ('.time().', 111, "catch")');
        echo $e->getMessage() . PHP_EOL;
        echo $e->getCode() . PHP_EOL;

        if ($e instanceof WC_API_Client_HTTP_Exception) {

            print_r($e->get_request());
            print_r($e->get_response());
        }
        mysql_query('INSERT INTO `creating_products`.`errors_log` (`time`, `error_code`, `data`) VALUES ('.$e->get_response()->code.', 111, "error code")');
        if($e->get_response()->code==400){
            mysql_query('INSERT INTO `creating_products`.`errors_log` (`time`, `error_code`, `data`) VALUES ('.$e->get_response()->code.', 111, "return")');
            return upload_products();
        }

    }
    mysql_query('INSERT INTO `creating_products`.`errors_log` (`time`, `error_code`, `data`) VALUES ('.time().', 111, "end")');
}

function insert_product_with_data(&$url,&$html){
    $data=pars($url,$html);
    if(is_array($data)) {
        mysql_query('INSERT INTO `found_products`(
`product_url`,
 `product_status`,
 `title`,
 `quantity`,
 `price`,
 `sku`,
 `category`,
 `image`,
 `base_color`,
 `plafond_color`,
 `brand`,
 `lamp_base`,
 `voltage`,
 `power`,
 `quantity_lamps`
 ) VALUES (
 "' . mysql_real_escape_string($url) . '",
 3,
 "' . mysql_real_escape_string($data['title']) . '",
 "' . mysql_real_escape_string($data['quantity']) . '",
 "' . mysql_real_escape_string($data['price']) . '",
 "' . mysql_real_escape_string($data['sku']) . '",
 "' . mysql_real_escape_string($data['category']) . '",
 ' . check_is_NULL(mysql_real_escape_string($data['image'])) . ',
 ' . check_is_NULL(mysql_real_escape_string($data['base_color'])) . ',
 '.check_is_NULL(mysql_real_escape_string($data['plafond_color'])).',
 ' . check_is_NULL(mysql_real_escape_string($data['brand'])) . ',
 ' . check_is_NULL(mysql_real_escape_string($data['lamp_base'])) . ',
 ' . check_is_NULL(mysql_real_escape_string($data['voltage'])) . ',
 ' . check_is_NULL(mysql_real_escape_string($data['power'])) . ',
 ' . check_is_NULL(mysql_real_escape_string($data['quantity_lamps'])) . '
 )');
    }
    unset($data);
    return;
}

function write_log($str){
    $date = date("d-m");
    $time = date("H:i:s");
    $fp = fopen("../logs/$date.txt", 'a');
    fwrite($fp, $time);
    fwrite($fp, $str. PHP_EOL);
    fclose($fp);
}
function table_in_array($mysql_query){
    $rs=mysql_query($mysql_query);
    $table = array();
    $schet=0;
    while($row = mysql_fetch_assoc($rs)) {
        $strROW = array();
        foreach ($row as $key => $value){
            $strROW[$key] = $value;
        }
        $table[$schet] = $strROW;
        $schet++;
    }
    return $table;
}
function get_categories_links($mysql_query){
    $rs=mysql_query($mysql_query);
    $table = array();
    while($row = mysql_fetch_row($rs)) {
        $table[$row[0]]= $row[1];
    }
    return $table;
}

function send_email($message){
    $to      = 'vlad-sys-1998@yandex.ru';
    $subject = 'Обновление цены и количества товаров vs db';
    $headers = 'From: updates-on-mnogosveta.su' . "\r\n" .
        'Reply-To: webmaster@example.com' . "\r\n" .
        'X-Mailer: PHP/' . phpversion();
    mail($to, $subject, $message, $headers);
}

function is_product(&$html,&$url){
    if(preg_match ( '/magia-sveta.ru/' ,  $url )) {
        if(count($html->find('div.product-left-side'))>0 && count($html->find('div.product-right-side'))>0){
            unset($html);
            return true;
        }
    }elseif(preg_match ( '/antares-svet.ru/' ,  $url )){
        if(count($html->find('div.product-wrap'))>0){
            unset($html);
            return true;
        }
    }elseif(preg_match ( '/electra.ru/' ,  $url )){
        if(count($html->find('div.prw-panel'))>0){
            unset($html);
            return true;
        }
    }
    return false;
}
function next_url(){
    continue_update();
        if(mysql_fetch_row(mysql_query('SELECT COUNT(1) FROM `url_list` WHERE `status_updating`=1'))[0]!=0) {
        return spider(mysql_fetch_row(mysql_query('SELECT `url` FROM `url_list` WHERE `status_updating`=1 ORDER BY `date_of_uploading` ASC LIMIT 1'))[0]);
    }else{
        return;
    }
}
/* прописали в parser.php
function get($url){
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($curl, CURLOPT_HEADER, false);
    //curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_REFERER, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($curl, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/533.4 (KHTML, like Gecko) Chrome/5.0.375.125 Safari/533.4");
    $str = curl_exec($curl);
    if (curl_getinfo($curl, CURLINFO_HTTP_CODE) != 200) {
        curl_close($curl);
        return 'error';
    }
    curl_close($curl);
    return $str;
}
*/
function this_is_file(&$link){
    preg_match('/.+\.(\w+)$/xis', $link, $pocket);//получаю расширение файла
    if(!empty($pocket)) {
        $pocket=$pocket[1];
        $file_formats = array('rar', 'zip', 'avi', 'mpeg', 'mp3', 'gif', 'tif', 'jpg', 'bmp', 'ppt', 'txt', 'xls', 'doc', 'png', 'pdf','jpeg');
        foreach ($file_formats as &$value) {
            if ($pocket == $value) {
                unset($value,$pocket,$file_formats,$link);
                return true;
            }
        }
        unset($value,$pocket,$file_formats,$link);
    }
    return false;
}
function addhttp($url) {
    if (!preg_match("~^(?:f|ht)tps?://~i", $url)) {
        $url = "http://" . $url;
    }
    return $url;
}
function continue_update(){
    gc_collect_cycles();
    mysql_query('UPDATE `settings` SET `value` = '.(memory_get_usage() - $mem_start).' WHERE `title` = "memory_usage"');
    mysql_query('UPDATE `settings` SET `value` = '.time().' WHERE `title` = "last_updated"');
    $continue_update = mysql_fetch_row(mysql_query('SELECT `value` FROM `settings` WHERE `title`="continue_creating"'))[0];
    if($continue_update==1){
        unset($continue_update);
        return;
    }elseif ($continue_update==0){
        unset($continue_update);
        exit;
    }elseif ($continue_update==2){
        unset($continue_update);
        sleep(1);
        continue_update();
    }
}

function error_check_image_url (&$image_url,&$url){
    if($image_url{0}=='/'){
        $host=parse_url($url);
        $scheme = $host['scheme'];
        $host = $host['host'];
        $image_url=$scheme.'://'.$host.$image_url;
        unset($host,$scheme);
    }
    if($image_url==''){
        $image_url=NULL;
    }
    return;
}

function check_is_NULL ($str){
    if($str==""){
        return "NULL";
    }else{
        return "'$str'";
    }
}
function write_error($code,$message,$url)
{
    if ($url != '') {
        if (preg_match('/magia-sveta.ru/', $url)) {
            $shop = 'magia-sveta';
        } elseif (preg_match('/antares-svet.ru/', $url)) {
            $shop = 'antares-svet';
        } elseif (preg_match('/electra.ru/', $url)) {
            $shop = 'electra';
        }
    }

    mysql_query('INSERT INTO `errors_log` (`time`, `error_code`, `data`, `url`,`shop`) VALUES (' . time() . ', ' . $code . ', "' . mysql_real_escape_string($message) . '", "' . mysql_real_escape_string($url) . '", "' . $shop . '")');
}

?>