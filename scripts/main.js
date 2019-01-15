$(document).ready(()=>{
  $(".scroller").mCustomScrollbar({
    autoHideScrollbar: true,
    scrollButtons: {
      enable: false
    },
    theme: "inset-2"
  });

  function hello() {
    $.getJSON("./scripts/profiles.json", function(result) {
      $.each(result, function(field) {
        $("body").append(field.name + " " + field.preview + "<br>");
      })
    })
  };

  hello();
});