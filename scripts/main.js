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
    $(".scrollerWrap:not(.font)").fadeOut(200);
    setTimeout(function(){
      $(opens).fadeIn(200);
      $(opens).addClass("open");
    }, 200);
  });

    switch($("#elle").attr("talk")) {
      case "play":
        $("<img>", {
          src: "https://ellexidecodes.xyz/assets/play-with-me.gif"
        }).appendTo("#elle .speech");
        break;
      case "closed":
        $("<img>", {
          src: "https://ellexidecodes.xyz/assets/closed.gif"
        }).appendTo("#elle .speech");
        break;
      case "giveaway":
        $("<img>", {
          src: "https://ellexidecodes.xyz/assets/giveaway.gif"
        }).appendTo("#elle .speech");
        break;
      case "update":
        $("<img>", {
          src: "https://ellexidecodes.xyz/assets/new-update.gif"
        }).appendTo("#elle .speech");
        break;
      default:
        return;
    }
  });