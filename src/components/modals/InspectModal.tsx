import { DataProps, SceneProps } from "@/types/Types";
import { useSpring, animated, config } from "react-spring";
import { useEffect, useState } from "react";
import { isTouchDevice, isiOSDevice } from "@/utils/utils";

export default function InspectModal(props: {
  data: DataProps;
  sceneState: SceneProps;
}) {
  const { title, text } = props.data;
  const { setSceneState } = props.sceneState;

  const [isSafariIos, setIsSafariIos] = useState(false);

  function closeModal() {
    setSceneState("exploreScene");
  }

  const [fadeIn, setFade] = useSpring(() => ({
    opacity: 0,
  }));

  useEffect(() => {
    setFade({ opacity: 1, config: config.molasses });
  }, [fadeIn]);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase(),
      safari = /safari/.test(userAgent),
      iosMobile = /iphone|ipod/.test(userAgent);
    console.log(safari, iosMobile);
    if (safari && iosMobile) {
      setIsSafariIos(true);
    }
  }, []);

  return (
    <>
      <animated.div
        className={`inspect_modal_wrapper ${title}_modal ${
          isSafariIos && "safari-ios"
        }`}
        onClick={closeModal}
        style={fadeIn}
      >
        <h3 className="inspect_modal_title">{title}</h3>
        <p className="inspect_modal_text">{text}</p>
      </animated.div>
      {isTouchDevice() && (
        <div className="mobile_indicator_wrapper">
          <p className="indicator_text">
            press and hold the hotspot to look around
          </p>
        </div>
      )}
    </>
  );
}
