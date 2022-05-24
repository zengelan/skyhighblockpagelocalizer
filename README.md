# skyhighblockpagelocalizer
JS localizer for Skyhigh SSE SWG block, warn and coaching pages

## CDN Links
You can include it from these locations which directly serve from github:
* Fixed version
https://cdn.jsdelivr.net/gh/zengelan/skyhighblockpagelocalizer@v1.0/skyhighblockpagelocalizer.js
* Latest version in main branch (don't use in production)
https://cdn.jsdelivr.net/gh/zengelan/skyhighblockpagelocalizer@latest/skyhighblockpagelocalizer.js
or https://bit.ly/3a7K8sX

## Example for Web Policy Code view

The originial block in code view, in the default policy named Threat Protection
 / Anti-Malware
 is:

    // Block If Virus Was Found
    IF MWG.BodyInfected (gam) THEN {
        MWG.Block (McAfee_Malware_found, "Block If Virus Was Found", "Gateway Anti-Malware")
    }
    
Now change this to the following to apply localization using the latest version

    // Block If Virus Was Found
    IF MWG.BodyInfected (gam) THEN {
        // Use custom block page to allow localization
        STRING customBlockPage_Reason = "Page identified as having malware, spyware, or phishing"
        STRING customBlockPage_HTMLSection = "<script src=\"https://bit.ly/3a7K8sX\" type=\"application/javascript\"></script>"
        MWG.Block (McAfee_Custom_Block_Page, "Block If Virus Was Found", "Gateway Anti-Malware")
    }
    
If you want to customize the location where the language files should be loaded from, add a hidden <span> tag like this

    <span id="langFilesLoc" hidden data-loc="https://cdn.jsdelivr.net/gh/EXAMPLE/shnlangfiles/"></span>
    
the localization script will read the prefix for the language files then from the data-loc attribute of this tag and prepend the language code (e.g. de,jp,fr) and .json

    // Block If Virus Was Found
    IF MWG.BodyInfected (gam) THEN {
        // Use custom block page to allow localization
        STRING customBlockPage_Reason = "Page identified as having malware, spyware, or phishing"
        STRING customBlockPage_HTMLSection = "<span id=\"langFilesLoc\" hidden data-loc=\"https://cdn.jsdelivr.net/gh/EXAMPLE/shnlangfiles/\"></span>" +
            "<script src=\"https://cdn.jsdelivr.net/gh/zengelan/skyhighblockpagelocalizer/skyhighblockpagelocalizer.js\" type=\"application/javascript\"></script>"
        MWG.Block (McAfee_Custom_Block_Page, "Block If Virus Was Found", "Gateway Anti-Malware")
    }

TODO:
* Finish docs
* Add more languages

Have a lot of fun