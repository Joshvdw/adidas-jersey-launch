"use client";

import {
  useCallback,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { useSpring, animated, config } from "react-spring";
import Preloader from "./Preloader";
import { SceneProps } from "@/types/Types";
import {
  videoStartAudioLogic,
  videoEndsAudioLogic,
} from "@/utils/sound";
import EnterScene from "./EnterScene";
import { checkIsSceneState, getSceneStates } from "@/utils/utils";
import { iOS_version } from "@/utils/utils";
import ErrorMessage from "./modals/ErrorModal";

const UnityBuild = forwardRef((props: { sceneState: SceneProps }, ref) => {
  const { sceneState, setSceneState } = props.sceneState;
  const [iOSNotSupported, setiOSNotSupported] = useState(false);
  const [isHotspotHovered, setIsHotspotHovered] = useState(false);

  const {
    unityProvider,
    sendMessage,
    addEventListener,
    removeEventListener,
    isLoaded,
    loadingProgression,
    initialisationError,
  } = useUnityContext({
    loaderUrl: "/Build/Build.loader.js",
    dataUrl: "/Build/Build.data.gz",
    frameworkUrl: "/Build/Build.framework.js.gz",
    codeUrl: "/Build/Build.wasm.gz",
  });

  useImperativeHandle(ref, () => ({
    sendMessage(functionName: string) {
      console.log(`msg sent to unity: '${functionName}'`);
      sendMessage("interactions_manager", functionName);
    },
  }));

  const processUnityMsg = useCallback((functionName: string) => {
    console.log(`msg received from unity: '${functionName}'`);

    if (functionName === "hero_video") {
      setSceneState("hero_video");
      videoStartAudioLogic();
    } else if (functionName === "close_video") {
      videoEndsAudioLogic();
    } else if (functionName === "hover_on" || functionName === "hover_off") {
      if (functionName === "hover_on") {
        setIsHotspotHovered(true);
      } else {
        setIsHotspotHovered(false);
      }
    } else {
      if (functionName === "behind_the_scene") {
        videoStartAudioLogic();
      }
      setSceneState(checkIsSceneState(functionName, sceneState));
    }
  }, []);

  useEffect(() => {
    addEventListener("unity_to_frontend", (functionName) =>
      processUnityMsg(functionName)
    );
    return () => {
      removeEventListener("unity_to_frontend", (functionName) =>
        processUnityMsg(functionName)
      );
    };
  }, [
    addEventListener,
    removeEventListener,
    processUnityMsg,
    setIsHotspotHovered,
  ]);

  useEffect(() => {
    const iOS = iOS_version();

    if (iOS !== null) {
      console.log(iOS);
      if (iOS.Major_Release_Numeric < 15) {
        setiOSNotSupported(true);
      }
    }
    if (initialisationError) console.log(initialisationError);
  }, [initialisationError]);

  const sceneStates = getSceneStates(sceneState);
  const { showPreloader, showEnterScene } = sceneStates;

  const fadeIn = useSpring({
    config: { ...config.slow },
    from: { opacity: 0 },
    to: { opacity: !showPreloader ? 1 : 0 },
  });

  return (
    <>
      {iOSNotSupported && <ErrorMessage />}
      {showPreloader && (
        <Preloader
          loadingProgress={Math.round(loadingProgression * 100)}
          loading={isLoaded}
          setSceneState={setSceneState}
        />
      )}
      <animated.div style={{ ...fadeIn }}>
        <Unity
          unityProvider={unityProvider}
          className="unity_canvas"
          style={{
            visibility: !showPreloader ? "visible" : "hidden",
            cursor: isHotspotHovered ? "pointer" : "default",
          }}
        />
        {showEnterScene && (
          <EnterScene sceneState={{ sceneState, setSceneState }} />
        )}
      </animated.div>
    </>
  );
});

UnityBuild.displayName = "UnityBuild";

export default UnityBuild;
