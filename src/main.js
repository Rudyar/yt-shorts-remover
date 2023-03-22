let uri = location.href;

function delShortsSubTab() {
  let elems = document.querySelectorAll(
    "ytd-grid-video-renderer, ytd-video-renderer"
  );
  if (elems.length == 0) {
    setTimeout(() => {
      delShortsSubTab();
    }, 500);
  }
  elems.forEach((e) => {
    if (e.querySelector("a").href.includes("/shorts/")) {
      e.remove();
    }
  });
}

function delShortsHome() {
  logConsole("DelHome");
  let elems = document.querySelectorAll(".ytd-rich-shelf-renderer");
  if (elems.length == 0) {
    setTimeout(() => {
      delShortsHome();
    }, 500);
  }
  logConsole(elems);
  elems.forEach((e) => {
    if (e.querySelector("h2")?.textContent.includes("Shorts")) {
      e.remove();
    }
  });
}

function waitDOMElem() {
  if (document.body != null) {
    if (uri === "https://www.youtube.com/feed/subscriptions") {
      delShortsSubTab();
    } else if (uri === "https://www.youtube.com/") {
      delShortsHome();
    } else {
      logConsole(uri);
    }
  } else {
    setTimeout(() => {
      waitDOMElem();
    }, 1000);
  }
}

window.addEventListener("load", () => {
  waitDOMElem();
});

function logConsole(str) {
  console.log("==================");
  console.log(str);
  console.log("==================");
}
