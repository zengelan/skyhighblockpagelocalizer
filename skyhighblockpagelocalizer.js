// skyhighblockpagelocalizer

// load jquery library
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.0.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

function helloWorld() {
  console.info("Hello World");
}

function loadLanguage(lang){
  (function() {
    var langfileUrl = "./" + lang + ".json";
    console.debug("Loading language file ", langfileUrl)
    $.getJSON( langfileUrl)
        .done(function( data ) {
          $.each( data.items, function( i, item ) {
            $( "<img>" ).attr( "src", item.media.m ).appendTo( "#images" );
            if ( i === 3 ) {
              return false;
            }
          });
        });
  })();
}

function localize(inEvent) {
  console.debug("starting localize, from event:");
  console.debug(inEvent);
  var lang= getLang();
  loadLanguage(lang);
  console.debug("my lang is",lang);
  console.debug("done with localize");
}

function getLang() {
  var mylang = "en"; // set default language
  if (navigator.languages != undefined)
    mylang = navigator.languages[1]; 
  else {
    try {
      mylang = navigator.language;
    } catch (error) { }
  }
  return mylang.substring(0,2);
}
  
// attach the event handler
window.onload = (event) => {
  console.debug('page is fully loaded');
  localize(event);
};



//
