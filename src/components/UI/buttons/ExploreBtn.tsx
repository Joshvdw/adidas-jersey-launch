import { SceneProps } from "@/types/Types";
import { Context } from "@/hooks/Context";
import { useSpring, animated, config } from "react-spring";
import {
  useEffect,
  useContext,
  useState,
  useRef,
  MutableRefObject,
} from "react";
import lottie, { AnimationItem } from "lottie-web";

export default function ExploreBtn(props: { sceneState: SceneProps }) {
  const { setSceneState } = props.sceneState;
  const [hovered, setHovered] = useState(false);

  const lottieContainer = useRef<HTMLDivElement>(null);
  const anim: MutableRefObject<AnimationItem | null> = useRef(null);

  useEffect(() => {
    if (lottieContainer.current) {
      anim.current = lottie.loadAnimation({
        container: lottieContainer.current!,
        renderer: "svg",
        loop: true,
        autoplay: false,
        path: "lotties/arrow.json",
      });
      return () => {
        if (anim.current) {
          anim.current.destroy();
        }
      };
    }
  }, []);

  useEffect(() => {
    if (hovered) {
      anim.current?.play();
    } else {
      anim.current?.stop();
    }
  }, [hovered]);

  const springProps = useSpring({
    scale: hovered ? 0.95 : 0.9,
    config: { duration: 100 },
  });

  const msgUnity = useContext(Context);

  const [fadeIn, setFade] = useSpring(() => ({
    opacity: 0,
  }));

  useEffect(() => {
    setFade({ opacity: 1, delay: 1000, config: config.molasses });
  }, [fadeIn]);

  function handleClick() {
    setSceneState("lockerScene");
    if (msgUnity != null) msgUnity("explore_more");
  }

  return (
    <animated.div
      className="CTA_inner back_btn_inner pointer"
      onClick={handleClick}
      style={{ ...fadeIn, ...springProps }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="download_btn">
        <div className="arrow_lottie" ref={lottieContainer}></div>
      </div>
      <p>view more</p>
    </animated.div>
  );
}
