$(document).ready(()=>{
  $(".scroller").mCustomScrollbar({
    autoHideScrollbar: true,
    scrollButtons: {
      enable: false
    },
    theme: "inset-2"
  });

  function hello() {
    $.getJSON("./profiles.json", function(result) {
      $.each(result, function(i, field) {
        $("body").append(field + " ");
      })
    })
  };

  hello();
});