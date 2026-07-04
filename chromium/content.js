// Script to override navigator properties on the webpage
const USER_AGENT_PLATFORMS = {
  chrome_win: "Win32",
  chrome_mac: "MacIntel",
  firefox_win: "Win32",
  firefox_mac: "MacIntel",
  safari_mac: "MacIntel",
  safari_ios: "iPhone",
  edge_win: "Win32",
  opera_win: "Win32",
  android_chrome: "Linux armv8l",
  ie_11: "Win32"
};

const USER_AGENT_STRINGS = {
  chrome_win: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  chrome_mac: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  firefox_win: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:127.0) Gecko/20100101 Firefox/127.0",
  firefox_mac: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:127.0) Gecko/20100101 Firefox/127.0",
  safari_mac: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15",
  safari_ios: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1",
  edge_win: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0",
  opera_win: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 OPR/111.0.0.0",
  android_chrome: "Mozilla/5.0 (Linux; Android 14; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36",
  ie_11: "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko"
};

// Retrieve settings from local storage
chrome.storage.local.get(["enabled", "selectedUA", "customUAValue"], (data) => {
  if (!data.enabled) return;

  let activeUA = "";
  let platform = "Win32";

  if (data.selectedUA === "custom") {
    activeUA = data.customUAValue || "Mozilla/5.0";
    // Guess platform from custom user agent string
    if (activeUA.includes("iPhone") || activeUA.includes("iPad") || activeUA.includes("iPod")) {
      platform = "iPhone";
    } else if (activeUA.includes("Macintosh") || activeUA.includes("Mac OS X")) {
      platform = "MacIntel";
    } else if (activeUA.includes("Android")) {
      platform = "Linux armv8l";
    } else if (activeUA.includes("Linux")) {
      platform = "Linux x86_64";
    } else {
      platform = "Win32";
    }
  } else {
    activeUA = USER_AGENT_STRINGS[data.selectedUA] || USER_AGENT_STRINGS.chrome_win;
    platform = USER_AGENT_PLATFORMS[data.selectedUA] || "Win32";
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
        let isChromium = spoofedUA.includes('Chrome') && !spoofedUA.includes('Firefox') && !spoofedUA.includes('Safari');
        
        if (isChromium) {
          let brand = spoofedUA.includes('Edg/') ? 'Edge' : (spoofedUA.includes('OPR/') ? 'Opera' : 'Chrome');
          let isMobile = spoofedUA.includes('Mobile');
          let chPlatform = spoofedUA.includes('Windows') ? 'Windows' : (spoofedUA.includes('Android') ? 'Android' : 'macOS');
          
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
                platformVersion: chPlatform === 'Windows' ? '10.0.0' : '14.0.0',
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
