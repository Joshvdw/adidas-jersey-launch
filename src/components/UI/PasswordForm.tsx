import { SceneProps } from "@/types/Types";
import SoundIcon from "./buttons/SoundBtn";
import { FormEvent, useRef, useState } from "react";
import { useSpring, animated } from "react-spring";

export default function PasswordForm(props: {
  sceneState: SceneProps;
  startIntro: () => void;
}) {
  const { sceneState, setSceneState } = props.sceneState;
  const [hovered, setHovered] = useState(false);

  const [pass, setPass] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const springProps = useSpring({
    scale: hovered ? 1.05 : 1,
    config: { duration: 100 },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const input = JSON.stringify(pass);
    const response = await fetch("/api/validatePass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: input,
    });
    if (response.ok) {
      const data = await response.json();
      if (data.valid) {
        props.startIntro();
      } else {
        alert("incorrect password");
        if (inputRef.current) {
          inputRef.current.blur();
          inputRef.current.value = "";
        }
      }
    }
  };
  return (
    <div className="enter_btn_wrapper pointer">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          className="password-input"
          placeholder="enter password"
          type="password"
          onChange={(e) => setPass(e.target.value)}
          ref={inputRef}
        ></input>
        <animated.button
          className="enter-button pointer"
          style={springProps}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <SoundIcon
            class="mouse_follow"
            isEnterBtn
            sceneState={{ sceneState, setSceneState }}
          />
          <p>enter</p>
        </animated.button>
      </form>
    </div>
  );
}
