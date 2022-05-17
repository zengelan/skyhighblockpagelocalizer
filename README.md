# skyhighblockpagelocalizer
JS localizer for Skyhigh SSE SWG block, warn and coaching pages

## CDN Links
You can inlcude it from these locations which directly serve from github:
* Fixed version
https://cdn.jsdelivr.net/gh/zengelan/skyhighblockpagelocalizer@v1.0/skyhighblockpagelocalizer.js
* Latest version in main branch (don't use in production)
https://cdn.jsdelivr.net/gh/zengelan/skyhighblockpagelocalizer/skyhighblockpagelocalizer.js

## Example for Web Policy Code view

The originial block in code view, in the default policy named Threat Protection
 / Anti-Malware
 was:

    // Block If Virus Was Found
    IF MWG.BodyInfected (gam) THEN {
        MWG.Block (McAfee_Malware_found, "Block If Virus Was Found", "Gateway Anti-Malware")
    }
    
Now this was changed to the following to work

    // Block If Virus Was Found
    IF MWG.BodyInfected (gam) THEN {
        // Use custom block page instead to allow localization
        // MWG.Block (McAfee_Malware_found, "Block If Virus Was Found", "Gateway Anti-Malware")
        STRING customBlockPage_Reason = "Page identified as having malware, spyware, or phishing"
        STRING customBlockPage_HTMLSection = "<script src=\"https://cdn.jsdelivr.net/gh/zengelan/skyhighblockpagelocalizer/skyhighblockpagelocalizer.js\" type=\"application/javascript\"></script>"
        MWG.Block (McAfee_Custom_Block_Page, "Block If Virus Was Found", "Gateway Anti-Malware")
    }

## ToDo:
* Need to find a way to host the json files
* add the prefix path to the json files as a varibale into the custom html for the block page and then read it from the javscript

Have a lot of fun