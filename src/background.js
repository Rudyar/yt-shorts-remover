// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//   if (
//     tab.url &&
//     tab.url.includes("https://www.youtube.com/feed/subscriptions")
//   ) {
//     const obj = {
//       type: "SUB_TAB",
//       msg: "Sub tab is active !",
//       url: tab.url,
//     };
//     return new Promise((resolve, reject) => {
//       chrome.tabs.sendMessage(tab.id, obj, (res) => {
//         if (res.ok) {
//           resolve(res);
//         } else {
//           reject(res);
//         }
//       });
//     });
//   }
// });
