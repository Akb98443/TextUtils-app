import React, { useState } from "react";

function TextForm(props) {
  ///////////////////////////////////////////////
  const handleUpCase = () => {
    let newtext = text.toUpperCase();
    setText(newtext);
    props.showAlert("converted to uppercase", "success");
  };
  /////////////////////////////////////////////////
  const handleLowCase = () => {
    let newtext = text.toLowerCase();
    setText(newtext);
    props.showAlert("converted to lowercase", "success");
  };
  ////////////////////////////////////////////
  const handleListen = () => {
    let msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
    const toogle = document.getElementById("toggle");
    if (toogle.textContent === "Speak") {
      toogle.innerHTML = "Stop";
    } else {
      toogle.innerHTML = "Speak";
      if (toogle.innerHTML === "Speak") {
        window.speechSynthesis.cancel();
      }
    }
  };
  ///////////////////////////////////////////////////////////////
  const handleCopy = () => {
    if (text.length > 0) {
      let text = document.getElementById("text");
      // text.select();
      navigator.clipboard.writeText(text.value);
      props.showAlert("copied to clipboard", "success");
    } else {
      props.showAlert("There's no text to copy", "warning");
    }
  };
  ////////////////////////////////////////////////////////////
  const handleRemove = () => {
    if (text.length > 0) {
      setText("");
      props.showAlert("Text cleared", "success");
    } else props.showAlert("You don't have any text to delete", "warning");
  };
  //////////////////////////////////////////////////////////
  const handleChange = (event) => {
    setText(event.target.value);
  };
  //////////////////////////////////////////////////
  const handleExtraSpace = () => {
    if (text.length > 0) {
      let newText = text.split(/[ ]+/);
      setText(newText.join(" "));
      props.showAlert("space has been removed", "success");
    } else {
      props.showAlert("There is no text to remove space", "warning");
    }
  };

  const [text, setText] = useState(" ");

  return (
    <div>
      <div
        style={{ color: props.mode === "dark" ? "white" : "black" }}
        className="mb-3"
      >
        <h1>{props.heading}</h1>

        <textarea
          className="form-control"
          value={text}
          id="text"
          rows="8"
          style={{
            backgroundColor: props.mode === "dark" ? "gray" : "white",
            color: props.mode === "dark" ? "white" : "black"
          }}
          onChange={handleChange}
        ></textarea>
      </div>
      <button className="btn btn-primary mx-3 my-3" onClick={handleUpCase}>
        Change to UpperCase
      </button>

      <button className="btn btn-primary mx-3 my-3" onClick={handleLowCase}>
        Change to LowerCase
      </button>

      <button className="btn btn-primary mx-3 my-3 " onClick={handleListen}>
        Listen the text
      </button>

      <button className="btn btn-primary mx-3 my-3 " onClick={handleRemove}>
        Clear the text
      </button>

      <button
        className="btn btn-primary mx-3 my-3"
        onClick={handleCopy}
        id="copy"
      >
        Copy the text
      </button>

      <button
        className="btn btn-primary mx-3"
        onClick={handleExtraSpace}
        id="copy"
      >
        Remove extra space
      </button>

      <div
        className="conatiner"
        style={{ color: props.mode === "dark" ? "white" : "black" }}
      >
        <h1>Your text summary </h1>
        <p>
          {text.length === 0 ? 0 : text.split(" ").length} words and{" "}
          {text.length} characters
        </p>
        <p> {text.split(" ").length * 0.008} Minutes read</p>
        <h2>Preview</h2>
        <p>{text || `Enter the text to see the preview`}</p>
      </div>
    </div>
  );
}

export default TextForm;
