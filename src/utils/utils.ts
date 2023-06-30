import { IOSInfo, SceneProps, SceneState } from "@/types/Types";

// check if scene state exists
export const checkIsSceneState = (str: string, currentState: SceneState) => {
  if (
    str === "preLoader" ||
    str === "enterScene" ||
    str === "tunnelScene" ||
    str === "lockerScene" ||
    str === "exploreScene" ||
    str === "hero_video" ||
    str === "behind_the_scene" ||
    str === "behind_the_scene_hover" ||
    str === "press_release" ||
    str === "jersey_toolkit" ||
    str === "event_photos" ||
    str === "share_your_legacy" ||
    str == "fern" ||
    str === "collar" ||
    str === "sleeve"
  ) {
    const sceneState: SceneState = str;
    return sceneState;
  } else {
    return currentState;
  }
};

// CHECK IF DEVICE IS TOUCH ENABLED
function isTouchDevice() {
  const userAgent = navigator.userAgent.toLowerCase();
  var isMobile = /iPhone|Android/i.test(navigator.userAgent);

  const isTablet =
    /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
      userAgent
    );

  if (isMobile || isTablet) {
    return true;
  } else {
    return false;
  }
}

// CHECK iOS version of device
// https://stackoverflow.com/questions/8348139/detect-ios-version-less-than-5-with-javascript
function iOS_version(): IOSInfo | null {
  if (navigator.userAgent.match(/ipad|iphone|ipod/i)) {
    const ios_info: IOSInfo = {
      User_Agent: navigator.userAgent,
      As_Reported: "",
      Major_Release: "",
      Full_Release: "",
      Major_Release_Numeric: 0,
      Full_Release_Numeric: 0,
    };
    const osMatch = navigator.userAgent.match(/OS (\d)?\d_\d(_\d)?/i);
    if (osMatch !== null) {
      ios_info.As_Reported = osMatch[0];
      ios_info.Major_Release = osMatch[0].split("_")[0];
      ios_info.Full_Release = osMatch[0].replace(/_/g, ".");
      ios_info.Major_Release_Numeric = +osMatch[0]
        .split("_")[0]
        .replace("OS ", "");
      ios_info.Full_Release_Numeric = +osMatch[0]
        .replace("_", ".")
        .replace("_", "")
        .replace("OS ", "");
    }
    return ios_info;
  }

  return null;
}

// return to locker scene on escape key press
function escapeKeyClose(
  setSceneState: SceneProps["setSceneState"],
  handleClick: Function
) {
  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClick();
    }
  };

  document.addEventListener("keydown", handleEscapeKey);
}

// get scene states
function getSceneStates(sceneState: SceneState) {
  const showStates = {
    showUI: sceneState != "preLoader" && sceneState != "enterScene",
    showPreloader: sceneState === "preLoader",
    showEnterScene: sceneState === "enterScene",
    showHeroVideo: sceneState === "hero_video",
    showLogo:
      sceneState != "preLoader" &&
      sceneState != "enterScene" &&
      sceneState != "hero_video" &&
      sceneState != "tunnelScene",
    showExploreBtn:
      sceneState === "exploreScene" ||
      sceneState === "behind_the_scene_hover" ||
      sceneState === "collar" ||
      sceneState === "sleeve" ||
      sceneState === "fern",
    showFern: sceneState === "fern",
    showCollar: sceneState === "collar",
    showSleeve: sceneState === "sleeve",
    showVideo: sceneState === "behind_the_scene",
    showVideoHover: sceneState === "behind_the_scene_hover",
    showPR: sceneState === "press_release",
    showToolkit: sceneState === "jersey_toolkit",
    showEventPhotos: sceneState === "event_photos",
    showForm: sceneState === "share_your_legacy",
  };
  return showStates;
}

function isiOSDevice() {
  let isIos;
  const userAgent = window.navigator.userAgent;
  if (
    (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) ||
    isIos2()
  ) {
    isIos = true;
  } else {
    isIos = false;
  }
  return isIos;
}

function isIos2() {
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
}

export {
  isTouchDevice,
  iOS_version,
  escapeKeyClose,
  getSceneStates,
  isiOSDevice,
};
