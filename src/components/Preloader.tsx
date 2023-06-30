import { useSpring, config, animated } from "react-spring";
import lottie, { AnimationItem } from "lottie-web";
import { useRef, useEffect, MutableRefObject } from "react";
import { SceneProps } from "@/types/Types";

export default function Preloader(props: {
  loadingProgress: number;
  loading: boolean;
  setSceneState: SceneProps["setSceneState"];
}) {
  const { loading, loadingProgress, setSceneState } = props;
  const lottieContainer = useRef<HTMLDivElement>(null);
  const anim: MutableRefObject<AnimationItem | null> = useRef(null);

  useEffect(() => {
    if (lottieContainer.current) {
      anim.current = lottie.loadAnimation({
        container: lottieContainer.current!,
        renderer: "svg",
        loop: false,
        autoplay: false,
        path: "lotties/loading_anim.json",
      });
      return () => {
        if (anim.current) {
          anim.current.destroy();
        }
      };
    }
  }, []);

  useEffect(() => {
    if (anim.current) {
      const animation = anim.current;
      const frame = loadingProgress;
      animation.goToAndStop(frame - 1, true);
    }
  }, [props.loadingProgress]);

  const animationConfig = useSpring({
    to: { loadingValue: loadingProgress },
  });

  const { loadingValue } = animationConfig;
  const fadeOut = useSpring({
    config: { ...config.slow },
    delay: 1000,
    from: { opacity: 1 },
    to: { opacity: loading ? 0 : 1 },
    onRest: () => {
      setSceneState("enterScene");
    },
  });

  return (
    <animated.div className="preloader_wrapper" style={fadeOut}>
      <div className="preloader_text_wrapper">
        <h1>
          adidas All Blacks Rugby World Cup 2023
          <span className="trademark">{"\u2122"}</span> jersey
        </h1>
      </div>
      <div className="progress_circle" ref={lottieContainer}></div>
      <div className="progress_text_wrapper">
        <animated.p className="progress_text">
          {loadingValue.to((val) => `${Math.round(val)}%`)}
        </animated.p>
      </div>
    </animated.div>
  );
}
