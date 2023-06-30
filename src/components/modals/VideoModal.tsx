"use client";

import { Context } from "@/hooks/Context";
import { useContext, useEffect, useRef, useState } from "react";
import { SceneProps } from "@/types/Types";
import CloseBtn from "../UI/buttons/CloseBtn";
import { useSpring, animated, config } from "react-spring";
import {
  isMuted,
  setVideoRefs,
  videoEndsAudioLogic,
} from "@/utils/sound";
import { isiOSDevice } from "@/utils/utils";
import PlayIcon from "../UI/buttons/PlayBtn";

export default function DesignerVideo(props: {
  sceneState: SceneProps;
  isHeroVideo: boolean;
}) {
  const { sceneState, setSceneState } = props.sceneState;
  const isHeroVideo = props.isHeroVideo;

  const [progress, setProgress] = useState(0);
  const [isIOs, setIsIOs] = useState(false);
  const [transitionFinished, setTransitionFinished] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const msgUnity = useContext(Context);

  const handleProgress = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const currentTime = videoElement.currentTime;
      const duration = videoElement.duration;
      const progress = (currentTime / duration) * 100;
      setProgress(progress);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setTransitionFinished(true);
    }, 1000);

    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.addEventListener("timeupdate", handleProgress);
      videoElement.onended = () => {
        endVideo();
      };
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("timeupdate", handleProgress);
      }
    };
  }, []);

  function endVideo() {
    if (isHeroVideo) {
      setTimeout(() => {
        if (msgUnity != null) msgUnity("zoom_in");
      }, 250);
    } else {
      if (msgUnity != null) msgUnity("close_modal");
    }
    videoEndsAudioLogic();
    setSceneState("exploreScene");
  }

  const [fadeIn, setFade] = useSpring(() => ({
    opacity: 0,
  }));
  const [fadePlayBtn, setFadePlayBtn] = useSpring(() => ({
    opacity: 0,
  }));
  const [scaleIn, setScale] = useSpring(() => ({
    scale: 0,
  }));

  useEffect(() => {
    setFade({ opacity: 1, delay: 500, config: config.slow });
    setScale({
      scale: 1,
      delay: isHeroVideo ? 0 : 500,
      config: isHeroVideo ? { duration: 1500 } : config.slow,
    });
  }, [fadeIn, setScale]);

  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.target !== e.currentTarget) return;
    if (transitionFinished) endVideo();
  }

  useEffect(() => {
    setVideoRefs(videoRef);
    setIsIOs(isiOSDevice());
    if (!isIOs) {
      playVideo();
    }
    if (isiOSDevice()) {
      console.log("User's device is an iOS device.");
    } else {
      console.log("User's device is not an iOS device.");
    }
    setFadePlayBtn({ opacity: 1, config: config.gentle });
  }, []);

  useEffect(() => {
    setFadePlayBtn({ opacity: 1 });
  }, [isIOs]);

  function playVideo() {
    const video = videoRef.current;
    if (video) {
      if (isMuted() == false) video.muted = false;
      video.play();
    }
    setFadePlayBtn({ opacity: 0, config: config.gentle });
  }

  return (
    <animated.div className="modal_outer_wrapper pr_outer" style={fadeIn}>
      <div className="modal_middle_wrapper" onClick={handleClick}>
        <animated.div className="video_modal_inner" style={scaleIn}>
          <video
            className="video_modal"
            ref={videoRef}
            playsInline
            disablePictureInPicture
            webkit-playsinline="true"
            controls={false}
            autoPlay={false}
            onClick={playVideo}
            muted
          >
            <source
              src={`https://rwc-jersey-launch.syd1.cdn.digitaloceanspaces.com/${
                isHeroVideo ? "hero_video_16x9" : "Behind_The_Jersey_Design"
              }.mp4`}
              type="video/mp4"
            />
          </video>
          <div className="progress-bar">
            <div
              className="progress"
              style={{ transform: `translateX(-${100 - progress}%)` }}
            ></div>
          </div>
          {isiOSDevice() && (
            <animated.div
              className="play_btn_wrapper pointer"
              onClick={playVideo}
              style={fadePlayBtn}
            >
              <PlayIcon />
            </animated.div>
          )}
        </animated.div>
        <CloseBtn
          sceneState={{ sceneState, setSceneState }}
          closeState="exploreScene"
        />
      </div>
    </animated.div>
  );
}
