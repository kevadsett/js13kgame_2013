$(document).ready( function(){
    moveContainerTopToCentre();
    $(document).keypress(onKeyPressed);
});

var moveContainerTopToCentre = function(){
    $('.container').css({top: "-1000px"});
    moveContainerToCentre();
}
                                                               
var moveContainerToCentre = function(){
    $('.container').animate({top: "0px"}, 1000);
}

var animateToNextLevel = function() {
    $('.container').animate({top: "1000px"}, 1000, moveContainerTopToCentre);
}

var onKeyPressed = function(event){
    animateToNextLevel();
}