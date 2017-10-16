/**
 * Created by vladislav on 16.10.2017.
 */
function load_start(){
    $('#content').css({opacity:0.5});
    $('#loader').fadeIn( 200, "linear")
}
function load_finish(){
    $('#loader').fadeOut( 100, "linear");
    $('#content').css({opacity:1});
}

setTimeout(function () {
    load_finish();
},600);

