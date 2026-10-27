/* Shared public-site configuration for Reignsound.org. */
(() => {
  "use strict";

  const config = Object.freeze({
    footerDescription: "A global enterprise building in support of a better universe."
  });

  function applySharedSiteConfig() {
    document.querySelectorAll("[data-reignsound-footer-description]").forEach((element) => {
      element.textContent = config.footerDescription;
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applySharedSiteConfig, { once: true });
  } else {
    applySharedSiteConfig();
  }
})();
