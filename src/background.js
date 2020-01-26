/* global chrome */

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.query == "queryAPI") {
    fetch("https://us-central1-little-pause-f4bfa.cloudfunctions.net/object")
      .then(response => response.json())
      .then(json => sendResponse(json));
    return true; // Will respond asynchronously.
  }
  if (request.query == "queryLocalStorage") {
    const data = window.localStorage.getItem("littlePauseSites");
    if (!data) {
      sendResponse([]);
    }
    sendResponse(JSON.parse(data));
  }
});
