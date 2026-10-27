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

  function applyNotesHeading() {
    document.querySelectorAll(".notes-section").forEach((section) => {
      const heading = section.querySelector("#notes-title");
      const notes = section.querySelectorAll(":scope ol > li, :scope ul > li");
      if (heading && notes.length > 0) {
        heading.textContent = notes.length === 1 ? "Note:" : "Notes:";
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      applySharedSiteConfig();
      applyNotesHeading();
    }, { once: true });
  } else {
    applySharedSiteConfig();
    applyNotesHeading();
  }
})();
