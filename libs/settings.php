<?php

//db connect
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



?>
