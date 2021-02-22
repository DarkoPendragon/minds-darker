chrome.browserAction.onClicked.addListener((tab) => {
  chrome.storage.local.get("mindsDarkerSettings", (res) => {
    if (res.mindsDarkerSettings && res.mindsDarkerSettings == "dark") chrome.tabs.sendMessage(tab.id, "removeMindsDarkerCSS");
    else if (res.mindsDarkerSettings && res.mindsDarkerSettings == "light") chrome.tabs.sendMessage(tab.id, "setMindsDarkerCSS");
    else if (!res.mindsDarkerSettings) chrome.tabs.sendMessage(tab.id, "setMindsDarkerData");
  });
});
