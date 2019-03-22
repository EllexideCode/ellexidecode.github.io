$(document).ready(()=>{
 /* $(".scroller").mCustomScrollbar({
    autoHideScrollbar: true,
    scrollButtons: {
      enable: false
    },
    theme: "inset-dark"
  });*/

  $(".unset-style, .button:not(a)").click(function(){
    var opens = $(this).attr("opens");
    if($(opens).is(":visible")) {
      return;
    }
    $(".scrollerWrap").fadeOut(200);
    setTimeout(function(){
      $(opens).fadeIn(200);
      $(opens).addClass("open");
    }, 200);
  });

    switch($("#elle").attr("talk")) {
      case "play":
        $("<img>", {
          style: "background: url()"
        })
    }
  });