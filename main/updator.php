<?php



require_once('../libs/lib_updator.php');
db();


if($_POST['what_to_do']==='update_product'){
   mysql_query('UPDATE `settings` SET `value`=1 WHERE `title`="continue_update"');
   mysql_query('UPDATE `settings` SET `value`='.time().' WHERE `title`="time_of_start_updating"');
    update_product_list();
    update_product_information();
    upload_products();
    mysql_query('UPDATE `settings` SET `value`=0 WHERE `title`="continue_update"');
    mysql_query('UPDATE `updateproducts`.`settings` SET `value` = '.time().' WHERE `title` = "end_of_updating"');


}
elseif($_POST['what_to_do']==='update_PL'){
    mysql_query("UPDATE `settings` SET `value` = 1 WHERE `title` = 'continue_update'");
    mysql_query('UPDATE `settings` SET `value`='.time().' WHERE `title`="time_of_start_updating"');
    update_product_list();
    mysql_query('UPDATE `settings` SET `value`=0 WHERE `title`="continue_update"');
    mysql_query('UPDATE `updateproducts`.`settings` SET `value` = '.time().' WHERE `title` = "end_of_updating"');

}
elseif($_POST['what_to_do']==='update_PI'){
    mysql_query("UPDATE `settings` SET `value` = 1 WHERE `title` = 'continue_update'");
    mysql_query('UPDATE `settings` SET `value`='.time().' WHERE `title`="time_of_start_updating"');
    update_product_information();
    mysql_query('UPDATE `settings` SET `value`=0 WHERE `title`="continue_update"');
    mysql_query('UPDATE `updateproducts`.`settings` SET `value` = '.time().' WHERE `title` = "end_of_updating"');

}
elseif($_POST['what_to_do']==='upload_PL'){
    mysql_query("UPDATE `settings` SET `value` = 1 WHERE `title` = 'continue_update'");
    mysql_query('UPDATE `settings` SET `value`='.time().' WHERE `title`="time_of_start_updating"');
    //mysql_query('UPDATE `settings` SET `value`=0000 WHERE `title`="time_of_start_updating"');
    upload_products();
    mysql_query('UPDATE `settings` SET `value`=0 WHERE `title`="continue_update"');
    mysql_query('UPDATE `updateproducts`.`settings` SET `value` = '.time().' WHERE `title` = "end_of_updating"');

}
elseif($_POST['what_to_do']==='remove_product'){
    mysql_query('UPDATE `settings` SET `value`='.time().' WHERE `title`="time_of_start_updating"');
    remove_product($_POST['product_id']);
    mysql_query('UPDATE `updateproducts`.`settings` SET `value` = '.time().' WHERE `title` = "end_of_updating"');

}
else{
    echo 111;
}


?>

