import { useCallback, useReducer, useEffect } from "react";

import LimitedTextarea from "./LimitedTextarea";
import TextInput from "./TextInput";

import IniData from "../IniData";
import { SocialButtonLoc } from "../ButtonTypes";
import { loadSocialButtonData } from "../utils/socialButtonDataUtils";
import SocialButtonData from "../SocialButtonData";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const printStackTrace = () => {
  console.log("-------------------------");
  try {
    throw new Error("Printing stack trace");
  } catch (error) {
    console.log((error as Error).stack?.split("\n").slice(0, 3).join("\n"));
  }
};

type SocialButtonAction =
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_COLOR"; payload: string }
  | { type: "SET_LINES"; payload: string[] };

const socialButtonReducer = (
  state: SocialButtonData,
  action: SocialButtonAction
): SocialButtonData => {
  switch (action.type) {
    case "SET_NAME":
      printStackTrace();
      return { ...state, name: action.payload };
    case "SET_COLOR":
      return { ...state, color: action.payload };
    case "SET_LINES":
      return { ...state, lines: action.payload };
    default:
      return state;
  }
};
interface SocialButtonEditorProps {
  iniData: IniData;
  buttonLoc: SocialButtonLoc;
  showModal: boolean;
  onHide: () => void;
}

const SocialButtonEditor: React.FC<SocialButtonEditorProps> = ({
  iniData,
  buttonLoc,
  showModal,
  onHide,
}) => {
  const [socialButtonData, dispatch] = useReducer(socialButtonReducer, {
    name: "",
    color: "",
    lines: ["", "", "", "", ""],
  });

  useEffect(() => {
    // Load initial data from loadSocialButtonData when component mounts
    const initialData = loadSocialButtonData(buttonLoc, iniData);
    dispatch({ type: "SET_NAME", payload: initialData.name });
    dispatch({ type: "SET_COLOR", payload: initialData.color });
    dispatch({ type: "SET_LINES", payload: initialData.lines });
  }, [buttonLoc, iniData]);

  // Memoized callbacks to update the corresponding state properties
  const handleNameChange = useCallback((newValue: string) => {
    dispatch({ type: "SET_NAME", payload: newValue });
  }, []);

  const handleTextareaChange = useCallback((newValue: string) => {
    dispatch({ type: "SET_LINES", payload: newValue.split("\n") });
  }, []);

  const handleClearFields = () => {
    dispatch({ type: "SET_NAME", payload: "" });
    dispatch({ type: "SET_COLOR", payload: "" });
    dispatch({ type: "SET_LINES", payload: ["", "", "", "", ""] });
  };
  return (
    <Modal
      show={showModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop={true}
      keyboard={true}
      onHide={onHide}
    >
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title id="contained-modal-title-vcenter">
          Button Editor (currently is Read-Only)
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <TextInput
            initialValue={socialButtonData.name}
            onUpdate={handleNameChange}
          />
          <LimitedTextarea
            maxLength={2000}
            value={socialButtonData.lines.join("\n")}
            onChange={handleTextareaChange}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button onClick={handleClearFields}>Clear</Button>
        <Button disabled={true}>Accept</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SocialButtonEditor;
