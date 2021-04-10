const PRM_SETTINGS = {
  pitchdark: "#000000",
  lightdark: "#191919",
  lightdarkinside: "#232121",
  headerbackground: "#f05837",
  headerborder: "#1a1a1a",
  headercolor: "inherit",
  primebordercolor: "#333333",
  groupmsgborder: "#f05837",
  primelink: "#f05837",
  activityhero: "#d53410",
  activityherotext: "#afb1b6",
  primeheader: "#f05837"
}
const LTS_SETTINGS = {
  state: "lotus",
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
  if (mode == "readSettings" || mode) {
    chrome.storage.local.get("mindsDarkerSettings", (sets) => {
      let sts = sets.mindsDarkerSettings
      $(':root').css('--pitch-dark', sts.pitchdark)
      $(':root').css('--light-dark', sts.lightdark)
      $(':root').css('--light-dark-inside', sts.lightdarkinside)

      /* Header */
      $(':root').css('--header-background', sts.headerbackground)
      $(':root').css('--header-border', sts.headerborder)
      $(':root').css('--header-color', sts.headercolor)

      /* Borders */
      $(':root').css('--prime-border-color', sts.primebordercolor)
      $(':root').css('--group-msg-border', sts.groupmsgborder)

      /* Activity header */
      $(':root').css('--prime-link', sts.primelink)

      /* Activity header hero */
      $(':root').css('--activity-hero', sts.activityhero)
      $(':root').css('--activity-hero-text', sts.activityherotext)

      /* Genrelized Orange Color */
      $(':root').css('--prime-header', sts.primeheader)
    })
  } else {
    var link_tag = document.createElement('link')
      link_tag.setAttribute('rel', 'stylesheet')
      link_tag.setAttribute('type', 'text/css')
      link_tag.setAttribute('href', 'https://darkopendragon.github.io/minds-darker/SourceCSS/source.css')
      link_tag.id = 'minds-darker-id'
      document.lastChild.appendChild(link_tag)
    chrome.storage.local.get("mindsDarkerSettings", (sets) => {
      console.log(sets);
      let sts = sets.mindsDarkerSettings
      $(':root').css('--pitch-dark', sts.pitchdark)
      $(':root').css('--light-dark', sts.lightdark)
      $(':root').css('--light-dark-inside', sts.lightdarkinside)

      /* Header */
      $(':root').css('--header-background', sts.headerbackground)
      $(':root').css('--header-border', sts.headerborder)
      $(':root').css('--header-color', sts.headercolor)

      /* Borders */
      $(':root').css('--prime-border-color', sts.primebordercolor)
      $(':root').css('--group-msg-border', sts.groupmsgborder)

      /* Activity header */
      $(':root').css('--prime-link', sts.primelink)

      /* Activity header hero */
      $(':root').css('--activity-hero', sts.activityhero)
      $(':root').css('--activity-hero-text', sts.activityherotext)

      /* Genrelized Orange Color */
      $(':root').css('--prime-header', sts.primeheader)
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

$(document).ready(() => {
  checkVersion().then((r) => {
    if (!r) {
      $('.m-v3Topbar__top').append('<div class="updateText"><p>There is a new key update to Minds Darker, update <a href="https://github.com/DarkoPendragon/minds-darker">here.</a></p><button class="updateButton">Close</button></div>');
      $('.updateButton').on("click", () => {
        $('.updateText').css('visibility', 'hidden')
      })
    }
  })

  setCSS()

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
      chrome.storage.local.get("mindsDarkerSettings", async (sets) => {
        let sts = sets.mindsDarkerSettings
        await request.args.forEach((k, i) => {
          let key = Object.keys(k)[0]
          console.log(key);
          let val = Object.values(k)[0]
          console.log(val);
          sts[key] = val
        })
        console.log(sts);
        chrome.storage.local.set({"mindsDarkerSettings": sts})
        setCSS("readSettings")
      })
      sendResponse({response: "response from background script"});
      break;
      case request == "getMDLocalSettings":
      let sets = chrome.storage.local.get("mindsDarkerSettings")
      sendResponse({response: sets});
      break;
      case request == "clearMDStorage":
      chrome.storage.local.set({"mindsDarkerSettings": PRM_SETTINGS})
      setCSS(true)
      sendResponse({response: "uwu"});
    }
  })
})
