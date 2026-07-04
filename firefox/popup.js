document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const uaItems = document.querySelectorAll(".ua-item");
  const customUaSection = document.getElementById("custom-ua-section");
  const customUaInput = document.getElementById("custom-ua-input");
  const saveCustomBtn = document.getElementById("save-custom-btn");
  const toast = document.getElementById("toast");

  // Load saved settings
  chrome.storage.local.get({
    enabled: false,
    selectedUA: "default",
    customUAValue: ""
  }, (settings) => {
    // Determine active key in UI
    let activeKey = "default";
    if (settings.enabled) {
      activeKey = settings.selectedUA;
    }

    // Set Active Item in Grid
    setActiveGridItem(activeKey);

    // Fill Custom UA Area
    customUaInput.value = settings.customUAValue;
    if (activeKey === "custom") {
      customUaSection.classList.remove("hidden");
    }
  });

  // Handle User Agent Grid Selection
  uaItems.forEach(item => {
    item.addEventListener("click", () => {
      const uaKey = item.getAttribute("data-ua");

      // Set grid highlight
      setActiveGridItem(uaKey);

      if (uaKey === "default") {
        customUaSection.classList.add("hidden");
        chrome.storage.local.set({
          enabled: false,
          selectedUA: "default"
        }, () => {
          showToast("Using original browser User-Agent");
        });
      } else if (uaKey === "custom") {
        customUaSection.classList.remove("hidden");
        customUaInput.focus();
        // If there's already a saved custom value, apply it immediately
        const customValue = customUaInput.value.trim();
        if (customValue) {
          chrome.storage.local.set({
            enabled: true,
            selectedUA: "custom"
          });
        }
      } else {
        customUaSection.classList.add("hidden");
        chrome.storage.local.set({
          enabled: true,
          selectedUA: uaKey
        }, () => {
          showToast("User-Agent spoofed successfully");
        });
      }
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
      showToast("Custom User-Agent applied!");
    });
  });

  // Helper: Grid active item highlight
  function setActiveGridItem(selectedKey) {
    uaItems.forEach(item => {
      if (item.getAttribute("data-ua") === selectedKey) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  // Helper: Toast message
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
