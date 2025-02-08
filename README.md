# Stalker Plugin

## Overview
The **Stalker Plugin** is a Tampermonkey userscript designed to block specific network requests on Instagram. It prevents the platform from tracking certain user interactions by intercepting fetch API requests and XMLHttpRequests related to **PolarisStoriesV3SeenMutation.graphql**.

## Features
✅ **Blocks fetch requests** – Prevents specific tracking requests from being sent.  
✅ **Intercepts XMLHttpRequests** – Stops certain Instagram story seen tracking.  
✅ **Lightweight & Efficient** – Runs silently in the background with minimal impact.  

## How It Works
### 1. **Intercepting Fetch Requests**
- Saves a reference to the original `fetch` function.
- Checks if the requested URL contains `PolarisStoriesV3SeenMutation.graphql`.
- If it matches, blocks the request and returns an empty response with a `204 No Content` status.

### 2. **Blocking XMLHttpRequests**
- Hooks into `XMLHttpRequest.prototype.open` to track requested URLs.
- Hooks into `XMLHttpRequest.prototype.send` to inspect outgoing requests.
- If the request URL contains `PolarisStoriesV3SeenMutation.graphql`, it is aborted before being sent.

## Installation & Usage
1. Install [Tampermonkey](https://www.tampermonkey.net/) for your browser.
2. Create a new userscript and copy-paste the provided code.
3. Save and enable the script.
4. Visit Instagram and enjoy the functionality!

## Code Snippet
```javascript
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
```

## Disclaimer
This script is for educational purposes only. Use responsibly and respect platform terms of service.

## Credits
- **Author:** CNR  
- **Contributors:** ChatGPT & CNR  
- **Tampermonkey Documentation:** [tampermonkey.net](https://www.tampermonkey.net/)

