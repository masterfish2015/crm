$(document).ready(function(){
    $('.sidebar-heading').click(function(e){
        $('.sidebar-title').removeClass('panel-info');
        $(e.currentTarget).parents('.panel').addClass('panel-info');
    });
});
