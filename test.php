<?php
require_once( 'libs/settings.php' );

require_once('/api/woocommerce-api.php');

require_once( 'parser/parser.php' );
    mysql_query('UPDATE `settings` SET `value` = 5 WHERE `title` = "status_updating"');
    $options = array(
            'debug' => true,
            'return_as_array' => true,
            'validate_url' => false,
            'timeout' => 300,
            'ssl_verify' => true,
        );

    try {

        $client = new WC_API_Client(api_host, api_key_ck, api_key_cs, $options);

        

            $product_data = $client->products->get(null, array( 'filter[meta]'  => array('filter[provider_url]'  => 'http://magia-sveta.ru/product/100491-belyij-s-serebromprozrachnyij-xrustal ')))['products'][0];
            print_r($product_data);
        



    } catch (WC_API_Client_Exception $e) {
        echo $e->getMessage() . PHP_EOL;
        echo $e->getCode() . PHP_EOL;

        if ($e instanceof WC_API_Client_HTTP_Exception) {

            print_r($e->get_request());
            print_r($e->get_response());
        }
        
    }




?>