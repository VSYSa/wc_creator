<?php
require_once 'simple_html_dom.php';


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
        write_error('405','Код ответа на загрузку контента не 200.',$url);
        return 'error';
    }
    curl_close($curl);
    return $str;
}
function pars(&$url,&$html){
    if(preg_match ( '/magia-sveta.ru/' ,  $url )) {
        return(pars_magia_sveta($url,$html));
    }elseif(preg_match ( '/antares-svet.ru/' ,  $url )){
        return(pars_antares_svet($url,$html));
    }elseif(preg_match ( '/electra.ru/' ,  $url )){
        return(pars_electra($url,$html));
    }
    else{
        write_error('466','Товар не может быть распарсен тк для него не прописывали правило.',$url);
        return;
    }
}
function pars_magia_sveta(&$url,&$html,$what='false'){

    if($html->innertext==''){
        write_error('470','Страница товара не загрузилась.',$url);//если не загрузилась страничка, то error
        return;
    }
    if(preg_match('/Уточнить цену/',$html->find('div.product-price a',0))){//есть ли запись "уточнить цену", то error
        write_error('471','У товара нет цены, поэтому не парсим его.',$url);
        return;
    }
    if(!preg_match('/в наличии/',$html->find('a.available-tab-open span',0))){//если нет в наличии, то error
        write_error('472','Товара нет в наличии, поэтому не парсим его.',$html->find('a.available-tab-open'));
        return;
    }


    $price = $html->find('span.price', 0);    //находим первое значение у тега а с классом available-tab-open
    if (count($price->find('span.old-price', 0))) {
        $price = $price->find('span.old-price', 0);
    }
    $price = $price->innertext;
    $price = preg_replace("/[^0-9]/", '', $price);     //отчищаем от слов
    $quantity = $html->find('a.available-tab-open', 0);    //находим первое значение у тега а с классом available-tab-open
    $quantity = preg_replace("/[^0-9]/", '', $quantity);


    if($what){//если нам нужно для обновления товров, то возвращаем
        return (array( 'stock_quantity' => $quantity, 'regular_price' => $price));
    }



    $image_url = $html->find('div.product-photo img', 0)->attr['src'];
    error_check_image_url($image_url, $url);
    if ($image_url{0} == '/') {
        $host = parse_url($url);
        $scheme = $host['scheme'];
        $host = $host['host'];
        $image_url = $scheme . '://' . $host . $image_url;
        unset($host, $scheme);
    }
    $title = $html->find('ul.breadcrumbs', 0)->find('li span', 0)->innertext;
    $category = $html->find('ul.breadcrumbs', 0)->find('li a', -1)->innertext;
    $sku = $html->find('div.product-code span', 0)->innertext;
    $atributs = $html->find('table.product-settings tr');
    $base_color = NULL;
    $plafond_color = NULL;
    $brand = NULL;
    $lamp_base = NULL;
    $voltage = NULL;
    $power = NULL;
    $quantity_lamps = NULL;
    foreach ($atributs as &$atribut) {
        if ($atribut->find('td.name span', 0)->innertext == 'Цвет арматуры') {
            $base_color = $atribut->find('td.value', 0)->innertext;
        } elseif ($atribut->find('td.name span', 0)->innertext == 'Цвет плафона') {
            $plafond_color = $atribut->find('td.value', 0)->innertext;
        } elseif ($atribut->find('td.name span', 0)->innertext == 'Бренд') {
            $brand = $atribut->find('td.value', 0)->plaintext;
        } elseif ($atribut->find('td.name span', 0)->innertext == 'Цоколь') {
            $lamp_base = $atribut->find('td.value', 0)->innertext;
        } elseif($atribut->find('td.name span',0)->innertext=='Напряжение'){
            $voltage=$atribut->find('td.value',0)->innertext;
            $voltage=preg_replace('/[^0-9\-]/','',$voltage);
        }
        elseif ($atribut->find('td.name span', 0)->innertext == 'Макс. мощность одной лампы') {
            $power = $atribut->find('td.value', 0)->innertext;
            $power = preg_replace("/[^0-9]/", '', $power);
        } elseif ($atribut->find('td.name span', 0)->innertext == 'Кол-во ламп') {
            $quantity_lamps = $atribut->find('td.value', 0)->innertext;
            $quantity_lamps = preg_replace("/[^0-9]/", '', $quantity_lamps);
        }

    }
    $html->clear();
    unset($html);
    $str = array(
        'product_url' => $url,
        'title' => $title,
        'quantity' => $quantity,
        'price' => $price,
        'sku' => $sku,
        'category' => $category,
        'image' => $image_url,
        'base_color' => $base_color,
        'plafond_color' => $plafond_color,
        'brand' => $brand,
        'lamp_base' => $lamp_base,
        'voltage' => $voltage,
        'power' => $power,
        'quantity_lamps' => $quantity_lamps
    );
    unset($url, $title, $quantity, $prise, $sku, $image_url, $base_color, $plafond_color, $brand, $lamp_base, $power, $quantity_lamps, $atributs, $atribut);
    return ($str);

}
function pars_electra(&$url,$what='false'){
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url ); // отправляем на
    curl_setopt($ch, CURLOPT_HEADER, 1); // пустые заголовки
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); // возвратить то что вернул сервер

    curl_setopt($ch, CURLOPT_MAXREDIRS, 10);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);// таймаут4

    //curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); // следовать за редиректами
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTREDIR, 3);

    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);// просто отключаем проверку сертификата
    curl_setopt($ch, CURLOPT_COOKIEJAR, dirname(__FILE__).'/cookie.txt'); // сохранять куки в файл
    curl_setopt($ch, CURLOPT_COOKIEFILE,  dirname(__FILE__).'/cookie.txt');
    //curl_setopt($ch, CURLOPT_POST, 1); // использовать данные в post
    curl_setopt($ch, CURLOPT_POSTFIELDS, array(
        'USER_LOGIN'=>'potolok.plus2013',
        'USER_PASSWORD'=>'89137758184',
        'backurl'=>"$url",
        'AUTH_FORM'=>'Y',
        'TYPE'=>'AUTH',
        'TYPE_NX'=>'AUTH',
        'Login'=>'Войти',
    ));
    $result = curl_exec ($ch);

    if(curl_getinfo($ch, CURLINFO_HTTP_CODE)!==200){
        write_error('470','Страница товара не загрузилась.',$url);//если не загрузилась страничка, то error
        return;
    }

    $html = str_get_html($result);
    curl_close ($ch);
    $out = $html -> find('div.nx-basket-byer');
    $out = $out[data-cart];
    preg_match('|{(.*?)}|sei', $out, $arr) ;
    $data = json_decode($arr[0], true);
    $quantity = $data[ost];
    $price = $data[price]*2;

    if($price==0){//есть ли запись "уточнить цену", то error
        write_error('471','У товара нет цены, поэтому не парсим его.',$url);
        return 471;
    }
    if($quantity==0){//если нет в наличии, то error
        write_error('472','Товара нет в наличии, поэтому не парсим его.',$html->find('a.available-tab-open'));
        return 472;
    }

    if($what){//если нам нужно для обновления товров, то возвращаем
        return (array( 'stock_quantity' => $quantity, 'regular_price' => $price));
    }


    $category = $html->find('nav.catalog-menu-block li.selected',0)->plaintext;
    $title= $html->find('div.main-inner h1',0)->innertext;
    $image_url= $html->find('div.prw-block img',0)->attr['src'];
    if($image_url!=''){
        $image_url='https://mnogosveta.su/upload/electra/'.(array_pop(preg_split("/\//", $image_url)));
    }
    error_check_image_url($image_url,$url);
    $base_color=NULL;
    $plafond_color=NULL;
    $brand=NULL;
    $lamp_base=NULL;
    $voltage=NULL;
    $power=NULL;
    $quantity_lamps=NULL;
    $atributs= $html->find('table.properties tr');
    foreach ($atributs as &$atribut){
        if($atribut->find('th',0)->innertext=='Цвет основания'){
            $base_color=$atribut->find('td',0)->innertext;
        }
        elseif ($atribut->find('th',0)->innertext=='Цвет каркаса'){
            $base_color=$atribut->find('td',0)->innertext;
        }
        elseif ($atribut->find('th',0)->innertext=='Цвет плафона'){
            $plafond_color=$atribut->find('td',0)->innertext;
        }
        elseif ($atribut->find('th',0)->innertext=='Производитель'){
            $brand=$atribut->find('td span',0)->innertext;
        }
        elseif ($atribut->find('th',0)->innertext=='Цоколь лампы'){
            $lamp_base=$atribut->find('td',0)->innertext;
        }
        elseif ($atribut->find('th',0)->innertext=='Напряжение, В'){
            $voltage=$atribut->find('td',0)->innertext;
        }
        elseif ($atribut->find('th',0)->innertext=='Потребляемая мощность, Вт'){
            $power=$atribut->find('td',0)->innertext;
        }
        elseif ($atribut->find('th',0)->innertext=='Количество ламп'){
            $quantity_lamps=$atribut->find('td',0)->innertext;
        }
    }


    $str = array(
        'product_url'=> $url,
        'title'=> $title,
        'quantity' => $quantity,
        'price' => $price,
        'sku'=> '',
        'category'=> $category,
        'image' => $image_url,
        'base_color'=>$base_color,
        'plafond_color'=>$plafond_color,
        'brand'=>$brand,
        'lamp_base'=>$lamp_base,
        'voltage'=>$voltage,
        'power'=>$power,
        'quantity_lamps'=>$quantity_lamps
    );
    return ($str);
}
function pars_antares_svet(&$url,&$html,$what='false'){

    if($html->innertext==''){
        write_error('470','Страница товара не загрузилась.',$url);//если не загрузилась страничка, то error
        return;
    }
    $price = $html->find('div.ecommerce-block',0);
    if($price->find('div.price-old', 0)->innertext==''){
        $price = $price->find('div.price', 1);
    }else{
        $price = $price->find('div.price', 0);
    }
    $price = preg_replace("/[^0-9]/", '', $price);

    if(!preg_match('/[0-9]/',$price)){//есть ли цифры в цене, если нет, то ошибка
        write_error('471','У товара нет цены, поэтому не парсим его',$url);
        return 471;
    }

    $quantity1=0;
    $quantity2=0;
    if(count($html->find('span.quant', 0))){
        $quantity1 = $html->find('span.quant', 0)->innertext;   //смотрим сколько товара на ватутина 99
        $quantity1 = preg_replace("/[^0-9]/", '', $quantity1);
    }
    if(count($html->find('span.quant', 1))){
        $quantity2 = $html->find('span.quant', 1)->innertext;//смотрим сколько товара на гоголя 32/1
        $quantity2 = preg_replace("/[^0-9]/", '', $quantity2);
    }
    $quantity=$quantity1+$quantity2;

    if($quantity==0){//если нет в наличии, то error
        write_error('472','Товара нет в наличии, поэтому не парсим его.',$url);
        return 472;
    }

    if($what){//если нам нужно для обновления товров, то возвращаем
        return (array( 'stock_quantity' => $quantity, 'regular_price' => $price));
    }


    $base_color=NULL;
    $plafond_color=NULL;
    $brand=NULL;
    $lamp_base=NULL;
    $voltage=NULL;
    $power=NULL;
    $quantity_lamps=NULL;
    $title= $html->find('h1.product-title',0)->innertext;
    $sku= $html->find('span.art',0)->innertext;

    $atributs= $html->find('div.descript-product table.table tr');
    foreach ($atributs as &$atribut){
        if($atribut->find('td',0)->innertext=='Цвет основания'){
            $base_color=$atribut->find('td',1)->innertext;
        }
        elseif ($atribut->find('td',0)->innertext=='Цвет плафона'){
            $plafond_color=$atribut->find('td',1)->innertext;
        }
        elseif ($atribut->find('td',0)->innertext=='Производитель'){
            $brand=$atribut->find('td',1)->innertext;
        }
        elseif ($atribut->find('td',0)->innertext=='Цоколь'){
            $lamp_base=$atribut->find('td',1)->innertext;
        }
        elseif (preg_match('/Напряжение сети/',$atribut->find('td',0)->innertext)){
            $voltage=$atribut->find('td',1)->innertext;
        }
        elseif ($atribut->find('td',0)->innertext=='Мощность, Вт'){
            $power=$atribut->find('td',1)->innertext;
        }
        elseif ($atribut->find('td',0)->innertext=='Общее количество ламп'){
            $quantity_lamps=$atribut->find('td',1)->innertext;
        }
    }
    $image_url= $html->find('div.view-product img',1)->attr['src'];
    error_check_image_url($image_url,$url);
    $category=$html->find('ol.breadcrumb li',-1)->plaintext;
    $html->clear();
    unset($html);

    $str = array(
        'product_url'=> $url,
        'title'=> $title,
        'quantity' => $quantity,
        'price' => $price,
        'sku'=> $sku,
        'category'=> $category,
        'image' => $image_url,
        'base_color'=>$base_color,
        'plafond_color'=> $plafond_color,
        'brand'=> $brand,
        'lamp_base'=> $lamp_base,
        'voltage'=> $voltage,
        'power'=> $power,
        'quantity_lamps'=>$quantity_lamps
    );
    unset($price,$title,$quantity,$price,$sku,$category,$image_url,$base_color,$plafond_color,$brand,$lamp_base,$voltage,$power,$quantity_lamps);
    return ($str);
}

?>