import { SceneProps } from "@/types/Types";
import { checkIsSceneState } from "@/utils/utils";
import { Context } from "@/hooks/Context";
import { useContext, useState } from "react";
import { videoEndsAudioLogic } from "@/utils/sound";
import { useSpring, animated } from "react-spring";

export default function CloseBtn(props: {
  sceneState: SceneProps;
  closeState: string;
}) {
  const { sceneState, setSceneState } = props.sceneState;
  const { closeState } = props;

  const [hovered, setHovered] = useState(false);

  const msgUnity = useContext(Context);

  function closeModal() {
    setSceneState(checkIsSceneState(closeState, sceneState));
    if (closeState === "exploreScene") {
      if (sceneState === "hero_video") {
        setTimeout(() => {
          if (msgUnity != null) msgUnity("close_modal");
        }, 500);
      } else {
        if (msgUnity != null) msgUnity("close_modal");
      }
      videoEndsAudioLogic();
    } else {
      if (msgUnity != null) msgUnity("explore_more");
    }
  }

  const springProps = useSpring({
    scale: hovered ? 1.05 : 1,
    config: { duration: 100 },
  });
  const colorProps = useSpring({
    color: hovered ? "#ffffff" : "#d9d9d9",
    config: { duration: 100 },
  });

  return (
    <animated.div
      className="close_btn_outer"
      style={springProps}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="close_btn_wrapper pointer" onClick={closeModal}>
        <animated.p className="close_btn" style={colorProps}>
          close
        </animated.p>
      </div>
    </animated.div>
  );
}
