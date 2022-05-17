// skyhighblockpagelocalizer

// load jquery library
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.0.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

function helloWorld() {
    console.info("Hello World");
}

function changeTitle(newTitle) {
    // find and change the well known title
    var titleSpan = $("body > div > div.header > span.title");
    console.debug("mytitle:", titleSpan.html());
    titleSpan.html(newTitle);
}

function loadLanguage(lang) {
    (function () {
        var langfileUrl = "../" + lang + ".json";
        console.debug("Loading language file ", langfileUrl)
        $.getJSON(langfileUrl)
            .done(function (data) {
                // 1. Load error reasons
                var reason = $("#block-page-message").text().toString();
                $.each(data.reasons, function (i, v) {
                    console.debug("reason org:", i, "reason new:", v);
                    if (reason.indexOf(i) !== -1) {
                        // now changing content
                        if (v != undefined && v){
                            console.debug("Setting reason to", v)
                            reason.html('\n'+v+'\n');
                        }
                    }
                });
                // 2. go through well known places
                $.each(data.wellknown, function (i, v) {
                    console.debug("item:", i, "value:", v);
                    if (i === "title") {
                        changeTitle(v);
                    } else {
                        // iterate by id
                        var item = $("#" + i);
                        if (item != undefined && item.html() != undefined && item.html()) {
                            // found item with the id, now changing content
                            if (v != undefined && v){
                                console.debug("Found item with id", i, "changing to", v)
                                item.html('\n'+v+'\n');
                            }
                        }
                    }
                });
                // 3. go through typical table columns
                $.each(data.tableentries, function (i, v) {
                    console.debug("item:", i, "value:", v);
                });
            });
    })();
}

function localize(inEvent) {
    console.debug("starting localize, from event:");
    console.debug(inEvent);
    var lang = getLang();
    loadLanguage(lang);
    console.debug("my lang is", lang);
    console.debug("done with localize");
}

function getLang() {
    var mylang = "en"; // set default language
    if (navigator.languages != undefined)
        mylang = navigator.languages[2];
    else {
        try {
            mylang = navigator.language;
        } catch (error) {
        }
    }
    return mylang.substring(0, 2);
}

// attach the event handler
window.onload = (event) => {
    console.debug('page is fully loaded');
    localize(event);
};


//
