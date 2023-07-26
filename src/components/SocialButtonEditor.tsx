import LimitedTextarea from "./LimitedTextarea";
import TextInput from "./TextInput";

import IniData from "../IniData";
import { SocialButtonLoc } from "../ButtonTypes";
import { loadSocialButtonData } from "../utils/socialButtonDataUtils";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

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
  const socialButtonData = loadSocialButtonData(buttonLoc, iniData);
  console.log("sbd.name = " + socialButtonData.name);
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
            onUpdate={() => {
              console.log("name updated!");
            }}
          />
          <LimitedTextarea
            maxLength={2000}
            initialValue={socialButtonData.lines.join("\n")}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button onClick={onHide}>Cancel</Button>
        <Button disabled={true}>Accept</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SocialButtonEditor;
