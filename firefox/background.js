// Dictionary of Operating Systems and Browsers configurations
const OS_CONFIGS = {
  windows: {
    name: "Windows",
    platform: "Win32",
    chPlatform: "Windows",
    chPlatformVersion: "15.0.0",
    isMobile: false,
    osToken: "Windows NT 10.0; Win64; x64"
  },
  macos: {
    name: "macOS",
    platform: "MacIntel",
    chPlatform: "macOS",
    chPlatformVersion: "14.5.0",
    isMobile: false,
    osToken: "Macintosh; Intel Mac OS X 10_15_7"
  },
  linux: {
    name: "Linux",
    platform: "Linux x86_64",
    chPlatform: "Linux",
    chPlatformVersion: "6.8.0",
    isMobile: false,
    osToken: "X11; Linux x86_64"
  },
  ios: {
    name: "iOS",
    platform: "iPhone",
    chPlatform: "iOS",
    chPlatformVersion: "17.5.1",
    isMobile: true,
    osToken: "iPhone; CPU iPhone OS 17_5 like Mac OS X"
  },
  android: {
    name: "Android",
    platform: "Linux armv8l",
    chPlatform: "Android",
    chPlatformVersion: "14.0.0",
    isMobile: true,
    osToken: "Linux; Android 14; K"
  }
};

const BROWSER_NAMES = {
  chrome: "Chrome",
  firefox: "Firefox",
  brave: "Brave",
  opera: "Opera",
  edge: "Edge",
  safari: "Safari",
  ie_11: "Internet Explorer 11"
};

function resolveUserAgent(osKey, browserKey) {
  const os = OS_CONFIGS[osKey] || OS_CONFIGS.windows;
  const browser = browserKey || "chrome";

  let ua = "";
  let isChromium = false;
  let brand = "";
  let isMobile = os.isMobile;
  let platform = os.platform;
  let chPlatform = os.chPlatform;

  switch (browser) {
    case "chrome":
      isChromium = true;
      brand = "Chrome";
      if (osKey === "ios") {
        ua = `Mozilla/5.0 (${os.osToken}) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/126.0.6478.108 Mobile/15E148 Safari/604.1`;
      } else if (osKey === "android") {
        ua = `Mozilla/5.0 (${os.osToken}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36`;
      } else {
        ua = `Mozilla/5.0 (${os.osToken}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36`;
      }
      break;

    case "firefox":
      isChromium = false;
      brand = "Firefox";
      if (osKey === "ios") {
        ua = `Mozilla/5.0 (${os.osToken}) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/127.0 Mobile/15E148 Safari/605.1.15`;
      } else if (osKey === "android") {
        ua = `Mozilla/5.0 (Android 14; Mobile; rv:127.0) Gecko/127.0 Firefox/127.0`;
      } else if (osKey === "macos") {
        ua = `Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:127.0) Gecko/20100101 Firefox/127.0`;
      } else {
        ua = `Mozilla/5.0 (${os.osToken}; rv:127.0) Gecko/20100101 Firefox/127.0`;
      }
      break;

    case "brave":
      isChromium = true;
      brand = "Brave";
      if (osKey === "ios") {
        ua = `Mozilla/5.0 (${os.osToken}) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1`;
      } else if (osKey === "android") {
        ua = `Mozilla/5.0 (${os.osToken}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36`;
      } else {
        ua = `Mozilla/5.0 (${os.osToken}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36`;
      }
      break;

    case "opera":
      isChromium = true;
      brand = "Opera";
      if (osKey === "ios") {
        ua = `Mozilla/5.0 (${os.osToken}) AppleWebKit/605.1.15 (KHTML, like Gecko) OPT/3.5.0 Mobile/15E148 Safari/604.1`;
      } else if (osKey === "android") {
        ua = `Mozilla/5.0 (${os.osToken}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36 OPR/82.0.0.0`;
      } else {
        ua = `Mozilla/5.0 (${os.osToken}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 OPR/111.0.0.0`;
      }
      break;

    case "edge":
      isChromium = true;
      brand = "Edge";
      if (osKey === "ios") {
        ua = `Mozilla/5.0 (${os.osToken}) AppleWebKit/605.1.15 (KHTML, like Gecko) EdgiOS/126.0.2592.82 Mobile/15E148 Safari/604.1`;
      } else if (osKey === "android") {
        ua = `Mozilla/5.0 (${os.osToken}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36 EdgA/126.0.0.0`;
      } else {
        ua = `Mozilla/5.0 (${os.osToken}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0`;
      }
      break;

    case "safari":
      isChromium = false;
      brand = "Safari";
      if (osKey === "ios") {
        ua = `Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1`;
      } else if (osKey === "macos") {
        ua = `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15`;
      } else {
        ua = `Mozilla/5.0 (${os.osToken}) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15`;
      }
      break;

    case "ie_11":
      isChromium = false;
      brand = "IE";
      ua = `Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko`;
      platform = "Win32";
      chPlatform = "Windows";
      break;

    default:
      isChromium = true;
      brand = "Chrome";
      ua = `Mozilla/5.0 (${os.osToken}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36`;
      break;
  }

  return {
    ua,
    name: `${BROWSER_NAMES[browser] || browser} (${os.name})`,
    isChromium,
    brand,
    platform,
    chPlatform,
    chPlatformVersion: os.chPlatformVersion,
    isMobile
  };
}

const RULE_ID = 1;

// Function to update declarativeNetRequest dynamic rules
async function updateNetRules() {
  try {
    const data = await chrome.storage.local.get({
      enabled: false,
      selectedOS: "windows",
      selectedBrowser: "chrome",
      selectedUA: "default",
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
      // For custom UAs, guess Chromium status or strip Client Hints
      isChromium = activeUA.includes("Chrome") && !activeUA.includes("Firefox") && !activeUA.includes("Safari");
      if (isChromium) {
        brand = activeUA.includes("Edg/") ? "Edge" : (activeUA.includes("OPR/") ? "Opera" : "Chrome");
        platform = activeUA.includes("Windows") ? "Windows" : (activeUA.includes("Android") ? "Android" : (activeUA.includes("Macintosh") ? "macOS" : "Linux"));
        isMobile = activeUA.includes("Mobile");
      }
    } else {
      let osKey = data.selectedOS;
      let browserKey = data.selectedBrowser;

      // Handle legacy key formats if needed
      if (!osKey || !browserKey) {
        if (data.selectedUA && data.selectedUA.includes("_")) {
          const parts = data.selectedUA.split("_");
          browserKey = parts[0];
          osKey = parts[1] === "win" ? "windows" : (parts[1] === "mac" ? "macos" : parts[1]);
        } else {
          osKey = "windows";
          browserKey = "chrome";
        }
      }

      const config = resolveUserAgent(osKey, browserKey);
      activeUA = config.ua;
      isChromium = config.isChromium;
      brand = config.brand;
      platform = config.chPlatform;
      isMobile = config.isMobile;
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
  if (area === "local" && (changes.enabled || changes.selectedOS || changes.selectedBrowser || changes.selectedUA || changes.customUAValue)) {
    updateNetRules();
  }
});

// Run rules update on installation and startup
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(["enabled", "selectedOS", "selectedBrowser", "selectedUA", "customUAValue"], (data) => {
    const updates = {};
    if (data.enabled === undefined) updates.enabled = false;
    if (data.selectedOS === undefined) updates.selectedOS = "windows";
    if (data.selectedBrowser === undefined) updates.selectedBrowser = "chrome";
    if (data.selectedUA === undefined) updates.selectedUA = "default";
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
