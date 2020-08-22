import moment from "moment";

const urlCheck = (data, url) => data.some((item) => item.url === url);

const dayCheck = (data, day) =>
  data.some((item) => item.checkedDays.includes(day));

const timeCheck = (data, time) =>
  data.some((item) => {
    if (!item.startTime || !item.endTime) {
      return true;
    }

    const startDate = moment(item.startTime, ["hh:mm a"]);
    const endDate = moment(item.endTime, ["hh:mm a"]);

    if (endDate.isBefore(startDate)) {
      // End date must be tomorrow
      endDate.add(1, "days");
    }

    return time.isBetween(startDate, endDate);
  });

let data = [];

chrome.storage.sync.get(["data"], (result) => {
  data = result.data;
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.data && changes.data.newValue) {
    data = changes.data.newValue;
  }
});

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if (
    urlCheck(data, details.url) &&
    dayCheck(data, moment().format("dddd")) &&
    timeCheck(data, moment())
  ) {
    chrome.tabs.update(details.tabId, {
      url: chrome.extension.getURL("src/html/little-pause.html"),
    });
  }
});
