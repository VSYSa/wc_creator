<?php
/**
 * Created by PhpStorm.
 * User: vladislav
 * Date: 14.10.2017
 * Time: 2:20
 */

require_once( 'libs/settings.php' );

function continue_update(){
    $continue_update = mysql_fetch_array(mysql_query("SELECT `value` FROM `settings` WHERE `title`='continue_update'"))[0];
    if($continue_update==1){
        mysql_query("UPDATE `settings` SET `value` = 'progress' WHERE `title` = 'progress_status'");
        return;
    }elseif ($continue_update==0){
        mysql_query("UPDATE `settings` SET `value` = 'stop' WHERE `title` = 'progress_status'");
        exit;
    }elseif ($continue_update==2){
        mysql_query("UPDATE `settings` SET `value` = 'pause' WHERE `title` = 'progress_status'");
        sleep(1);
        continue_update();
    }
}
function write_log($str){
    $date = date("d-m");
    $time = date("H:i:s");
    $fp = fopen("logs/$date.txt", 'a');
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
function send_email($message){
    $to      = 'vlad-sys-1998@yandex.ru';
    $subject = 'Обновление цены и количества товаров vs db';
    $headers = 'From: updates-on-mnogosveta.su' . "\r\n" .
        'Reply-To: webmaster@example.com' . "\r\n" .
        'X-Mailer: PHP/' . phpversion();
    mail($to, $subject, $message, $headers);
}
function send($a){
    print_r(json_encode($a));
}

?>