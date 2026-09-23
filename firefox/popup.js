document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const generalItems = document.querySelectorAll(".general-item");
  const osItems = document.querySelectorAll(".os-item");
  const browserItems = document.querySelectorAll(".browser-item");
  const customUaSection = document.getElementById("custom-ua-section");
  const customUaInput = document.getElementById("custom-ua-input");
  const saveCustomBtn = document.getElementById("save-custom-btn");
  const toast = document.getElementById("toast");

  let currentSelectedOS = "windows";
  let currentSelectedBrowser = "chrome";

  // Load saved settings
  chrome.storage.local.get({
    enabled: false,
    selectedOS: "windows",
    selectedBrowser: "chrome",
    selectedUA: "default",
    customUAValue: ""
  }, (settings) => {
    currentSelectedOS = settings.selectedOS || "windows";
    currentSelectedBrowser = settings.selectedBrowser || "chrome";
    customUaInput.value = settings.customUAValue || "";

    if (!settings.enabled || settings.selectedUA === "default") {
      renderActiveState("default");
    } else if (settings.selectedUA === "custom") {
      renderActiveState("custom");
    } else {
      renderActiveState("preset", currentSelectedOS, currentSelectedBrowser);
    }
  });

  // Handle General Items (System Default / Custom)
  generalItems.forEach(item => {
    item.addEventListener("click", () => {
      const mode = item.getAttribute("data-mode");

      if (mode === "default") {
        renderActiveState("default");
        chrome.storage.local.set({
          enabled: false,
          selectedUA: "default"
        }, () => {
          showToast("Using original browser User-Agent");
        });
      } else if (mode === "custom") {
        renderActiveState("custom");
        customUaInput.focus();
        const customValue = customUaInput.value.trim();
        if (customValue) {
          chrome.storage.local.set({
            enabled: true,
            selectedUA: "custom"
          });
        }
      }
    });
  });

  // Handle OS Selection
  osItems.forEach(item => {
    item.addEventListener("click", () => {
      const os = item.getAttribute("data-os");
      currentSelectedOS = os;

      renderActiveState("preset", currentSelectedOS, currentSelectedBrowser);

      chrome.storage.local.set({
        enabled: true,
        selectedOS: currentSelectedOS,
        selectedBrowser: currentSelectedBrowser,
        selectedUA: `${currentSelectedBrowser}_${currentSelectedOS}`
      }, () => {
        const osLabel = item.querySelector(".ua-name")?.textContent || os;
        const browserLabel = document.querySelector(`.browser-item[data-browser="${currentSelectedBrowser}"] .ua-name`)?.textContent || currentSelectedBrowser;
        showToast(`Spoofed as ${browserLabel} (${osLabel})`);
      });
    });
  });

  // Handle Browser Selection
  browserItems.forEach(item => {
    item.addEventListener("click", () => {
      const browser = item.getAttribute("data-browser");
      currentSelectedBrowser = browser;

      renderActiveState("preset", currentSelectedOS, currentSelectedBrowser);

      chrome.storage.local.set({
        enabled: true,
        selectedOS: currentSelectedOS,
        selectedBrowser: currentSelectedBrowser,
        selectedUA: `${currentSelectedBrowser}_${currentSelectedOS}`
      }, () => {
        const osLabel = document.querySelector(`.os-item[data-os="${currentSelectedOS}"] .ua-name`)?.textContent || currentSelectedOS;
        const browserLabel = item.querySelector(".ua-name")?.textContent || browser;
        showToast(`Spoofed as ${browserLabel} (${osLabel})`);
      });
    });
  });

  // Handle Save Custom User Agent
  saveCustomBtn.addEventListener("click", () => {
    const customValue = customUaInput.value.trim();
    if (!customValue) {
      customUaInput.focus();
      return;
    }

    chrome.storage.local.set({
      enabled: true,
      selectedUA: "custom",
      customUAValue: customValue
    }, () => {
      renderActiveState("custom");
      showToast("Custom User-Agent applied!");
    });
  });

  // UI state management helper
  function renderActiveState(mode, osKey, browserKey) {
    // Clear all active states first
    generalItems.forEach(el => el.classList.remove("active"));
    osItems.forEach(el => el.classList.remove("active"));
    browserItems.forEach(el => el.classList.remove("active"));

    if (mode === "default") {
      document.querySelector(`.general-item[data-mode="default"]`)?.classList.add("active");
      customUaSection.classList.add("hidden");
    } else if (mode === "custom") {
      document.querySelector(`.general-item[data-mode="custom"]`)?.classList.add("active");
      customUaSection.classList.remove("hidden");
    } else if (mode === "preset") {
      customUaSection.classList.add("hidden");
      if (osKey) {
        document.querySelector(`.os-item[data-os="${osKey}"]`)?.classList.add("active");
      }
      if (browserKey) {
        document.querySelector(`.browser-item[data-browser="${browserKey}"]`)?.classList.add("active");
      }
    }
  }

  // Toast notification helper
  let toastTimeout;
  function showToast(message) {
    clearTimeout(toastTimeout);
    toast.textContent = message;
    toast.classList.add("show");
    toastTimeout = setTimeout(() => {
      toast.classList.remove("show");
    }, 1800);
  }
});
