"use client";

import { useRef, useState } from "react";
import "../styles/globals.scss";
import UnityBuild from "@/components/UnityBuild";
import { Context } from "@/hooks/Context";
import UI from "@/components/UI";
import { SceneProps } from "@/types/Types";
import Sound from "@/components/Sound";
import { getSceneStates } from "@/utils/utils";
import ErrorBoundary from "@/components/ErrorBoundary";
import Modals from "@/components/Modals";
import ErrorMessage from "@/components/modals/ErrorModal";

export default function Home() {
  const [sceneState, setSceneState] =
    useState<SceneProps["sceneState"]>("preLoader");

  console.log("current sceneState =", sceneState);

  //@ts-ignore
  const unityBuild = useRef<UnityBuild>(null);

  function msgUnity(functionName: string) {
    return unityBuild.current?.sendMessage(functionName);
  }

  const sceneStates = getSceneStates(sceneState);
  const { showUI } = sceneStates;

  return (
    <ErrorBoundary fallback={<ErrorMessage />}>
      <main>
        <Context.Provider value={msgUnity}>
          {showUI && <UI sceneState={{ sceneState, setSceneState }} />}
          <Modals sceneState={{ sceneState, setSceneState }} />
          <UnityBuild
            ref={unityBuild}
            sceneState={{ sceneState, setSceneState }}
          />
          <Sound />
        </Context.Provider>
      </main>
    </ErrorBoundary>
  );
}
