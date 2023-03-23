let uri = location.href;

function delShortsSideBar() {
  let shortsIcon = document.querySelectorAll("#endpoint[title='Shorts'");

  if (shortsIcon.length == 0) {
    setTimeout(() => {
      delShortsSideBar();
    }, 500);
  }

  shortsIcon.forEach((e) => {
    e.style.display = "none";
  });
}

function delShortsSub() {
  let elems = document.querySelectorAll(
    "ytd-grid-video-renderer, ytd-video-renderer"
  );

  if (elems.length == 0) {
    setTimeout(() => {
      delShortsSub();
    }, 500);
  }

  elems.forEach((e) => {
    if (e.querySelector("a").href.includes("/shorts/")) {
      e.style.display = "none";
    }
  });
}

function delShortsHome() {
  let elems = document.querySelectorAll(".ytd-rich-shelf-renderer");

  if (elems.length == 0) {
    setTimeout(() => {
      delShortsHome();
    }, 500);
  }

  elems.forEach((e) => {
    if (e.querySelector("h2")?.textContent.includes("Shorts")) {
      e.style.display = "none";
    }
  });
}

function delShortsSearch() {
  let shelf = document.querySelectorAll("#contents > ytd-reel-shelf-renderer");
  let shorts = document.querySelectorAll("ytd-video-renderer");

  if (shelf.length == 0) {
    setTimeout(() => {
      delShortsHome();
    }, 500);
  }

  shelf.forEach((e) => {
    e.style.display = "none";
  });

  shorts.forEach((e) => {
    if (e.querySelector("a").href.includes("/shorts/")) {
      e.style.display = "none";
    }
  });
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
    let obs = new MutationObserver(dispatch);
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

// function logConsole(str) {
//   console.log("==================");
//   console.log(str);
//   console.log("==================");
// }
