console.log('inserter loaded!')

chrome.runtime.onMessage.addListener(function(msg, sender, response) {
  if (msg.from === 'popup' && msg.subject === 'insert-ad') {
    console.log("msg received: ", msg);
    getElementSelector(selector => {
      insertAd(msg.adType, selector);
    })
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


function getElementSelector(cb) {
  document.addEventListener('mouseover', function findElementToInsertAd(e) {
    console.warn(OptimalSelect.select(e.target))
    const elem = e.target;
    const originalBorder = elem.style.border;
    elem.style.border = 'solid 2px red';

    elem.addEventListener('click', onClick);
    elem.addEventListener('mouseout', cleanupNode);

    function onClick() {
      elem.style.border = originalBorder;
      cleanupNode();
      document.removeEventListener('mouseover', findElementToInsertAd);
      const selector = OptimalSelect.select(elem)
      cb(selector);
    }

    function cleanupNode() {
      elem.style.border = originalBorder;
      elem.removeEventListener('mouseout', cleanupNode);
      elem.removeEventListener('click', onClick);
    }
  })
}

console.warn(OptimalSelect.select);
