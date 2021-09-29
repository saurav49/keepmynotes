import { useEffect, useRef } from "react";

const AutoTextArea = ({ body, setBody, color }) => {
  const textAreaRef = useRef(null);

  const textAreaStyle = {
    width: "100%",
    padding: "1em",
    border: "none",
    outline: "none",
    backgroundColor: color,
  };

  useEffect(() => {
    textAreaRef.current.focus();
  }, []);

  const textAreaHandler = (e) => {
    const element = e.target;
    element.style.height = "1px";
    element.style.height = 25 + element.scrollHeight + "px";
    setBody(e.target.value);
  };

  return (
    <textarea
      onChange={textAreaHandler}
      ref={textAreaRef}
      value={body}
      style={textAreaStyle}
      placeholder="Take a note..."
    />
  );
};

export { AutoTextArea };
