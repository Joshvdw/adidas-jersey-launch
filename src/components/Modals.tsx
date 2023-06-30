import { SceneProps } from "@/types/Types";
import InspectModal from "./modals/InspectModal";
import ModalData from "@/data/ModalData";
import VideoModal from "./modals/VideoModal";
import PressKit from "./modals/PressModal";
import { getSceneStates } from "@/utils/utils";

export default function Modals(props: { sceneState: SceneProps }) {
  const { sceneState, setSceneState } = props.sceneState;

  const sceneStates = getSceneStates(sceneState);
  const {
    showHeroVideo,
    showFern,
    showCollar,
    showSleeve,
    showVideoHover,
    showVideo,
    showPR,
    showToolkit,
    showEventPhotos,
  } = sceneStates;

  return (
    <>
      {showHeroVideo && (
        <VideoModal sceneState={{ sceneState, setSceneState }} isHeroVideo />
      )}
      {showFern && (
        <InspectModal
          data={ModalData.fern}
          sceneState={{ sceneState, setSceneState }}
        />
      )}
      {showCollar && (
        <InspectModal
          data={ModalData.collar}
          sceneState={{ sceneState, setSceneState }}
        />
      )}
      {showSleeve && (
        <InspectModal
          data={ModalData.sleeve}
          sceneState={{ sceneState, setSceneState }}
        />
      )}
      {showVideoHover && (
        <InspectModal
          data={ModalData.designVideo}
          sceneState={{ sceneState, setSceneState }}
        />
      )}
      {showVideo && (
        <VideoModal
          sceneState={{ sceneState, setSceneState }}
          isHeroVideo={false}
        />
      )}
      {showPR && (
        <PressKit
          data={ModalData.pressRelease}
          sceneState={{ sceneState, setSceneState }}
        />
      )}
      {showToolkit && (
        <PressKit
          data={ModalData.jerseyToolKit}
          sceneState={{ sceneState, setSceneState }}
        />
      )}
      {showEventPhotos && (
        <PressKit
          data={ModalData.eventPhotos}
          sceneState={{ sceneState, setSceneState }}
        />
      )}
    </>
  );
}
