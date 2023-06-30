import { Dispatch, SetStateAction } from "react";

export type SceneState =
  | "preLoader"
  | "enterScene"
  | "tunnelScene"
  | "lockerScene"
  | "exploreScene"
  | "hero_video"
  | "behind_the_scene"
  | "behind_the_scene_hover"
  | "press_release"
  | "jersey_toolkit"
  | "event_photos"
  | "share_your_legacy"
  | "fern"
  | "collar"
  | "sleeve";
export interface SceneProps {
  sceneState: SceneState;
  setSceneState: Dispatch<SetStateAction<SceneState>>;
}

export type DataProps = {
  title: string;
  text: string;
};

export type ScrollProps = {
  scrollState: {
    scrolled: boolean;
    setScrolled: Dispatch<SetStateAction<boolean>>;
  };
};

export interface IOSInfo {
  User_Agent: string;
  As_Reported: string;
  Major_Release: string;
  Full_Release: string;
  Major_Release_Numeric: number;
  Full_Release_Numeric: number;
}