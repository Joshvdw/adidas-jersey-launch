import ModalData from "@/data/ModalData";
import { setAudioRefs, reduceVolume } from "@/utils/sound";
import React, { useEffect, useRef } from "react";

export default function Sound() {
  const bgMusic = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setAudioRefs(bgMusic);
    reduceVolume("bgMusic", ModalData.backgroundMusicVolume);
  }, []);

  return (
    <>
      <audio
        src="https://rwc-jersey-launch.syd1.cdn.digitaloceanspaces.com/rwc_bg_ambience.mp3"
        ref={bgMusic}
        id="bgMusic"
        loop
      />
    </>
  );
}
