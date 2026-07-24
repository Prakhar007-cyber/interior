"use client";

/**
 * Smoothly scroll to an in-page anchor using Lenis when available, falling back
 * to native smooth scroll. Used by the nav + footer for hash links on the home
 * page so navigation feels consistent with the rest of the site.
 */
export function scrollToHash(hash: string) {
  const id = hash.replace(/^\/?#/, "");
  const el = document.getElementById(id);
  if (!el) return;

  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: 0, duration: 1.2 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
