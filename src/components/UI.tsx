import { useEffect, useState } from "react";
import Logo from "./UI/Logo";
import ScrollDownIndicator from "./UI/ScrollDownIndicator";
import { useSpring, animated, config } from "react-spring";
import SoundIcon from "./UI/buttons/SoundBtn";
import { SceneProps } from "@/types/Types";
import ExploreBtn from "./UI/buttons/ExploreBtn";
import { getSceneStates } from "@/utils/utils";

export default function UI(props: { sceneState: SceneProps }) {
  const { sceneState, setSceneState } = props.sceneState;
  const [scrolled, setScrolled] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFadeIn(true);
    }, 5000);
  }, []);

  const fadeInStyle = useSpring({
    config: { ...config.slow },
    from: { opacity: 0 },
    to: { opacity: fadeIn ? 1 : 0 },
  });

  const sceneStates = getSceneStates(sceneState);
  const { showLogo, showExploreBtn } = sceneStates;

  return (
    <>
      {fadeIn && (
        <animated.div className="ui_wrapper" style={fadeInStyle}>
          {showLogo && <Logo />}
          <SoundIcon
            class="main"
            isEnterBtn={false}
            sceneState={{ sceneState, setSceneState }}
          />
          {!scrolled && (
            <ScrollDownIndicator scrollState={{ scrolled, setScrolled }} />
          )}
          {showExploreBtn && (
            <ExploreBtn sceneState={{ sceneState, setSceneState }} />
          )}
        </animated.div>
      )}
    </>
  );
}
