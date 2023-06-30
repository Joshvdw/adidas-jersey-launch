import { useContext } from "react";
import { Context } from "@/hooks/Context";
import { SceneProps } from "@/types/Types";
import { playSound } from "@/utils/sound";
import Passwordform from "./UI/PasswordForm";

export default function EnterScene(props: { sceneState: SceneProps }) {
  const { sceneState, setSceneState } = props.sceneState;

  const msgUnity = useContext(Context);

  function startIntro() {
    setSceneState("tunnelScene");
    playSound("bgMusic");
    if (msgUnity != null) msgUnity("open_unity");
  }

  return (
    <div className="enterScene_wrapper">
      <Passwordform
        sceneState={{ sceneState, setSceneState }}
        startIntro={startIntro}
      />
    </div>
  );
}
