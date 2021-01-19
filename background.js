chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.create({active: true, url: "https://www.minds.com/"})
})
