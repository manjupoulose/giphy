$(document).ready(function()
{

$('.rating-circle').hover(function(){
// $(this).addClass('rating-hover');
var current =$(this);
$('.rating-circle').each(function(index){
$(this).addClass('rating-hover');
if(index== current.index()){
    return false;
}
});
});
$('.rating-circle').mouseleave(function(){
    $('.rating-circle').removeClass('rating-hover');
});
$('.rating-circle').click(function(){
    $('.rating-circle').removeClass('rating-chosen');
    $('.rating-hover').addClass('rating-chosen');
});
});