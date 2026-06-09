import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useLocation, useNavigationType } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: true,
      wheelMultiplier: 0.9,
    });

    // Make lenis globally accessible for manual resets if needed
    window.lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  useEffect(() => {
    if (window.lenis && navType !== "POP") {
      window.lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, navType]);
}
