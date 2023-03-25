let uri = location.href;
let obs = null;

function applyDisplayNone(nodes) {
  nodes.map((e) => (e.style.display = "none"));
}

function delShortsSideBar() {
  let elems = document.querySelectorAll("#endpoint[title='Shorts'");

  if (elems.length == 0) {
    setTimeout(() => {
      delShortsSideBar();
    }, 500);
  }
  applyDisplayNone([...elems]);
}

function delShortsSub() {
  const elems = document.querySelectorAll(
    "ytd-grid-video-renderer, ytd-video-renderer"
  );

  if (elems.length == 0) {
    setTimeout(() => {
      delShortsSub();
    }, 500);
  }

  const elemsToDel = [...elems].filter((e) =>
    e.querySelector("a").href.includes("/shorts/")
  );

  applyDisplayNone(elemsToDel);
}

function delShortsHome() {
  const elems = document.querySelectorAll(".ytd-rich-shelf-renderer");

  if (elems.length == 0) {
    setTimeout(() => {
      delShortsHome();
    }, 500);
  }

  const elemsToDel = [...elems].filter((e) =>
    e.querySelector("h2")?.textContent.includes("Shorts")
  );

  applyDisplayNone(elemsToDel);
}

function delShortsSearch() {
  let shelf = document.querySelectorAll("#contents > ytd-reel-shelf-renderer");
  let shorts = document.querySelectorAll("ytd-video-renderer");

  if (shelf.length == 0) {
    setTimeout(() => {
      delShortsHome();
    }, 500);
  }

  const shortsToDel = [...shorts].filter((e) =>
    e.querySelector("a").href.includes("/shorts/")
  );

  applyDisplayNone([...shelf]);
  applyDisplayNone(shortsToDel);
}

function dispatch() {
  uri = location.href;
  if (uri === "https://www.youtube.com/feed/subscriptions") {
    delShortsSub();
  } else if (uri === "https://www.youtube.com/") {
    delShortsHome();
  } else if (uri.includes("https://www.youtube.com/results?search_query=")) {
    delShortsSearch();
  }
}

function waitDOMElem() {
  let body = document.body;

  if (body != null) {
    dispatch();
    delShortsSideBar();
    obs = new MutationObserver(dispatch);
    obs.observe(body, { subtree: true, childList: true });
  } else {
    setTimeout(() => {
      waitDOMElem();
    }, 500);
  }
}

window.addEventListener("load", () => {
  waitDOMElem();
});

window.addEventListener("beforeunload", (e) => {
  if (obs) obs.disconnect();
});

// function logConsole(str) {
//   console.log("==================");
//   console.log(str);
//   console.log("==================");
// }
