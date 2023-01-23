var fontsInServiceWorker =
    (sessionStorage.foutFontsStage1Loaded &&
      sessionStorage.foutFontsStage2Loaded) ||
    ("serviceWorker" in navigator &&
      navigator.serviceWorker.controller !== null &&
      navigator.serviceWorker.controller.state === "activated"),
  docEl;
if (!fontsInServiceWorker && "fonts" in document) {
  function fetchFonts(a) {
    return Promise.all(
      a.map(function (a) {
        return document.fonts.load(a);
      })
    );
  }
  sessionStorage.foutFontsStage2Loaded
    ? (document.documentElement.className += " wf-loaded-stage2")
    : (sessionStorage.foutFontsStage1Loaded = !0);
}
if (
  "fonts" in document &&
  !("connection" in navigator && navigator.connection.saveData)
) {
  let a = new FontFace(
      "Elena",
      "url(/fonts/ElenaWebRegular/ElenaWebRegular-subset-v2.woff2) format('woff2')"
    ),
    b = new FontFace(
      "Elena",
      "url(/fonts/ElenaWebBold/ElenaWebBold-subset-v2.woff2) format('woff2')",
      {
        weight: "700",
      }
    ),
    c = new FontFace(
      "Elena",
      "url(/fonts/ElenaWebRegularItalic/ElenaWebRegularItalic-subset-v2.woff2) format('woff2')",
      {
        style: "italic",
      }
    ),
    d = new FontFace(
      "Mija",
      "url(/fonts/MijaBold/Mija_Bold-webfont-subset-v2.woff2) format('woff2')",
      {
        weight: "700",
      }
    ),
    e = Promise.all([a.load(), b.load(), d.load(), c.load()])
      .then((a) => {
        a.forEach((a) => document.fonts.add(a)),
          document.documentElement.classList.add("wf-loaded-stage2"),
          (sessionStorage.foutFontsStage2Loaded = !0);
      })
      .catch((a) => {
        throw new Error(`Error caught: ${a}`);
      });
}
((sessionStorage.foutFontsStage1Loaded &&
  sessionStorage.foutFontsStage2Loaded) ||
  ("serviceWorker" in navigator &&
    navigator.serviceWorker.controller !== null &&
    navigator.serviceWorker.controller.state === "activated")) &&
  ((docEl = document.documentElement), docEl.classList.add("wf-loaded-stage2")),
  !1 in document &&
    "addEventListener" in window &&
    "getComputedStyle" in window &&
    (window.document.documentElement.className += " no-js"),
  (window.document.documentElement.className += " enhanced js");
