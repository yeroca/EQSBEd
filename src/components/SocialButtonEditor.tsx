import LimitedTextarea from "./LimitedTextarea";
import TextInput from "./TextInput";

import IniData from "../IniData";
import { SocialButtonLoc } from "../ButtonTypes";
import { loadSocialButtonData } from "../utils/socialButtonDataUtils";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

interface SocialButtonEditorProps {
  iniData: IniData;
  buttonLoc: SocialButtonLoc;
  showModal: boolean;
}

const SocialButtonEditor: React.FC<SocialButtonEditorProps> = ({
  iniData,
  buttonLoc,
  showModal,
}) => {
  const socialButtonData = loadSocialButtonData(buttonLoc, iniData);
  console.log("sbd.name = " + socialButtonData.name);
  return (
    <Modal
      show={showModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
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
    </Modal>
  );
};

export default SocialButtonEditor;
