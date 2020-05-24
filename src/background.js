/* global chrome */

const fetchPausedURLs = () => {
  if (localStorage.getItem("pausedURLs")) {
    return JSON.parse(localStorage.getItem("pausedURLs"));
  }
  return [];
};

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  const pausedURLs = fetchPausedURLs();
  if (pausedURLs.some((pausedURL) => details.url.includes(pausedURL))) {
    // The tab URL includes at least one **substring** of a URL in the pausedURL array
    chrome.tabs.update(details.tabId, {
      url: chrome.extension.getURL("app.html"),
    });
  }
});
