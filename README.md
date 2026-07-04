# User-Agent X

A modern, lightweight, and powerful browser extension to protect your online privacy by spoofing your User-Agent string and hiding or customizing User-Agent Client Hints.

<div align="center">
  <img src="https://github.com/hamzabellouch/user-agent-x/blob/main/user-agent.png" width="800"/>
</div>

Compatible with all major browsers: **Chrome, Brave, Edge, Opera (Chromium-based)** and **Mozilla Firefox**.



### <a name="Features"></a> ⭐ Features

- **Preconfigured Profiles:** Instantly switch between popular browsers (Chrome, Firefox, Safari, Edge, Opera, Brave) and platforms (Windows, macOS, Linux, Android, iOS).
- **Custom User-Agent Support:** Manually input and apply any custom User-Agent string.
- **Client Hint Spoofing & Blocking:** Automatically sets matching `sec-ch-ua` headers for Chromium profiles, or strips them entirely for non-Chromium profiles (Firefox/Safari) to prevent fingerprinting leaks.
- **Dynamic Rule Updates:** Utilizes high-performance Manifest V3 APIs (`declarativeNetRequest`) for seamless header modification.
- **Premium UI:** Clean, responsive, and modern popup interface using the Inter typeface.
- **Privacy-First:** Processed entirely locally. No telemetry, no tracking, and no external requests.



### <a name="RepositoryStructure"></a> 📁 Repository Structure

```text
├── chromium/          # Extension directory for Chrome, Brave, Edge, etc.
│   ├── icons/         # Extension icon files
│   ├── background.js  # Service worker managing network rules
│   ├── content.js     # Client Hints override injection script
│   ├── manifest.json  # Chromium Manifest V3 configuration
│   ├── popup.css      # UI styling
│   ├── popup.js       # UI interaction logic
│   └── popup.html     # Popup user interface
│
├── firefox/           # Extension directory for Mozilla Firefox
│   ├── icons/         # Extension icon files
│   ├── background.js  # Background script managing network rules
│   ├── content.js     # Client Hints override injection script
│   ├── manifest.json  # Firefox Manifest V3 configuration (with Gecko ID)
│   ├── popup.css      # UI styling
│   ├── popup.js       # UI interaction logic
│   └── popup.html     # Popup user interface
│
└── .gitignore         # Prevents tracking of OS metadata, IDE configurations, etc.
```



### <a name="InstallationUsage"></a> ⚙️ Installation & Usage

### <a name="ForChromiumBasedBrowsers"></a> 🌐 For Chromium-Based Browsers (Chrome, Brave, Edge, Opera)

1. Open your Chromium-based browser and navigate to:
   - **Google Chrome / Brave / Opera:** `chrome://extensions/`
   - **Microsoft Edge:** `edge://extensions/`

2. Enable **Developer mode**.

3. Click **Load unpacked**.

4. Select the `chromium/` directory of this project.

5. The extension will be installed and is now ready to use.

### <a name="ForMozillaFirefox"></a> 🦊 For Mozilla Firefox

1. Open **Mozilla Firefox** and navigate to `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on...**.
3. Select the `manifest.json` file inside the `firefox/` directory of this project.
4. The extension is now loaded as a temporary add-on.



### <a name="Privacy & Safety"></a> 🛡️ Privacy & Safety

- **Local Processing:** All header modifications and spoofing actions are performed locally in your browser. No data is shared with external servers.
- **No Permissions Sprawl:** The extension only requests minimum necessary permissions (`declarativeNetRequest`, `storage`, `scripting`) to perform header modifications securely.



> [!WARNING]
> There is always a possibility of website breakage or detection when using advanced spoofing, so we assume no responsibility for any inaccuracies or issues.


### <a name="Copyright©2026"></a> Copyright © 2026

Thank you for engaging with us. For inquiries or collaboration, please contact:  
hamzabellouchcontact@gmail.com

Stay connected and follow us on:  
[Facebook](https://facebook.com/hamzabellouch1) | [Instagram](https://instagram.com/hamzabellouch0) | [Twitter](https://twitter.com/hamzabellouch0) | [Telegram](https://t.me/hammzabellouch) | [LinkedIn](https://www.linkedin.com/in/hamzabellouch)
