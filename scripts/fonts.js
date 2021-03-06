function logError(text) {
  console.log("%c[E R R O R]: %c" + text, "color: red; font-weight: bold;font-family: monospace", "color: black; font-family: monospace");
}

function logSuccess(text) {
  console.log("%c[S U C C E S S]: %c"+text, "color: green; font-weight: bold; font-family: monospace", "color:black; font-family: monospace");
}

function logPending(text) {
  console.log("%c[P R O C E S S I N G]: %c"+text, "color: yellow; font-weight: bold; font-family: monospace", "color:black; font-family: monospace");
}

$.ajax({
  url: "https://ellexidecodes.xyz/styles/fancy-fonts.css",
  dataType: "text",
  success: function(data) {
    logSuccess("Caught fonts!");
    logPending("Appending...");

    var fonts = $("<style>", {
      text: data,
      id: "fancyFonts",
    });

    var quotes = ["Hold me close and hold me fast. This magic spell you cast.", "When you press me to your heart, we're in a worl apart. A world where roses bloom", "And when you speak angels sing from above. Everyday words seem to turn into love songs.", "What's the matter with you, baby? You look really sad.", "Marry a rich boy. Be a rich girl. Buy a big house, on top of the world.", "Why are you so angry? Have I done something bad? If it isn't me, then sing me your song.", "Play nice, dress up, don't forget your make up. You really should impress him, once you take your medicine", "If I'm in a crowd, do I stand alone? You know all the words but don't sing along.", "I want to make you mine and take you everywhere I go.", "I don't need a camera to see your point of view. I need someone to turn to.", "I guess my heart never learns. No use in finding the words.", "You're never here when it hurts. 'Cause I'm a joke waiting for the punchline."];
    var lastQuote = Math.floor(Math.random() * Math.floor(quotes.length)), nextQuote = null,
    allFonts = [];

   while(data.includes("font-family")) { 
      var font = data.slice(data.search("font-family") + 12, data.search(";"));
      data = data.slice(data.search("}")+1);
      allFonts.push(font);
    }

    $("head").append(fonts);
    logSuccess("Append successful! Enjoy your fonts.");

    logPending("Processing font link and preview...");
    $("#fonts p:nth-of-type(2)").append($("<textarea>", {
      text: '<link href="https://ellexidecodes.github.io/Profile-Codes/free/fancy-fonts.css" rel="stylesheet">',
      readonly: ""
    }));

    $("#fonts .scroller").append($("<div>",{
      class: "flexBox"
    }));

    for(var i = 0; i < allFonts.length; i++) {
      var preview = $("<div>", {
        class: "fontContainer"
      }), quote;

      if(nextQuote == null) {
        nextQuote = lastQuote;
        quote = quotes[lastQuote];
      } else if (nextQuote == lastQuote) {
        while(nextQuote == lastQuote) {
          nextQuote = Math.floor(Math.random() * Math.floor(quotes.length));
        }
        quote = quotes[nextQuote];
        lastQuote = nextQuote;
      } else {
        logError("There was a weird error picking quotes. Check your loop.");
      }
      
      $("#fonts .scroller .flexBox").append(preview)

      $("<div>", {
        class: "fontName",
        text: allFonts[i].slice(2, allFonts[i].length-1)
      }).appendTo(".fontContainer:last-child");

      $("<br>").appendTo(".fontContainer:last-child .fontName");
      $(".fontContainer:last-child .fontName").append("<span>Set preview font size: </span>");
      
      $("<input>", {
        class: "size",
        type: "number",
        step: "1",
        min: "10",
        keyup: function () {
          var parent = $(this).parent().parent();
          parent.find(".scroller").css("font-size", `${$(this).val()}px`)
        }
      }).appendTo(".fontContainer:last-child .fontName");

      $("<div>", {
        class: "fontPrev",
        style: `font-family: ${allFonts[i]}`
      }).appendTo(".fontContainer:last-child");
      
      $("<div>", {
        class: "scrollerWrap font"
      }).appendTo(".fontContainer:last-child .fontPrev");
      
      $("<div>", {
        class: "scroller",
        contenteditable: "true",
        text: quote
      }).appendTo(".fontContainer:last-child .fontPrev .scrollerWrap");
    }

    logSuccess("Loaded all previews!");
  },
  error: function(txtStat, err) {
    logError("Problem loading fonts. Please check your function.")
  }
})