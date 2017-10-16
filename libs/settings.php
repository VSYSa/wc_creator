<?php

//db settings
define("db_host", "localhost");
define("db_username", "root");
define("db_password", "toor");

//api key
define("api_host", "https://mnogosveta.su/");
define("api_key_ck", "ck_73951e6714a5f64af41448ed70965ad43cf05efe");
define("api_key_cs", "cs_eb7b510b0042b842f9730fd8806fba20e03c4475");

define('WP_MEMORY_LIMIT', '1024M');
ignore_user_abort(true);
set_time_limit(0);
error_reporting (E_ALL & ~ E_DEPRECATED & ~ E_NOTICE);
error_reporting (0);


function send($a){
    print_r(json_encode($a));
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
?>
