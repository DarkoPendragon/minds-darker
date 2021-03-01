function setCSS() {
  var link_tag = document.createElement('link');
  link_tag.setAttribute('rel', 'stylesheet');
  link_tag.setAttribute('type', 'text/css');
  link_tag.setAttribute('href', 'https://darkopendragon.github.io/minds-darker/SourceCSS/source.css');
  link_tag.id = 'minds-darker-id';
  document.lastChild.appendChild(link_tag);
}

function checkVersion() {
  return new Promise((resolve, reject) => {
    fetch('https://raw.githubusercontent.com/DarkoPendragon/minds-darker/main/manifest.json').then((res) => {
      res.json().then((res) => {
        let gitv = res.version
        let manv = chrome.runtime.getManifest().version
        resolve(manv == gitv)
      })
    }).catch(reject)
  })
}

checkVersion().then((r) => {
  if (!r) {
    $('.m-v3Topbar__top').append('<div class="updateText"><p>There is a new key update to Minds Darker, update <a href="https://github.com/DarkoPendragon/minds-darker">here.</a></p><button class="updateButton">Close</button></div>');
    $('.updateButton').on("click", () => {
      $('.updateText').css('visibility', 'hidden')
    })
  }
})

chrome.storage.local.get("mindsDarkerSettings", (res) => {
  if (res && res.mindsDarkerSettings && res.mindsDarkerSettings == "dark") setCSS();
  else if (res && !res.mindsDarkerSettings) {
    setCSS();
    chrome.storage.local.set({"mindsDarkerSettings": "dark"});
  }
})

chrome.runtime.onMessage.addListener((request, sender, callback) => {
  switch (request) {
    case "removeMindsDarkerCSS":
      document.getElementById('minds-darker-id').remove();
      chrome.storage.local.set({"mindsDarkerSettings": "light"});
    break;
    case "setMindsDarkerCSS":
      chrome.storage.local.set({"mindsDarkerSettings": "dark"});
      setCSS();
    break;
    case "setMindsDarkerData":
      chrome.storage.local.set({"mindsDarkerSettings": "dark"});
      setCSS();
  }
});
