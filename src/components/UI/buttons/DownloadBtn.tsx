import { useSpring, animated, config } from "react-spring";
import { useState, useEffect, useRef, MutableRefObject } from "react";
import lottie, { AnimationItem } from "lottie-web";

export default function DownloadBtn(props: {
  btnText: string;
  downloadFile: string;
  downloadFileName: string;
}) {
  const [hovered, setHovered] = useState(false);

  const lottieContainer = useRef<HTMLDivElement>(null);
  const anim: MutableRefObject<AnimationItem | null> = useRef(null);

  useEffect(() => {
    if (lottieContainer.current) {
      anim.current = lottie.loadAnimation({
        container: lottieContainer.current!,
        renderer: "svg",
        loop: true,
        autoplay: false,
        path: "lotties/download.json",
      });
      return () => {
        if (anim.current) {
          anim.current.destroy();
        }
      };
    }
  }, []);

  useEffect(() => {
    if (hovered) {
      anim.current?.play();
    } else {
      anim.current?.stop();
    }
  }, [hovered]);

  const springProps = useSpring({
    scale: hovered ? 1.05 : 1,
    config: { duration: 100 },
  });
  return (
    <>
      <a
        href={props.downloadFile}
        download={props.downloadFileName}
        target="_blank"
        rel="noreferrer"
      >
        <animated.div
          className="CTA_inner"
          style={springProps}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <p>{props.btnText}</p>
          <div className="download_btn">
            <div className="download_lottie" ref={lottieContainer}></div>
          </div>
        </animated.div>
      </a>
    </>
  );
}
