// Dictionary of preconfigured User Agents and their metadata
const USER_AGENTS = {
  chrome_win: {
    name: "Chrome (Windows)",
    ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    isChromium: true,
    brand: "Chrome",
    platform: "Windows",
    isMobile: false
  },
  chrome_mac: {
    name: "Chrome (macOS)",
    ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    isChromium: true,
    brand: "Chrome",
    platform: "macOS",
    isMobile: false
  },
  firefox_win: {
    name: "Firefox (Windows)",
    ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:127.0) Gecko/20100101 Firefox/127.0",
    isChromium: false
  },
  firefox_mac: {
    name: "Firefox (macOS)",
    ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:127.0) Gecko/20100101 Firefox/127.0",
    isChromium: false
  },
  safari_mac: {
    name: "Safari (macOS)",
    ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15",
    isChromium: false
  },
  safari_ios: {
    name: "Safari (iOS / iPhone)",
    ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1",
    isChromium: false
  },
  edge_win: {
    name: "Edge (Windows)",
    ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0",
    isChromium: true,
    brand: "Edge",
    platform: "Windows",
    isMobile: false
  },
  opera_win: {
    name: "Opera (Windows)",
    ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 OPR/111.0.0.0",
    isChromium: true,
    brand: "Opera",
    platform: "Windows",
    isMobile: false
  },
  brave_win: {
    name: "Brave (Windows)",
    ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    isChromium: true,
    brand: "Brave",
    platform: "Windows",
    isMobile: false
  },
  android_chrome: {
    name: "Android (Chrome Mobile)",
    ua: "Mozilla/5.0 (Linux; Android 14; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36",
    isChromium: true,
    brand: "Chrome",
    platform: "Android",
    isMobile: true
  },
  edge_mac: {
    name: "Edge (macOS)",
    ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0",
    isChromium: true,
    brand: "Edge",
    platform: "macOS",
    isMobile: false
  },
  chrome_linux: {
    name: "Chrome (Linux)",
    ua: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    isChromium: true,
    brand: "Chrome",
    platform: "Linux",
    isMobile: false
  },
  firefox_linux: {
    name: "Firefox (Linux)",
    ua: "Mozilla/5.0 (X11; Linux x86_64; rv:127.0) Gecko/20100101 Firefox/127.0",
    isChromium: false
  },
  edge_linux: {
    name: "Edge (Linux)",
    ua: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0",
    isChromium: true,
    brand: "Edge",
    platform: "Linux",
    isMobile: false
  },
  brave_linux: {
    name: "Brave (Linux)",
    ua: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    isChromium: true,
    brand: "Brave",
    platform: "Linux",
    isMobile: false
  },
  brave_mac: {
    name: "Brave (macOS)",
    ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    isChromium: true,
    brand: "Brave",
    platform: "macOS",
    isMobile: false
  },
  opera_mac: {
    name: "Opera (macOS)",
    ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 OPR/111.0.0.0",
    isChromium: true,
    brand: "Opera",
    platform: "macOS",
    isMobile: false
  },
  opera_linux: {
    name: "Opera (Linux)",
    ua: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 OPR/111.0.0.0",
    isChromium: true,
    brand: "Opera",
    platform: "Linux",
    isMobile: false
  },
  ie_11: {
    name: "Internet Explorer 11",
    ua: "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko",
    isChromium: false
  }
};

const RULE_ID = 1;

// Function to update declarativeNetRequest dynamic rules
async function updateNetRules() {
  try {
    const data = await chrome.storage.local.get({
      enabled: false,
      selectedUA: "chrome_win",
      customUAValue: ""
    });

    if (!data.enabled) {
      // Remove rule if disabled
      await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [RULE_ID]
      });
      console.log("UA Spoofing disabled: Rules removed.");
      return;
    }

    let activeUA = "";
    let isChromium = false;
    let brand = "";
    let platform = "";
    let isMobile = false;

    if (data.selectedUA === "custom") {
      activeUA = data.customUAValue || "Mozilla/5.0";
      // For custom UAs, we guess Chromium status or simply strip Client Hints to be safe
      isChromium = activeUA.includes("Chrome") && !activeUA.includes("Firefox") && !activeUA.includes("Safari");
      if (isChromium) {
        brand = activeUA.includes("Edg/") ? "Edge" : (activeUA.includes("OPR/") ? "Opera" : "Chrome");
        platform = activeUA.includes("Windows") ? "Windows" : (activeUA.includes("Android") ? "Android" : (activeUA.includes("Macintosh") ? "macOS" : "Linux"));
        isMobile = activeUA.includes("Mobile");
      }
    } else {
      const config = USER_AGENTS[data.selectedUA];
      if (config) {
        activeUA = config.ua;
        isChromium = config.isChromium;
        brand = config.brand || "";
        platform = config.platform || "";
        isMobile = config.isMobile || false;
      } else {
        // Fallback
        activeUA = USER_AGENTS.chrome_win.ua;
        isChromium = true;
        brand = "Chrome";
        platform = "Windows";
      }
    }

    const requestHeaders = [
      { header: "user-agent", operation: "set", value: activeUA }
    ];

    // Client hint headers to remove if not a spoofed Chromium browser
    const clientHintHeaders = [
      "sec-ch-ua",
      "sec-ch-ua-mobile",
      "sec-ch-ua-platform",
      "sec-ch-ua-platform-version",
      "sec-ch-ua-model",
      "sec-ch-ua-arch",
      "sec-ch-ua-bitness",
      "sec-ch-ua-full-version",
      "sec-ch-ua-full-version-list"
    ];

    if (isChromium) {
      // Set appropriate Client Hints for Chromium spoofing to prevent fingerprint leaks
      let chUA = '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"';
      if (brand === "Edge") {
        chUA = '"Not/A)Brand";v="8", "Chromium";v="126", "Microsoft Edge";v="126"';
      } else if (brand === "Opera") {
        chUA = '"Not/A)Brand";v="8", "Chromium";v="126", "Opera";v="111"';
      } else if (brand === "Brave") {
        chUA = '"Not/A)Brand";v="8", "Chromium";v="126", "Brave";v="126"';
      }

      requestHeaders.push(
        { header: "sec-ch-ua", operation: "set", value: chUA },
        { header: "sec-ch-ua-mobile", operation: "set", value: isMobile ? "?1" : "?0" },
        { header: "sec-ch-ua-platform", operation: "set", value: `"${platform}"` }
      );
      
      // Clean up others that might conflict
      requestHeaders.push(
        { header: "sec-ch-ua-platform-version", operation: "remove" },
        { header: "sec-ch-ua-model", operation: "remove" }
      );
    } else {
      // Strip all Client Hints if spoofing Firefox, Safari, IE, etc.
      clientHintHeaders.forEach(header => {
        requestHeaders.push({ header: header, operation: "remove" });
      });
    }

    const rule = {
      id: RULE_ID,
      priority: 1,
      action: {
        type: "modifyHeaders",
        requestHeaders: requestHeaders
      },
      condition: {
        urlFilter: "*",
        resourceTypes: [
          "main_frame", "sub_frame", "stylesheet", "script", "image",
          "font", "object", "xmlhttprequest", "ping", "csp_report",
          "media", "websocket", "other"
        ]
      }
    };

    // Update dynamic rules: remove old rule and add the new one
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [RULE_ID],
      addRules: [rule]
    });

    console.log(`UA Spoofing active. Spoofed as: ${activeUA}`);
  } catch (error) {
    console.error("Error updating declarativeNetRequest rules:", error);
  }
}

// Listen to storage changes to update rules dynamically
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && (changes.enabled || changes.selectedUA || changes.customUAValue)) {
    updateNetRules();
  }
});

// Run rules update on installation and startup
chrome.runtime.onInstalled.addListener(() => {
  // Initialize default storage values if not set
  chrome.storage.local.get(["enabled", "selectedUA", "customUAValue"], (data) => {
    const updates = {};
    if (data.enabled === undefined) updates.enabled = false;
    if (data.selectedUA === undefined) updates.selectedUA = "chrome_win";
    if (data.customUAValue === undefined) updates.customUAValue = "";
    
    if (Object.keys(updates).length > 0) {
      chrome.storage.local.set(updates, () => {
        updateNetRules();
      });
    } else {
      updateNetRules();
    }
  });
});

chrome.runtime.onStartup.addListener(() => {
  updateNetRules();
});
