// ==UserScript==
// @name         Stalker Ploogin
// @version      0.1
// @namespace    http://tampermonkey.net/
// @description  fucking retards
// @author       CNR
// @match        https://www.instagram.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const originalFetch = window.fetch;
    window.fetch = function(input, init) {
        let url = "";
        if (typeof input === "string") {
            url = input;
        } else if (input && typeof input.url === "string") {
            url = input.url;
        }
        if (url.includes("PolarisStoriesV3SeenMutation.graphql")) {
            console.log("Blocked fetch request to:", url);
            return Promise.resolve(new Response(null, {status: 204, statusText: "No Content"}));
        }
        return originalFetch.apply(this, arguments);
    };

    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
        this._url = url;
        return originalOpen.call(this, method, url, async, user, password);
    };

    const originalSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function(body) {
        if (this._url && this._url.includes("PolarisStoriesV3SeenMutation.graphql")) {
            console.log("Blocked XMLHttpRequest to:", this._url);
            this.abort();
            return;
        }
        return originalSend.call(this, body);
    };
})();
