import IniData from "../IniData";
import SocialButtonData from "../SocialButtonData";
import { SocialButtonLoc } from "../buttonTypes";
import {
  pageButtonToNameKey,
  pageButtonToColorKey,
  pageButtonToLineKey,
} from "./pageButtonUtils";

const loadSocialKeyData = (
  buttonLoc: SocialButtonLoc,
  iniData: IniData
): SocialButtonData => {
  return {
    name: iniData["Socials"][pageButtonToNameKey(buttonLoc)],
    color: iniData["Socials"][pageButtonToColorKey(buttonLoc)],
    lines: Array.from(
      Array(5),
      (_, lineNum) =>
        iniData["Socials"][pageButtonToLineKey(buttonLoc, lineNum)]
    ),
  };
};

export default loadSocialKeyData;
