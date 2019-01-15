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
        var size = field.length;
        for(i = 0; i < size; ++i) {
          $("body").append(`
          This is a ${field}. The name of the profile owner is ${field[i].name}. You can find their profile here: ${field[i].preview}. Please work.
          `)
        }
      })
    })
  };

  hello();
});