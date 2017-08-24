console.log('inserter loaded!')

chrome.runtime.onMessage.addListener(function(msg, sender, response) {
  if (msg.from === 'popup' && msg.subject === 'insert-ad') {
    console.log("msg received: ", msg);
    insertAd(msg.adType, msg.selector);
    response();
  }
}, false);

function insertAd(adType, selector) {
  console.warn(adType, selector)
  var anchor = createNodeFromString(`<div id="vm5ad-js-sdk" data-mode="fast"></div>`)
  var adUnit = createNodeFromString(`<vmfive-ad-unit placement-id="580db15a4a801a2674a56f83" ad-type='${adType}' flip-card-front-side-selector="#wrap"></vmfive-ad-unit>`);

  var selectorNode = document.querySelector(selector);
  selectorNode.parentNode.insertBefore(anchor, selectorNode);
  selectorNode.parentNode.insertBefore(adUnit, selectorNode);

  [
    "https://vawpro.vm5apis.com/man.js",
    "https://man.vm5apis.com/dist/adn-web-sdk.js",
    chrome.extension.getURL('init-ad.js'),
  ].forEach(function(src) {
    var script = document.createElement('script');
    script.src = src;
    script.async = false;
    script.onload = () => {
      console.warn(src)
    }
    document.head.appendChild(script);
  });
}

function createNodeFromString(str) {
  var node = document.createElement('div');
  node.innerHTML = str;
  return node.firstChild;
}
