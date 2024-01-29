import Lenis from "@studio-freight/lenis";
import {ScrollTrigger} from "gsap/ScrollTrigger";

export const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
});

function smooth() {
    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);

    // ScrollSmoother.normalizeScroll(true);
    // let smoother = ScrollSmoother.create({
    //    smooth: 2,
    //    effect: true,
    //    normalizeScroll: true
    // });
}

export default smooth;