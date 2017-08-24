window.addEventListener('DOMContentLoaded', function () {

  whenClickOn('#user-select-btn', () => {
    notifyInserter({
      from: 'popup',
      subject: 'user-select',
      adType: document.getElementsByName('adtype')[0].value,
    }, function() {
      window.close();
    })
  });

  whenClickOn('#custom-selector-btn', () => {
    notifyInserter({
      from: 'popup',
      subject: 'custom-selector',
      adType: document.getElementsByName('adtype')[0].value,
      selector: document.getElementsByName('el-selector')[0].value,
    }, function() {
      window.close();
    });
  });

});

function whenClickOn(selector, cb) {
  document.querySelector(selector).addEventListener('click', cb);
}

function notifyInserter(data, cb) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, data);
    cb();
  });
}
