import ModalData from "@/data/ModalData";
import { MutableRefObject } from "react";

const sounds: Record<string, HTMLAudioElement> = {};
const videos: Record<string, HTMLVideoElement> = {};

let muted = false;

function setAudioRefs(ref: MutableRefObject<HTMLAudioElement | null>) {
  sounds[`${ref.current?.id}`] = ref.current as HTMLAudioElement;
}

function setVideoRefs(ref: MutableRefObject<HTMLVideoElement | null>) {
  videos[`${ref.current?.className}`] = ref.current as HTMLVideoElement;
  if (muted) videos[`${ref.current?.className}`].volume = 0;
}

function reduceVolume(target: string, amount: number) {
  if (target === "bgMusic") {
    sounds[target].volume = amount;
  } else {
    videos[target].volume = amount;
  }
}

function playSound(sound: string) {
  return sounds[sound].play();
}

function videoStartAudioLogic() {
  if (!muted) {
    fadeAllSounds(0, false, true);
    console.log('vidstart');
    
  }
}

function videoEndsAudioLogic() {
  if (!muted) {
    fadeAllSounds(ModalData.backgroundMusicVolume, false, false);
        console.log("vidend");
  }
}

function muteToggle(targetVolume: number, videoOnly: boolean) {
  muted = !muted;
  if (muted) {
    fadeAllSounds(0, videoOnly, false);
    setTimeout(() => {
      muteAllSounds();
    }, 500);
  } else {
    unMuteAllSounds();
    fadeAllSounds(targetVolume, videoOnly, false);
  }
}

function fadeAllSounds(targetVolume: number, videoOnly: boolean, audioOnly: boolean) {
  const allSounds = Object.keys(sounds);
  allSounds.forEach((key: string) => {
    if (!videoOnly) animateVolume(sounds[key], targetVolume, 500);
  });
  const allVideos = Object.keys(videos);
  allVideos.forEach((key: string) => {
    if (!audioOnly) animateVolume(videos[key], targetVolume, 500);
  });
}

function muteAllSounds() {
  const allSounds = Object.keys(sounds);
  allSounds.forEach((key: string) => {
    sounds[key].muted = true;
  });
  const allVideos = Object.keys(videos);
  allVideos.forEach((key: string) => {
    videos[key].muted = true;
  });
}

function unMuteAllSounds() {
  const allSounds = Object.keys(sounds);
  allSounds.forEach((key: string) => {
    sounds[key].muted = false;
  });
  const allVideos = Object.keys(videos);
  allVideos.forEach((key: string) => {
    videos[key].muted = false;
  });
}

function isMuted() {
  return muted;
}

function animateVolume(
  element: HTMLAudioElement,
  targetVolume: number,
  duration: number
) {
  const startVolume = element.volume;
  const volumeChange = targetVolume - startVolume;
  const interval = 10; // interval time for volume update (in milliseconds)
  const steps = duration / interval;
  let currentStep = 0;

  const volumeStep = volumeChange / steps;

  const volumeInterval = setInterval(() => {
    currentStep++;
    element.volume = startVolume + volumeStep * currentStep;

    if (
      (volumeChange > 0 && element.volume >= targetVolume) ||
      (volumeChange < 0 && element.volume <= targetVolume)
    ) {
      clearInterval(volumeInterval);
    }
  }, interval);
}

export {
  setAudioRefs,
  setVideoRefs,
  playSound,
  videoStartAudioLogic,
  videoEndsAudioLogic,
  muteToggle,
  fadeAllSounds,
  reduceVolume,
  isMuted,
  animateVolume,
  muteAllSounds,
  unMuteAllSounds,
};
