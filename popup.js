window.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#insert-btn').addEventListener('click', () => {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id, {
          from: 'popup',
          subject: 'insert-ad',
          adType: document.getElementsByName('adtype')[0].value,
        },
      );
      window.close();
    });
  });
});
