// ==UserScript==
// @name         Stalker Ploogin
// @version      0.2
// @namespace    http://tampermonkey.net/
// @description  Block the new PolarisStoriesV3SeenMutation.graphql requests
// @author       CNR
// @match        https://www.instagram.com/*
// @grant        none
// ==/UserScript==

// i figured you could just block the send only and block anything relating to viewseenat since its a string
// so it is greatly optomizied compared the old script

(function() {
    var penissend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function() {
        if (typeof arguments[0] === "string" && arguments[0].includes("viewSeenAt")) {
        } else {
            penissend.apply(this, arguments);
        }
    };
})();

