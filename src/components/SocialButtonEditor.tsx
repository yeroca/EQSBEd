import { useCallback, useReducer, useEffect } from "react";

import IniData from "../IniData";
import SocialButtonData from "../SocialButtonData";
import HotButtonData from "../HotButtonData";
import { HotButtonLoc, SocialButtonLoc } from "../ButtonTypes";
import {
  lengthExceedsLimit,
  loadSocialButtonData,
} from "../utils/socialButtonDataUtils";

import LimitedTextarea from "./LimitedTextarea";
import TextInput from "./TextInput";
import { onLinkedHotButtons } from "../utils/hotButtonDataUtils";

import { Button, Form, Col, Modal, Row, Table } from "react-bootstrap";
import ColorSelector from "./ColorSelector";
import { colors } from "../utils/colors";
import { altActName } from "../utils/altAct";
import PasteJSONBox from "./PasteJSONBox";
import CopyButton from "./CopyButton";

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
  setShowModal: (showModal: boolean) => void;
  onHide: () => void;
  onClickAccept: (
    buttonLoc: SocialButtonLoc,
    socialButtonData: SocialButtonData
  ) => void;
}

const SocialButtonEditor: React.FC<SocialButtonEditorProps> = ({
  iniData,
  buttonLoc,
  showModal,
  setShowModal,
  onHide,
  onClickAccept,
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

  const handleClickAccept = () => {
    onClickAccept(buttonLoc, socialButtonData);
    setShowModal(false);
  };

  const handleAddAltActNotes = () => {
    const altActRe =
      /^(?<prefix>[ \t]*(\/(pause|timer)[ \t]+[0-9]+[ \t]*,[ \t]*)?\/alt[a-z]*[ \t]+act[a-z]*[ \t]+)(?<code>[0-9]+)([ \t]|$)/;

    for (let i = 0; i < socialButtonData.lines.length; i++) {
      const match = socialButtonData.lines[i].match(altActRe);
      if (match) {
        if (match.groups) {
          const code: string = match.groups.code;
          socialButtonData.lines[i] =
            match.groups.prefix +
            code +
            " # " +
            (code in altActName ? altActName[code] : "unknown code");
        }
      }
      dispatch({ type: "SET_LINES", payload: socialButtonData.lines });
    }
  };

  const linkedHotButtons: HotButtonData[] = [];

  const handleSelectColor = (color: number) => {
    dispatch({ type: "SET_COLOR", payload: color.toString() });
  };

  const handlePaste = (jsonData: string) => {
    // Process the pasted JSON data
    console.log("Pasted JSON data:", jsonData);
    try {
      const socialButtonData: SocialButtonData = JSON.parse(jsonData);

      if (
        "color" in socialButtonData &&
        "name" in socialButtonData &&
        "lines" in socialButtonData
      ) {
        dispatch({ type: "SET_NAME", payload: socialButtonData.name });
        dispatch({ type: "SET_COLOR", payload: socialButtonData.color });
        dispatch({ type: "SET_LINES", payload: socialButtonData.lines });
      } else {
        alert(
          "Pasted button data is incomplete.  Please double check your clipboard contents."
        );
      }
    } catch {
      alert(
        "Pasted button data has wrong format.  Please double check your clipboard contents."
      );
    }
  };

  onLinkedHotButtons(
    buttonLoc,
    (button: HotButtonLoc, suffix: string) => {
      linkedHotButtons.push({ hotButtonLoc: button, suffix: suffix });
    },
    iniData
  );

  const color: string = socialButtonData.color
    ? colors[parseInt(socialButtonData.color)]
    : colors[0];

  // console.log("color: " + color);
  return (
    <Modal
      show={showModal}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop={true}
      keyboard={true}
      onHide={onHide}
    >
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title id="contained-modal-title-vcenter">
          Social Button Editor
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row sm="auto">
            <Col>
              <Row sm="auto">
                <Col md={3}>
                  <ColorSelector onSelectColor={handleSelectColor} />
                </Col>
                <Col md={3}>
                  <CopyButton
                    jsonString={JSON.stringify(socialButtonData, null, 2)}
                  />
                </Col>
                <Col md={5}>
                  <PasteJSONBox onPaste={handlePaste} />
                </Col>
              </Row>
              <TextInput
                value={socialButtonData.name}
                onUpdate={handleNameChange}
                color={color}
              />
              <LimitedTextarea
                maxLength={2000}
                value={socialButtonData.lines.join("\n")}
                onChange={handleTextareaChange}
              />
            </Col>
            <Col>
              <Table bordered hover striped size="sm">
                <thead className="text-center">
                  <tr key="hbh1">
                    <th key="hbh1t" colSpan={3}>
                      On hot buttons
                    </th>
                  </tr>
                  <tr key="hbh2">
                    <th key="hbh2bar">Bar</th>
                    <th key="hbh2page">Page</th>
                    <th key="hbh2button">Button</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {linkedHotButtons.length === 0 && (
                    <tr key="hbbr-empty">
                      <td key="hbbd-empty" colSpan={3}>
                        <i>- none -</i>
                      </td>
                    </tr>
                  )}
                  {linkedHotButtons.length > 0 &&
                    linkedHotButtons.map((hotButton, idx) => (
                      <tr key={"hbbr" + idx}>
                        <td key={"hbbd-bar" + idx}>
                          {hotButton.hotButtonLoc.barNum}
                        </td>
                        <td key={"hbbd-page" + idx}>
                          {hotButton.hotButtonLoc.pageNum}
                        </td>
                        <td key={"hbbd-button" + idx}>
                          {hotButton.hotButtonLoc.buttonNum}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button onClick={handleClearFields}>Clear</Button>
        <Button onClick={handleAddAltActNotes}>Add notes to /alt act</Button>
        <Button
          disabled={lengthExceedsLimit(socialButtonData.lines)}
          onClick={handleClickAccept}
        >
          Accept
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SocialButtonEditor;
