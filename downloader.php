<?php
/**
 * Created by PhpStorm.
 * User: vladislav
 * Date: 16.10.2017
 * Time: 22:50
 */

if (file_exists('electra')) {
    foreach (glob('electra/*') as $file)
        unlink($file);
}

try{
    if( !$ch = curl_init() )
        throw new Exception('Curl init failed');

    $options = [
        CURLOPT_URL            => 'http://www.electra.ru/private_office/export/files/electra_photos.tar.gz?login=potolok.plus2013&pwd=89137758184',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER     => [
            'User-Agent' => 'Mozilla/5.0 (Windows NT 5.1; rv:34.0) Gecko/20100101 Firefox/34.0'
        ]
    ];
    curl_setopt_array($ch, $options);
    $file = curl_exec( $ch );

    file_put_contents('electra/images.zip', $file);

} catch(Exception $e){
    echo $e->getMessage();
}


$zip = new ZipArchive;
$res = $zip->open('electra/zip.zip');
if ($res === TRUE) {
    $zip->extractTo('electra/');
    $zip->close();
    echo 'ok';
} else {
    echo 'failed';
}

?>