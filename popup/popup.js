const PRM_SETTINGS = [
  {state: "dark"},
  {pitchdark: "#000000"},
  {bordercolor: "#333333"},
  {lightdark: "#191919"},
  {lightdarkinside: "#232121"},
  {primeheader: "#f05837"},
  {headerborder: "#1a1a1a"},
  {link: "#f05837"},
  {secondarylink: "#d53410"},
  {linktext: "#afb1b6"}
]
const LTS_SETTINGS = [
  {state: "dark"},
  {pitchdark: "#000000"},
  {bordercolor: "#333333"},
  {lightdark: "#1b1a20"},
  {lightdarkinside: "#363354"},
  {primaryheader: "#322f4e"},
  {link: "#878fff"},
  {secondarylink: "#d53410"},
  {linktext: "#afb1b6"}
]

$(document).ready(() => {
  $("#saveDarker").on("click", async () => {
    console.log("DARKER SAVE CLICKED");
    let newSts = {}
    if ($("#pitchdark").val() != undefined) newSts.pitchdark = $("#pitchdark").val()
    if ($("#primebordercolor").val() != undefined) newSts.bordercolor = $("#primebordercolor").val()
    if ($("#lightdark").val() != undefined) newSts.lightdark = $("#lightdark").val()
    if ($("#lightdarkinside").val() != undefined) newSts.lightdarkinside = $("#lightdarkinside").val()
    if ($("#headerborder").val() != undefined) newSts.headerborder = $("#headerborder").val()
    if ($("#primelink").val() != undefined) newSts.link = $("#primelink").val()
    if ($("#primesecondarylink").val() != undefined) newSts.secondarylink = $("#primesecondarylink").val()
    if ($("#primelinktext").val() != undefined) newSts.linktext = $("#primelinktext").val()
    if ($("#primeheader").val() != undefined) newSts.primeheader = $("#primeheader").val()

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {msg: "setSettings", args: Array(newSts)}, () => {
        alert("[MD] Settings saved (probably)!")
        return Promise.resolve(true)
      })
    })
  })

  $("#setDarkerTheme").on("click", async () => {
    console.log("DARKER WAS CLICKED");
    console.log(PRM_SETTINGS);
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {msg: "setSettings", args: PRM_SETTINGS}, () => {
        alert("[MD] Settings set to Darker (probably)!")
        return Promise.resolve(true)
      })
    })
  })

  $("#setLotusTheme").on("click", async () => {
    console.log("LOTUS WAS CLICKED");
    console.log(LTS_SETTINGS);
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {msg: "setSettings", args: LTS_SETTINGS}, () => {
        alert("[MD] Settings set to Lotus (probably)!")
        return Promise.resolve(true)
      })
    })
  })

  $("#exportTheme").on("click", async () => {
    chrome.storage.local.get("mindsDarkerSettings", async (sets) => {
      let STRING = JSON.stringify(sets.mindsDarkerSettings)
      var $temp = $("<input>");
      $("body").append($temp);
      $("body").append(`<p id="copier" style="display: none;">${STRING}</p>`)
      $temp.val($("#copier").text()).select();
      document.execCommand("copy");
      $temp.remove();
      $("#copier").remove()
      alert(`Theme line copied to clipboard!`)
    })
  })

  $("#importTheme").on("click", async () => {
    chrome.storage.local.get("mindsDarkerSettings", async (sets) => {
      let ans = prompt("Insert line from an export")
      if (ans) {
        let awsw = JSON.parse(ans)
        awsw = Object.entries(awsw)
        let uwu = []
        await awsw.forEach((k, i) => {
          uwu[i] = {[k[0]]: `${[k[1]]}`}
        })
        console.log(uwu);
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, {msg: "setSettings", args: uwu}, () => {
            alert("[MD] Theme imported (probably)!")
            return Promise.resolve(true)
          })
        })
      }
    })
  })
})
