import type Lenis from "lenis";

declare global {
  interface Window {
    // The Lenis instance is shared so the preloader / mobile menu can lock
    // and release scrolling without prop-drilling.
    __lenis?: Lenis;
  }
}

export {};
