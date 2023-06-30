import Image from "next/image";
import DownloadBtn from "../UI/buttons/DownloadBtn";
import { DataProps, SceneProps } from "@/types/Types";
import CloseBtn from "../UI/buttons/CloseBtn";
import ModalData from "@/data/ModalData";
import { escapeKeyClose } from "@/utils/utils";
import { useSpring, animated, config } from "react-spring";
import { Context } from "@/hooks/Context";
import { useEffect, useContext } from "react";

export default function PressKits(props: {
  data: DataProps;
  sceneState: SceneProps;
}) {
  const { title, text } = props.data;
  const { sceneState, setSceneState } = props.sceneState;

  const msgUnity = useContext(Context);

  escapeKeyClose(setSceneState, handleClick);

  let imgPath
  let filePath

  switch (title) {
    case ModalData.pressRelease.title:
      imgPath = "/images/press_release_img.png";
      filePath = "/downloads/press-release.pdf";
      break;
    case ModalData.jerseyToolKit.title:
      imgPath = "/images/jersey_toolkit_img.png";
      filePath =
        "https://rwc-jersey-launch.syd1.cdn.digitaloceanspaces.com/Visual%20Assets.zip";
      break;
    case ModalData.eventPhotos.title:
      // to swap out with event photos image asset once available   
      imgPath = "/images/jersey_toolkit_img.png";
      filePath =
        "https://rwc-jersey-launch.syd1.cdn.digitaloceanspaces.com/rwc-event-photos.zip";
      break;
    default:
      imgPath = "/images/press_release_img.png";
      filePath = "/downloads/press-release.pdf";
  }

  // const imgPath =
  //   title === ModalData.pressRelease.title
  //     ? "/images/toolkit.png"
  //     : "/images/press_img.png";

  // const filePath =
  //   title === ModalData.pressRelease.title
  //     ? "/downloads/press-release.pdf"
  //     : "https://rwc-jersey-launch.syd1.cdn.digitaloceanspaces.com/Visual%20Assets.zip"
  //     ? 
  //     : "https://rwc-jersey-launch.syd1.cdn.digitaloceanspaces.com/rwc-event-photos.zip"

  const [fadeIn, setFade] = useSpring(() => ({
    opacity: 0,
  }));
  const [scaleIn, setScale] = useSpring(() => ({
    scale: 0,
  }));

  useEffect(() => {
    setFade({ opacity: 1, delay: 500, config: config.slow });
    setScale({
      scale: 1,
      delay: 500,
      config: config.slow,
    });
  }, [fadeIn, setScale]);

  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.target !== e.currentTarget) return;
    setSceneState("lockerScene");
    if (msgUnity != null) msgUnity("explore_more");
  }

  return (
    <animated.div className="modal_outer_wrapper pr_outer" style={fadeIn}>
      <div className="modal_middle_wrapper pr_middle" onClick={handleClick}>
        <animated.div className="modal_inner_wrapper pr_inner" style={scaleIn}>
          <h4 className="modal_header">{title}</h4>
          <p className="modal_para">{text}</p>
          <div className="press_img_wrapper">
            <Image
              src={imgPath}
              width={500}
              height={500}
              alt="Press Release Image"
              className="pr_imgs"
              priority={true}
            />
          </div>
          <div className="download_btn_wrapper">
            <DownloadBtn
              btnText="download now"
              downloadFile={filePath}
              downloadFileName="FW23 New Zealand All Blacks RWC Kit Launch - Press Release"
            />
          </div>
        </animated.div>
        <CloseBtn
          sceneState={{ sceneState, setSceneState }}
          closeState="lockerScene"
        />
      </div>
    </animated.div>
  );
}
