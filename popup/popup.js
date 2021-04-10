const PRM_SETTINGS = [
  {state: "dark"},
  {pitchdark: "#000000"},
  {lightdark: "#191919"},
  {lightdarkinside: "#232121"},
  {headerbackground: "#f05837"},
  {headerborder: "#1a1a1a"},
  {headercolor: "inherit"},
  {primebordercolor: "#333333"},
  {groupmsgborder: "#f05837"},
  {primelink: "#f05837"},
  {activityhero: "#d53410"},
  {activityherotext: "#afb1b6"},
  {primeheader: "#f05837"},
  {lotusprimary: "#322f4e"},
  {lotusjumbo: "#1b1a20"},
  {lotuslightdarkinside: "#363354"},
  {lotuslinkb: "#878fff"},
]
const LTS_SETTINGS = [
  {state: "lotus"},
  {pitchdark: "#000000"},
  {primebordercolor: "#333333"},
  {lightdark: "#1b1a20"},
  {lightdarkinside: "#363354"},
  {primeheader: "#322f4e"},
  {primelink: "#878fff"},
  {activityhero: "#d53410"},
  {activityherotext: "#afb1b6"}
]

$(document).ready(() => {
  var coll = document.getElementsByClassName("collapser");
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.maxHeight){
        content.style.maxHeight = null;
        content.style.padding = "0px 10px"
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.padding = "10px 10px"
      }
    });
  }

  $("#saveDarker").on("click", async () => {
    let newSts = []
    // console.log($('#darkThemeInputs :input'));
    var inputValues = $('#darkThemeInputs :input').map(function(t) {
      var type = $(this).prop("type")
      var init = $(this).attr('id')
      var cnt = $(this).val()
      if (type == "text" && $(this).val()) return newSts.push(JSON.parse(`{"${init}": "${cnt}"}`));
    })
    console.log(newSts);
    if (newSts.length < 1) return;

    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {msg: "setSettings", args: newSts}, () => {
        alert("[MD] Settings saved (probably)!")
        return Promise.resolve(true)
      })
    })
  })

  $("#setDarkerTheme").on("click", async () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {msg: "setSettings", args: PRM_SETTINGS}, () => {
        alert("[MD] Settings set to Darker (probably)!")
        return Promise.resolve(true)
      })
    })
  })

  $("#setLotusTheme").on("click", async () => {
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
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, {msg: "setSettings", args: uwu}, () => {
            alert("[MD] Theme imported (probably)!")
            return Promise.resolve(true)
          })
        })
      }
    })
  })

  $("#_clearCache").on("click", async () => {
    var cn = confirm("Clear the local cache?")
    if (cn == true) {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, "clearMDStorage", () => {
          alert("[MD] Settings cleared (probably)!")
          return Promise.resolve(true)
        })
      })
    }
  })

  $('.collapseHeader').on("click", () => {
    $('.collapseContent').slideToggle();
  });
})
