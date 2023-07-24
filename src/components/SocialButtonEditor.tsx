import LimitedTextarea from "./LimitedTextarea";

import IniData from "../IniData";
import { SocialButtonLoc } from "../ButtonTypes";
import { loadSocialButtonData } from "../utils/socialButtonDataUtils";

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
  return (
    <>
      {enabled ? (
        <LimitedTextarea
          maxLength={2000}
          initialValue={socialButtonData.lines.join("\n")}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default SocialButtonEditor;
