// Script to override navigator properties on the webpage
const OS_CONFIGS = {
  windows: { platform: "Win32", chPlatform: "Windows", chPlatformVersion: "15.0.0", isMobile: false, osToken: "Windows NT 10.0; Win64; x64" },
  macos: { platform: "MacIntel", chPlatform: "macOS", chPlatformVersion: "14.5.0", isMobile: false, osToken: "Macintosh; Intel Mac OS X 10_15_7" },
  linux: { platform: "Linux x86_64", chPlatform: "Linux", chPlatformVersion: "6.8.0", isMobile: false, osToken: "X11; Linux x86_64" },
  ios: { platform: "iPhone", chPlatform: "iOS", chPlatformVersion: "17.5.1", isMobile: true, osToken: "iPhone; CPU iPhone OS 17_5 like Mac OS X" },
  android: { platform: "Linux armv8l", chPlatform: "Android", chPlatformVersion: "14.0.0", isMobile: true, osToken: "Linux; Android 14; K" }
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
    isChromium,
    brand,
    platform,
    chPlatform,
    chPlatformVersion: os.chPlatformVersion,
    isMobile
  };
}

// Retrieve settings from local storage
chrome.storage.local.get(["enabled", "selectedOS", "selectedBrowser", "selectedUA", "customUAValue"], (data) => {
  if (!data.enabled) return;

  let activeUA = "";
  let platform = "Win32";
  let isChromium = false;
  let brand = "";
  let chPlatform = "Windows";
  let chPlatformVersion = "15.0.0";
  let isMobile = false;

  if (data.selectedUA === "custom") {
    activeUA = data.customUAValue || "Mozilla/5.0";
    if (activeUA.includes("iPhone") || activeUA.includes("iPad") || activeUA.includes("iPod")) {
      platform = "iPhone";
      chPlatform = "iOS";
      isMobile = true;
    } else if (activeUA.includes("Macintosh") || activeUA.includes("Mac OS X")) {
      platform = "MacIntel";
      chPlatform = "macOS";
    } else if (activeUA.includes("Android")) {
      platform = "Linux armv8l";
      chPlatform = "Android";
      isMobile = true;
    } else if (activeUA.includes("Linux")) {
      platform = "Linux x86_64";
      chPlatform = "Linux";
    } else {
      platform = "Win32";
      chPlatform = "Windows";
    }
    isChromium = activeUA.includes("Chrome") && !activeUA.includes("Firefox") && !activeUA.includes("Safari");
    if (isChromium) {
      brand = activeUA.includes("Edg/") ? "Edge" : (activeUA.includes("OPR/") ? "Opera" : "Chrome");
    }
  } else {
    let osKey = data.selectedOS;
    let browserKey = data.selectedBrowser;

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
    platform = config.platform;
    isChromium = config.isChromium;
    brand = config.brand;
    chPlatform = config.chPlatform;
    chPlatformVersion = config.chPlatformVersion;
    isMobile = config.isMobile;
  }

  // Inject JS into the Main World context of the webpage
  const scriptContent = `
    (function() {
      const spoofedUA = ${JSON.stringify(activeUA)};
      const spoofedPlatform = ${JSON.stringify(platform)};

      // Override navigator.userAgent
      Object.defineProperty(navigator, 'userAgent', {
        get: () => spoofedUA,
        configurable: true
      });

      // Override navigator.platform
      Object.defineProperty(navigator, 'platform', {
        get: () => spoofedPlatform,
        configurable: true
      });

      // Override navigator.appVersion
      const index = spoofedUA.indexOf('Mozilla/');
      const appVersionValue = index === 0 ? spoofedUA.substring(8) : spoofedUA;
      Object.defineProperty(navigator, 'appVersion', {
        get: () => appVersionValue,
        configurable: true
      });

      // Override User-Agent Client Hints if the browser supports it
      if (navigator.userAgentData) {
        const isChromium = ${JSON.stringify(isChromium)};
        
        if (isChromium) {
          const brand = ${JSON.stringify(brand)};
          const isMobile = ${JSON.stringify(isMobile)};
          const chPlatform = ${JSON.stringify(chPlatform)};
          const chPlatformVersion = ${JSON.stringify(chPlatformVersion)};
          
          let brandsList = [
            { brand: 'Not/A)Brand', version: '8' },
            { brand: 'Chromium', version: '126' }
          ];

          if (brand === 'Chrome') {
            brandsList.push({ brand: 'Google Chrome', version: '126' });
          } else if (brand === 'Edge') {
            brandsList.push({ brand: 'Microsoft Edge', version: '126' });
          } else if (brand === 'Opera') {
            brandsList.push({ brand: 'Opera', version: '111' });
          } else if (brand === 'Brave') {
            brandsList.push({ brand: 'Brave', version: '126' });
          }

          const mockUAData = {
            brands: brandsList,
            mobile: isMobile,
            platform: chPlatform,
            getHighEntropyValues: function(hints) {
              return Promise.resolve({
                brands: brandsList,
                mobile: isMobile,
                platform: chPlatform,
                platformVersion: chPlatformVersion,
                architecture: 'x86',
                model: '',
                uaFullVersion: '126.0.0.0',
                fullVersionList: brandsList
              });
            }
          };

          Object.defineProperty(navigator, 'userAgentData', {
            get: () => mockUAData,
            configurable: true
          });
        } else {
          // If spoofed browser is non-Chromium (Firefox, Safari, IE), remove or disable userAgentData
          Object.defineProperty(navigator, 'userAgentData', {
            get: () => undefined,
            configurable: true
          });
        }
      }
    })();
  `;

  // Inject the script element
  const scriptEl = document.createElement("script");
  scriptEl.textContent = scriptContent;
  
  // Inject before any other scripts run
  const target = document.head || document.documentElement;
  target.appendChild(scriptEl);
  scriptEl.remove();
});
