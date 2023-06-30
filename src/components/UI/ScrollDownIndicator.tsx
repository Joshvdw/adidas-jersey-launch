import lottie, { AnimationItem } from "lottie-web";
import { useSpring, animated, config } from "react-spring";
import { useRef, useEffect, useState, MutableRefObject } from "react";
import { ScrollProps } from "@/types/Types";
import { useHasTouched } from "@/hooks/Mobile";
import { isTouchDevice } from "@/utils/utils";

export default function ScrollDownIndicator(props: ScrollProps) {
  const { scrolled, setScrolled } = props.scrollState;
  const [fadeOut, setFadeOut] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  const lottieContainer = useRef<HTMLDivElement>(null);
  const anim: MutableRefObject<AnimationItem | null> = useRef(null);

  const scrollDownLottie = "lotties/scroll_down_lottie.json";
  const swipeUpLottie = "lotties/swipe_up_lottie.json";

  useEffect(() => {
    if (lottieContainer.current) {
      anim.current = lottie.loadAnimation({
        container: lottieContainer.current!,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: !isTouchDevice() ? scrollDownLottie : swipeUpLottie,
      });
      return () => {
        if (anim.current) {
          anim.current.destroy();
        }
      };
    }
  }, []);

  function handleScroll() {
    setFadeOut(true);
  }

  useEffect(() => {
    document.addEventListener("wheel", handleScroll);

    return () => {
      document.removeEventListener("wheel", handleScroll);
    };
  }, [scrolled]);

  useEffect(() => {
    setTimeout(() => {
      setTimedOut(true);
    }, 5000);
  }, [timedOut]);

  const hasUserTouched = useHasTouched();

  const fadeOutScroll = useSpring({
    config: { ...config.slow },
    from: { opacity: 1 },
    to: { opacity: timedOut || fadeOut || hasUserTouched ? 0 : 1 },
    onRest: () => {
      setScrolled(true);
    },
  });

  return (
    <animated.div className="scrolldown_wrapper" style={fadeOutScroll}>
      <div className="scroll_inner">
        <div
          className={`scrolldown_lottie ${
            !isTouchDevice() ? "scrollDownLottie" : "swipeUpLottie"
          }`}
          ref={lottieContainer}
        ></div>
        <p className="scrolldown_text">
          {!isTouchDevice() ? "SCROLL TO EXPLORE" : "SWIPE TO EXPLORE"}
        </p>
      </div>
    </animated.div>
  );
}
