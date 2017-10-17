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
function error_table(data,prefix){
    var error_product ='<tr class="'+prefix+'_added_row_of_error_table" data-id='+data['id']+'>'+
    '<td>'+data['id']+'</td>'+
    '<td>'+moment(data['time']*1000).format("DD-MM-YYYY h:mm:ss")+'</td>'+
    '<td>'+data['error_code']+'</td>'+
    '<td>'+data['data']+'</td>'+
    '<td> <a href="'+data['url']+'" target="_blank" class="btn btn-info btn-lg"><span class="glyphicon glyphicon-link"></span> Link  </a></td>'+
    '<td>'+data['shop']+'</td>'+'</tr>';
    return error_product;
}
function error_head(prefix){
    var error_head ='<table id="'+prefix+'_errors_table" >  <thead><tr><th>ID</th><th>Time</th><th>Code</th><th>Message</th><th>Link</th><th>Shop</th></tr></thead>   <tfoot><tr ><th>ID</th><th>Time</th><th>Code</th><th>Message</th><th>Link</th><th>Shop</th></tr></tfoot> <tbody id="'+prefix+'_errors_table_tbody"> </tbody>    </table>';

    return error_head;
}
function create_record(plase, text){
    var record = document.createElement('tr');
    record.className = 'well added_record';
    record.innerHTML = text;
    $(text).appendTo(plase);
};
function sorting_tables(plase) {
    var selected = [];
    // Setup - add a text input to each footer cell
    $(plase+' tfoot th').each( function () {
        var title = $(this).text();
        $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
    } );

    // DataTable
    var table = $(plase).DataTable({
        "processing": true,

        "rowCallback": function( row, data ) {
            if ( $.inArray(data.DT_RowId, selected) !== -1 ) {
                $(row).addClass('selected');
            }
        }
    });

    // Apply the search
    table.columns().every( function () {
        var that = this;

        $( 'input', this.footer() ).on( 'keyup change', function () {
            if ( that.search() !== this.value ) {
                that
                    .search( this.value )
                    .draw();
            }
        } );
    } );
    $(plase+' tbody').on('click', 'tr', function () {
        var id = this.id;
        var index = $.inArray(id, selected);

        if ( index === -1 ) {
            selected.push( id );
        } else {
            selected.splice( index, 1 );
        }

        $(this).toggleClass('selected');
    } );
}
function clear_errors_row(selected) {
    var query =[];
    for (var i = 0; i < selected.length; i++) {
        query.push(parseInt(selected[i].dataset.id));
    }
    return query;

}




setTimeout(function () {
    load_finish();
},600);

