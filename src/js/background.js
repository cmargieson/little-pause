import moment from "moment";

const urlCheck = (urlA, urlB) => urlA === urlB;

const dayCheck = (checkedDays, day) => checkedDays.includes(day);

const timeCheck = (start, end) => {
  if (!start || !end) {
    return true;
  }

  const startDate = moment(start, ["hh:mm a"]);
  const endDate = moment(end, ["hh:mm a"]);

  if (endDate.isBefore(startDate)) {
    // End date must be tomorrow
    endDate.add(1, "days");
  }

  return moment().isBetween(startDate, endDate);
};

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
  data.map((item) => {
    if (urlCheck(item.url, details.url)) {
      if (dayCheck(item.checkedDays, moment().format("dddd"))) {
        if (timeCheck(item.startTime, item.endTime)) {
          chrome.tabs.update(details.tabId, {
            url: chrome.extension.getURL("src/html/little-pause.html"),
          });
        }
      }
    }
  });
});
