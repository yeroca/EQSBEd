import LimitedTextarea from "./LimitedTextarea";
import TextInput from "./TextInput";

import IniData from "../IniData";
import { SocialButtonLoc } from "../ButtonTypes";
import { loadSocialButtonData } from "../utils/socialButtonDataUtils";
import Form from "react-bootstrap/Form";

interface SocialButtonEditorProps {
  iniData: IniData;
  buttonLoc: SocialButtonLoc;
  enabled: boolean;
}

const SocialButtonEditor: React.FC<SocialButtonEditorProps> = ({
  iniData,
  buttonLoc,
  enabled,
}) => {
  const socialButtonData = loadSocialButtonData(buttonLoc, iniData);
  console.log("sbd.name = " + socialButtonData.name);
  return (
    <>
      {enabled ? (
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
      ) : (
        <></>
      )}
    </>
  );
};

export default SocialButtonEditor;
