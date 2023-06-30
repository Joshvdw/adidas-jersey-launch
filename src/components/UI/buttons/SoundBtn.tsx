import { muteToggle } from "@/utils/sound";
import Image from "next/image";
import { useState, useContext } from "react";
import ModalData from "@/data/ModalData";
import { SceneProps } from "@/types/Types";

export default function SoundIcon(props: {
  class: string;
  isEnterBtn: boolean;
  sceneState: SceneProps;
}) {
  let sceneState: string;

  if (props.sceneState) {
    sceneState = props.sceneState.sceneState;
  }

  const [isMuted, setIsMuted] = useState(false);
  const [blockClick, setBlockClick] = useState(false);

  function handleClick() {
    if (!blockClick) {
      if (sceneState === "hero_video" || sceneState === "behind_the_scene") {
        muteToggle(ModalData.backgroundMusicVolume, true);
      } else {
        muteToggle(ModalData.backgroundMusicVolume, false);
      }
      setIsMuted(!isMuted);
      setBlockClick(true);
      setTimeout(() => {
        setBlockClick(false);
      }, 1000);
    }
  }

  return (
    <div className="sound_icon_wrapper">
      {props.isEnterBtn ? (
        <Image
          src="/svg/sound_icon_no_circle.svg"
          width={15}
          height={15}
          alt="Sound Icon"
          className={`sound_icon_${props.class} pointer`}
          onClick={handleClick}
        />
      ) : isMuted ? (
        <Image
          src="/svg/sound_icon_off.svg"
          width={30}
          height={30}
          alt="Sound Icon"
          className={`sound_icon_${props.class} pointer`}
          onClick={handleClick}
        />
      ) : (
        <Image
          src="/svg/sound_icon.svg"
          width={30}
          height={30}
          alt="Sound Icon"
          className={`sound_icon_${props.class} pointer`}
          onClick={handleClick}
        />
      )}
    </div>
  );
}
