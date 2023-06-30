import React, { useEffect, useRef } from "react";
import SoundIcon from "../UI/buttons/SoundBtn";
import { isTouchDevice } from "@/utils/utils";
import { SceneProps } from "@/types/Types";

const MouseFollower = (props: { sceneState: SceneProps }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const { sceneState, setSceneState } = props.sceneState;

  const updatePosition = (event: { clientX: number; clientY: number }) => {
    if (divRef.current) {
      divRef.current.style.left = `${event.clientX}px`;
      divRef.current.style.top = `${event.clientY}px`;
    }
  };

  useEffect(() => {
    if (!isTouchDevice()) {
      document.addEventListener("mousemove", updatePosition);
      return () => {
        document.removeEventListener("mousemove", updatePosition);
      };
    }
  }, []);

  return (
    <div
      className={`mouse_follow_wrapper pointer ${
        isTouchDevice() ? "mobileEnterBtn" : ""
      }`}
      ref={divRef}
    >
      <p>sound on to experience the All Blacks legacy</p>
      <SoundIcon
        class="mouse_follow"
        isEnterBtn={false}
        sceneState={{ sceneState, setSceneState }}
      />
    </div>
  );
};

export default MouseFollower;
