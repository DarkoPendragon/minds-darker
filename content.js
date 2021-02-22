function setCSS() {
  var link_tag = document.createElement('link');
  link_tag.setAttribute('rel', 'stylesheet');
  link_tag.setAttribute('type', 'text/css');
  link_tag.setAttribute('href', 'https://darkopendragon.github.io/minds-darker/SourceCSS/source.css');
  link_tag.id = 'minds-darker-id';
  document.lastChild.appendChild(link_tag);
}
setCSS();
chrome.storage.local.set({"mindsDarkerSettings": "dark"});

chrome.runtime.onMessage.addListener((request, sender, callback) => {
  if (request == "removeMindsDarkerCSS") {
    document.getElementById('minds-darker-id').remove();
    chrome.storage.local.set({"mindsDarkerSettings": "light"});
  } else if (request == "setMindsDarkerCSS") {
    chrome.storage.local.set({"mindsDarkerSettings": "dark"});
    setCSS();
  } else if (request == "setMindsDarkerData") {
    chrome.storage.local.set({"mindsDarkerSettings": "dark"});
    setCSS();
  }
});
