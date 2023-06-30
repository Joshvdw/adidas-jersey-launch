import { SceneProps } from "@/types/Types";
import SoundIcon from "./SoundBtn";
import { useState } from "react";
import { useSpring, animated } from "react-spring";

export default function EnterBtn(props: { sceneState: SceneProps }) {
  const { sceneState, setSceneState } = props.sceneState;
  const [hovered, setHovered] = useState(false);

  const springProps = useSpring({
    scale: hovered ? 1.05 : 1,
    config: { duration: 100 },
  });
  return (
    <animated.div
      className="enter_btn_wrapper pointer"
      style={springProps}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <SoundIcon
        class="mouse_follow"
        isEnterBtn
        sceneState={{ sceneState, setSceneState }}
      />
      <p>enter</p>
    </animated.div>
  );
}
