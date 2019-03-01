$(document).ready(()=>{
var curIndex, images;

  $("body").append($("<div />", {
    id: "tooltips"
  }));

  function hello() {
    $.getJSON("./scripts/profiles.json", function(result) {
      $.each(result, function(field) {
        console.log("appending...");
        var size = result[field].length;
        $("#gallery .scroller").append($("<h2>", {
          html: `${field} &nbsp &nbsp <i class="blurple">${size}</i>`
        }));
        $("#gallery .scroller").append($("<div>", {
          class: `flexBox ${field}`,
          style: "margin-bottom: 5vh;"
        }));
        if(field !== "free") {
          for(i = 0; i < size; ++i){
            var picture = result[`${field}`][i]['preview'];
            $("<div />", {
              class: `item ${field}`,
              img: picture,
              style: `background-image: url(${picture})`,
              name: result[`${field}`][i]['name'],
              click: function() {
                curIndex = $(this).index();
                images = $(`.item.${field}`).length;
                
                function changePicture(ind) {
                  var newPic = $(`.item.${field}`).eq(ind).attr("img");
              
                  $("#gallOverlay img").attr("src", `${newPic}`);
                }

                $("<div />", {
                  id: "gallOverlay"
                }).insertBefore("#tooltips");

                $("<div />", {
                  class: "flexBox"
                }).appendTo("#gallOverlay");

                $("<div />", {
                  id: "gallExit",
                  click: function() {
                    $("#gallOverlay").fadeOut(200);
                      setTimeout(function(){
                      $("#gallOverlay").remove();
                    }, 200);
                  }
                }).appendTo("#gallOverlay .flexBox")

                $("<div />", {
                  class: "prev",
                  click: function() {
                    if(curIndex !== 0) {
                    --curIndex;
                    changePicture(curIndex)
                    } else {
                      curIndex = images - 1;
                      changePicture(curIndex)
                    }
                  }
                }).appendTo("#gallOverlay .flexBox");

                $("<img>", {
                  src: $(this).attr("img")
                }).appendTo("#gallOverlay .flexBox");

                $("<div />", {
                  class: "next",
                  click: function() {
                    if(curIndex !== (images - 1)) {
                      ++curIndex;
                      changePicture(curIndex)
                    } else {
                      curIndex = 0;
                      changePicture(curIndex)
                    }
                  }
                }).appendTo("#gallOverlay .flexBox");
              },
              mouseenter: function() {
                var tipPosition = $(this).offset();
                var width = $(this).outerWidth();
  
                $("#tooltips").append($("<div />", {
                  class: `tooltip top`,
                  style: `top: ${tipPosition.top}px; left: ${tipPosition.left + width/2}px`,
                  html: $(this).attr("name")
                }));
              },
              mouseleave: function() {
                $(".tooltip").remove();
              }
            }).appendTo(`.flexBox.${field}`);
            // `Profile owner: ${result[`${field}`][i]['name']} || Preview: ${result[`${field}`][i]['preview']}`
          }
        } else {
          for(i = 0; i < size; ++i){
            var picture = result[`${field}`][i]['preview'];
            $("<div />", {
              class: `item ${field}`,
              style: `background-image: url(${picture})`,
              img: picture,
              name: result[`${field}`][i]['name'],
              code: result[`${field}`][i]['code'],
              click: function() {
                curIndex = $(this).index();
                images = $(`.item.${field}`).length;
                
                function changePicture(ind) {
                  var newPic = $(`.item.${field}`).eq(ind).attr("img"),
                  newCode = $(`.item.${field}`).eq(ind).attr("code");
              
                  $("#gallOverlay img").attr("src", `${newPic}`);
                  $("#gallOverlay .source").attr("opens", newCode);
                }

                $("<div />", {
                  id: "gallOverlay"
                }).insertBefore("#tooltips");

                $("<div />", {
                  class: "flexBox"
                }).appendTo("#gallOverlay");

                $("<div />", {
                  id: "gallExit",
                  click: function() {
                    $("#gallOverlay").fadeOut(200);
                      setTimeout(function(){
                      $("#gallOverlay").remove();
                    }, 200);
                  }
                }).appendTo("#gallOverlay .flexBox")

                $("<div />", {
                  class: "prev",
                  click: function() {
                    if(curIndex !== 0) {
                    --curIndex;
                    changePicture(curIndex)
                    } else {
                      curIndex = images - 1;
                      changePicture(curIndex)
                    }
                  }
                }).appendTo("#gallOverlay .flexBox");

                $("<div />", {
                  class: "imageHolder"
                }).appendTo("#gallOverlay .flexBox");

                $("<img>", {
                  src: $(this).attr("img")
                }).appendTo("#gallOverlay .flexBox .imageHolder");

                $("<div />", {
                  class: "source",
                  opens: $(this).attr("code"),
                  html: "<span>View Source</span>",
                  click: function () {
                    var url = $(this).attr("opens");

                    $.ajax({
                      url: url,
                      dataType: 'text',
                      success: function (data) {
                        $("body").append($("<div />", {
                          id: "code"
                        }));

                        $("<div />", {
                          class: "scrollerWrap"
                        }).appendTo("#code");

                        $("<div />", {
                          class: "scroller"
                        }).appendTo("#code .scrollerWrap");

                        $("<textarea>", {
                          text: data,
                          readonly: ""
                        }).appendTo("#code .scroller");

                        $("<div />", {
                          class: "exit",
                          click: function() {
                            $("#code").fadeOut(200);
                            setTimeout(function(){
                              $("#code").remove();
                            }, 200);
                          }
                        }).appendTo("#code");

                        $("<div />", {
                          class: "choices"
                        }).appendTo("#code")

                        $("<div />", {
                          class: "choice",
                          html: "CSS Only",
                          click: function() {
                            var cssEnd = data.search("/style") - 1,
                            subString = data.slice(7, cssEnd);

                            $("#code textarea").val(subString);
                          }
                        }).appendTo("#code .choices");

                        $("<div />", {
                          class: "choice",
                          html: "HTML Only",
                          click: function() {
                            var htmlStart = data.search("/style") + 7,
                            subString = data.slice(htmlStart);

                            $("#code textarea").val(subString);
                          }
                        }).appendTo("#code .choices");

                        $("<div />", {
                          class: "choice",
                          html: "Show Full Code",
                          click: function() {
                            $("#code textarea").val(data);
                          }
                        }).appendTo("#code .choices");

                        $("<div />", {
                          class: "choice",
                          html: "Copy Code",
                          click: function() {
                            $("#code textarea").select();
                            document.execCommand("copy");
                            $(this).html("Code copied!");
                            if (window.getSelection) {
                              window.getSelection().removeAllRanges();
                            } else if (document.selection) {
                              document.selection.empty();
                            }

                            setTimeout(function(){
                              $("#code .choices .choice:last-child").html("Copy Code");
                            }, 2000);
                          }
                        }).appendTo("#code .choices");
                      },
                      error: function() {
                        console.log("Welp....");
                      }
                    })
                  }
                }).appendTo("#gallOverlay .flexBox .imageHolder");

                $("<div />", {
                  class: "next",
                  click: function() {
                    if(curIndex !== (images - 1)) {
                      ++curIndex;
                      changePicture(curIndex)
                    } else {
                      curIndex = 0;
                      changePicture(curIndex)
                    }
                  }
                }).appendTo("#gallOverlay .flexBox");
              },
              mouseenter: function() {
                var tipPosition = $(this).offset();
                var width = $(this).outerWidth();
  
                $("#tooltips").append($("<div />", {
                  class: `tooltip top`,
                  style: `top: ${tipPosition.top}px; left: ${tipPosition.left + width/2}px`,
                  html: $(this).attr("name")
                }));
              },
              mouseleave: function() {
                $(".tooltip").remove();
              }
            }).appendTo(`.flexBox.${field}`);
          }
        }
        $("#gallery .scroller").append($("<hr>"));
        });
      });
    };

    /*$(".button").click(function(){
      console.log('click');
      if($(this).attr("opens") == "#gallery") {
        hello();
      }
    });*/
    hello();
});