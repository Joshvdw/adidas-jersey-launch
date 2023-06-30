import Image from "next/image";
import { useEffect } from "react";
import { useSpring, animated, config } from "react-spring";

export default function PlayIcon() {
  const [fadeIn, setFade] = useSpring(() => ({
    opacity: 0,
  }));

  useEffect(() => {
    setFade({ opacity: 1, config: config.molasses });
  }, [fadeIn]);
  return (
    <animated.div className="play_logo_wrapper" style={fadeIn}>
      <Image
        src="/svg/play_icon.svg"
        width={40}
        height={30}
        alt="Play Icon"
        className="play_icon"
      />
    </animated.div>
  );
}
