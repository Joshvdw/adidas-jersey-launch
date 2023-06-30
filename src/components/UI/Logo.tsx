import Image from "next/image";
import { useEffect } from "react";
import { useSpring, animated, config } from "react-spring";

export default function Logo() {
  const [fadeIn, setFade] = useSpring(() => ({
    opacity: 0,
  }));

  useEffect(() => {
    setFade({ opacity: 1, config: config.molasses });
  }, [fadeIn]);
  return (
    <animated.div className="logo_wrapper" style={fadeIn}>
      <Image
        src="/svg/adi_logo_white.svg"
        width={40}
        height={30}
        alt="Adidas Logo"
        className="adi_logo"
      />
    </animated.div>
  );
}
