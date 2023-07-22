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
  if ("Socials" in iniData) {
    return {
      name: iniData["Socials"][pageButtonToNameKey(buttonLoc)],
      color: iniData["Socials"][pageButtonToColorKey(buttonLoc)],
      lines: Array.from(
        Array(5),
        (_, idx) => iniData["Socials"][pageButtonToLineKey(buttonLoc, idx + 1)]
      ),
    };
  } else {
    return {
      name: "",
      color: "",
      lines: [],
    };
  }
};

const storeSocialKeyData = (
  buttonLoc: SocialButtonLoc,
  socialData: SocialButtonData,
  iniData: IniData
): void => {
  iniData["Socials"][pageButtonToNameKey(buttonLoc)] = socialData.name;
  iniData["Socials"][pageButtonToColorKey(buttonLoc)] = socialData.color;
  for (let lineNum = 1; lineNum <= 5; lineNum++) {
    iniData["Socials"][pageButtonToLineKey(buttonLoc, lineNum)] =
      socialData.lines[lineNum - 1];
  }
};

export { loadSocialKeyData, storeSocialKeyData };
