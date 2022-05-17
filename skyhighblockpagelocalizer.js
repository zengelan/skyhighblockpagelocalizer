// skyhighblockpagelocalizer

// load jquery library
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.0.slim.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

function helloWorld() {
    console.info("Hello World");
}

function matches(inStrOne, inStrTwo) {
    // a pretty careful, sensible and case-sensitive substring match function
    if (typeof (inStrOne) === 'string' && inStrOne != undefined && inStrOne) {
        if (typeof (inStrTwo) === 'string' && inStrTwo != undefined && inStrTwo) {
            if (inStrOne.indexOf(inStrTwo) !== -1) {
                return true;
            }
        }
    }
    return false;
}

function getReplacement(orgString, replacementArray) {
    // check if we have a match in the array and return the replacement
    var result=null;
    $.each(replacementArray, function (k, v) {
        console.debug("k:", k, "v", v);
        if (matches(orgString, k)) {
            return result = v;
        }
    });
    return result;
}

function changeTitle(newTitle) {
    // find and change the well known title
    var titleSpan = $("body > div > div.header > span.title");
    console.debug("mytitle:", titleSpan.html());
    titleSpan.html(newTitle);
}

function changeAdminMessage(newAdminMessage) {
    // find and change the well known Admin message field
    var adminMessageSpan = $("body > div > div.body-container > div.content > div.admin-message-box > span");
    console.debug("adminMessageSpan:", adminMessageSpan.html());
    adminMessageSpan.html(newAdminMessage);
}

function changeMoreDetails(newMoreDetailsLabel) {
    // Replace moreDetails label
    var moreDetailsTrigger = $("#more-details-trigger");
    // toggle the class, as otherwise the default css would add the 'More Details' string as ::before
    moreDetailsTrigger.toggleClass("more-details-trigger");
    // change to the new text
    moreDetailsTrigger.text(newMoreDetailsLabel);
}

function replaceTableColumnLabel(labelText, newLabelText) {
    // find and change the labels on the detail message table
    // "#block-page-details-grid > tbody > tr:nth-child(1) > td:nth-child(1) > span"
    var table = $("#block-page-details-grid > tbody");
    table.find('tr').each(function (i) {
        var tds = $(this).find('td');
        var orgLabel = tds.eq(0).find('span').first().text();
        console.debug("orgLabel:", orgLabel);
        if (orgLabel != undefined && orgLabel && orgLabel.indexOf(labelText) !== -1) {
            console.debug("replacing label:", orgLabel, "with", newLabelText);
            tds.eq(0).find('span').first().text(newLabelText);
        }
    });

}

function getDetailTableRowByLabel(columnLabel) {
    // find and return the whole row attribute where we find the matching label
    // "#block-page-details-grid > tbody > tr:nth-child(1) > td:nth-child(1) > span"
    var table = $("#block-page-details-grid > tbody");
    var theRow;
    theRow = table.find('tr').each(function (i) {
        var theTableRow = $(this);
        var tds = theTableRow.find('td');
        var orgLabel = tds.eq(0).find('span').first().text();
        console.debug("orgLabel:", orgLabel);
        if (orgLabel != undefined && orgLabel && orgLabel.indexOf(columnLabel) !== -1) {
            return theTableRow;
        }
    });
    return theRow;
}

function changeValueInRow(inRowAttr, newValue) {
    var tds = inRowAttr.find('td');
    var valueTd = tds.eq(1).find('span').first();
    console.debug("orgValue:", valueTd.text());
    if (valueTd != undefined && valueTd) {
        valueTd.text(newValue);
    }
}



function loadLanguage(lang) {
    (function () {
        var langfileUrl = "../" + lang + ".json";
        console.debug("Loading language file ", langfileUrl)
        $.getJSON(langfileUrl)
            .done(function (data) {
                // 1. go through well known places
                $.each(data.wellKnownSections, function (i, v) {
                    console.debug("item:", i, "value:", v);
                    if (i === "title") {
                        changeTitle(v);
                    } else if (i === "adminMessage") {
                        changeAdminMessage(v);
                    } else if (i === "more-details-trigger") {
                        changeMoreDetails(v);
                    } else {
                        // iterate by id
                        var item = $("#" + i);
                        if (item != undefined && item.html() != undefined && item.html()) {
                            // found item with the id, now changing content
                            if (v != undefined && v) {
                                console.debug("Found item with id", i, "changing to", v);
                                item.html('\n' + v + '\n');
                            } else {
                                console.warn("Did not find wellKnownSections item named", i);
                            }
                        }
                    }
                });
                // 2. Replace blockPageMessages
                var blockPageMessage = $("#block-page-message");
                var blockPageMessageNew = getReplacement(blockPageMessage.text(), data.blockPageMessagesReplacements);
                if (blockPageMessageNew != undefined && blockPageMessageNew) {
                    blockPageMessage.html('\n' + blockPageMessageNew + '\n');
                }
                // 3. Replace error reasons, need to do this before localizing the column labels
                var reasonRow = getDetailTableRowByLabel("Reason:");
                var reasonTextNew = getReplacement(reasonRow.eq(0).find('td').eq(1).find('span').first().text(), data.reasonReplacements);
                if (reasonTextNew != undefined && reasonTextNew) {
                    reasonRow.eq(0).find('td').eq(1).find('span').first().text(reasonTextNew);
                }
                // 4. go through typical table column labels
                $.each(data.tableColumnLabels, function (k, v) {
                    console.debug("Replacing table column label named:", k, "with value:", v);
                    replaceTableColumnLabel(k, v);
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
