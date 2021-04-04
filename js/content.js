const PRM_SETTINGS = {
  state: "dark",
  pitchdark: "#000000",
  bordercolor: "#333333",
  lightdark: "#191919",
  lightdarkinside: "#232121",
  primeheader: "#f05837",
  headerborder: "#1a1a1a",
  link: "#f05837",
  secondarylink: "#d53410",
  linktext: "#afb1b6"
}
const LTS_SETTINGS = {
  state: "dark",
  pitchdark: "#000000",
  bordercolor: "#333333",
  lightdark: "#1b1a20",
  lightdarkinside: "#363354",
  primaryheader: "#322f4e",
  link: "#878fff",
  secondarylink: "#d53410",
  linktext: "#afb1b6"
}

function setCSS(mode) {
  if (mode == "readSettings") {
    chrome.storage.local.get("mindsDarkerSettings", (sets) => {
      let sts = sets.mindsDarkerSettings
      $(':root').css('--pitch-dark', sts.pitchdark)
      $(':root').css('--prime-border-color', sts.bordercolor)
      $(':root').css('--light-dark', sts.lightdark)
      $(':root').css('--light-dark-inside', sts.lightdarkinside)
      $(':root').css('--prime-header', sts.primeheader)
      $(':root').css('--prime-link', sts.link)
      $(':root').css('--prime-secondary-link', sts.secondarylink)
      $(':root').css('--header-border', sts.headerborder)
      $(':root').css('--prime-linktext', sts.linktext)
    })
  } else {
    var link_tag = document.createElement('link')
      link_tag.setAttribute('rel', 'stylesheet')
      link_tag.setAttribute('type', 'text/css')
      link_tag.setAttribute('href', 'https://darkopendragon.github.io/minds-darker/SourceCSS/source.css')
      link_tag.id = 'minds-darker-id'
      document.lastChild.appendChild(link_tag)
    chrome.storage.local.get("mindsDarkerSettings", (sets) => {
      let sts = sets.mindsDarkerSettings
      $(':root').css('--pitch-dark', sts.pitchdark)
      $(':root').css('--prime-border-color', sts.bordercolor)
      $(':root').css('--light-dark', sts.lightdark)
      $(':root').css('--light-dark-inside', sts.lightdarkinside)
      $(':root').css('--prime-header', sts.primeheader)
      $(':root').css('--prime-link', sts.link)
      $(':root').css('--prime-secondary-link', sts.secondarylink)
      $(':root').css('--header-border', sts.headerborder)
      $(':root').css('--prime-linktext', sts.linktext)
    })
  }
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

chrome.storage.local.get("mindsDarkerSettings", async (res) => {
  if (res && res.mindsDarkerSettings && res.mindsDarkerSettings.state == "dark") setCSS();
  else if (res && !res.mindsDarkerSettings || res && !res.mindsDarkerSettings.state) {
    setCSS();
    chrome.storage.local.set({"mindsDarkerSettings": PRM_SETTINGS});
  }
})

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  console.log(`MESSAGE RECIVED\n${request.msg}\n${request.args ? request.args.join(", ") : "NO ARGS"}`);
  // var msg = request
  switch (true) {
    case request == "removeMindsDarkerCSS":
    document.getElementById('minds-darker-id').remove();
    chrome.storage.local.get("mindsDarkerSettings", (sets) => {
      sets.state = "light"
      chrome.storage.local.set({"mindsDarkerSettings": sets});
    })
    sendResponse({response: "response from background script"});
    break;
    case request == "setMindsDarkerCSS":
    chrome.storage.local.get("mindsDarkerSettings", (sets) => {
      sets.state = "dark"
      chrome.storage.local.set({"mindsDarkerSettings": sets});
    })
    setCSS();
    sendResponse({response: "response from background script"});
    break;
    case request == "setMindsDarkerData":
    chrome.storage.local.get("mindsDarkerSettings", (sets) => {
      sets.state = "dark"
      chrome.storage.local.set({"mindsDarkerSettings": sets});
    })
    setCSS();
    sendResponse({response: "response from background script"});
    break;
    case request.msg == "setSettings":
    console.log("starting setSettings");
    chrome.storage.local.get("mindsDarkerSettings", async (sets) => {
      let sts = sets.mindsDarkerSettings
      console.log(`1: loaded sets`);
      // console.log(sts);
      await request.args.forEach((k, i) => {
        console.log(k);
        let key = Object.keys(k)[0]
        let val = Object.values(k)[0]
        console.log(key + " " + val);
        sts[key] = val
      })
      console.log(sts);
      chrome.storage.local.set({"mindsDarkerSettings": sts})
      chrome.storage.local.get("mindsDarkerSettings", async (sets) => {
        console.log("2: new sts");
        console.log(sets.mindsDarkerSettings);
      })
      setCSS("readSettings")
    })
    sendResponse({response: "response from background script"});
    break;
    case request == "getMDLocalSettings":
    console.log("oidanidjbnsaijdbaszijdbnijsazbnjid");
    let sets = chrome.storage.local.get("mindsDarkerSettings")
    sendResponse({response: chrome.storage.local.get("mindsDarkerSettings")});
  }
})
//
// if (mode == "setLotus") {
//   $(':root').css('--pitch-dark', LTS_SETTINGS.pitchdark)
//   $(':root').css('--prime-border-color', LTS_SETTINGS.bordercolor)
//   $(':root').css('--light-dark', LTS_SETTINGS.lightdark)
//   $(':root').css('--light-dark-inside', LTS_SETTINGS.lightdarkinside)
//   $(':root').css('--prime-header', LTS_SETTINGS.primeheader)
//   $(':root').css('--prime-link', LTS_SETTINGS.link)
//   $(':root').css('--prime-secondary-link', LTS_SETTINGS.secondarylink)
//   $(':root').css('--header-border', LTS_SETTINGS.headerborder)
//   $(':root').css('--prime-linktext', LTS_SETTINGS.linktext)
// } else if (mode == "setPrime") {
//   $(':root').css('--pitch-dark', PRM_SETTINGS.pitchdark)
//   $(':root').css('--prime-border-color', PRM_SETTINGS.bordercolor)
//   $(':root').css('--light-dark', PRM_SETTINGS.lightdark)
//   $(':root').css('--light-dark-inside', PRM_SETTINGS.lightdarkinside)
//   $(':root').css('--prime-header', PRM_SETTINGS.primeheader)
//   $(':root').css('--prime-link', PRM_SETTINGS.link)
//   $(':root').css('--prime-secondary-link', PRM_SETTINGS.secondarylink)
//   $(':root').css('--header-border', PRM_SETTINGS.headerborder)
//   $(':root').css('--prime-linktext', PRM_SETTINGS.linktext)
// } else {
//   var link_tag = document.createElement('link')
//   link_tag.setAttribute('rel', 'stylesheet')
//   link_tag.setAttribute('type', 'text/css')
//   link_tag.setAttribute('href', 'https://darkopendragon.github.io/minds-darker/SourceCSS/source.css')
//   link_tag.id = 'minds-darker-id'
//   document.lastChild.appendChild(link_tag)
// }
