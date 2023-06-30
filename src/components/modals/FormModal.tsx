import { DataProps, SceneProps } from "@/types/Types";
import React, { useState, useContext } from "react";
import CloseBtn from "../UI/buttons/CloseBtn";
import { escapeKeyClose } from "@/utils/utils";
import { Context } from "@/hooks/Context";

export default function Form(props: {
  data: DataProps;
  sceneState: SceneProps;
}) {
  const { title, text } = props.data;
  const { sceneState, setSceneState } = props.sceneState;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [story, setStory] = useState("");

  const msgUnity = useContext(Context);

  escapeKeyClose(setSceneState, handleClick);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Add your form submission logic here
  }

  function handleClick() {
    setSceneState("lockerScene");
    if (msgUnity != null) msgUnity("explore_more");
  }

  return (
    <div className="modal_outer_wrapper form_outer" onClick={handleClick}>
      <div className="modal_middle_wrapper">
        <div className="modal_inner_wrapper form_inner">
          <h4 className="modal_header">{title}</h4>
          <p className="modal_para">{text}</p>
          <form onSubmit={handleSubmit} className="form">
            <input
              className="form_input"
              id="full_name"
              name="full_name"
              type="text"
              placeholder="full name"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
            />
            <input
              className="form_input"
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              className="form_input"
              type="number"
              placeholder="age"
              onChange={(e) => setAge(e.target.value)}
              value={age}
            />
            <textarea
              className="form_input form_textarea"
              name="story"
              placeholder="your story"
              cols={30}
              rows={10}
              onChange={(e) => setStory(e.target.value)}
              value={story}
            />
            <button type="submit" className="submit_btn pointer">
              submit
            </button>
          </form>
        </div>
        <CloseBtn
          sceneState={{ sceneState, setSceneState }}
          closeState="lockerScene"
        />
      </div>
    </div>
  );
}
