import IniData from "../IniData";
import SocialButtonData from "../SocialButtonData";
import { SocialButtonLoc } from "../ButtonTypes";
import {
  pageButtonToNameKey,
  pageButtonToColorKey,
  pageButtonToLineKey,
} from "./pageButtonUtils";
import copyString from "./copyString";

const loadSocialButtonData = (
  buttonLoc: SocialButtonLoc,
  iniData: IniData
): SocialButtonData => {
  if ("Socials" in iniData) {
    const nameKey = pageButtonToNameKey(buttonLoc);
    const colorKey = pageButtonToColorKey(buttonLoc);

    const socialButtonData = {
      name:
        nameKey in iniData.Socials ? copyString(iniData.Socials[nameKey]) : "",
      color:
        colorKey in iniData.Socials
          ? copyString(iniData.Socials[colorKey])
          : "",
      lines: Array.from(Array(5), (_, idx) =>
        pageButtonToLineKey(buttonLoc, idx + 1) in iniData.Socials
          ? copyString(iniData.Socials[pageButtonToLineKey(buttonLoc, idx + 1)])
          : ""
      ),
    };
    return socialButtonData;
  } else {
    return {
      name: "",
      color: "",
      lines: ["", "", "", "", ""],
    };
  }
};

const storeSocialButtonData = (
  buttonLoc: SocialButtonLoc,
  socialData: SocialButtonData,
  iniData: IniData
): void => {
  if (socialData.name === "") {
    delete iniData.Socials[pageButtonToNameKey(buttonLoc)];
  } else {
    iniData.Socials[pageButtonToNameKey(buttonLoc)] = socialData.name;
  }
  if (socialData.color === "") {
    delete iniData.Socials[pageButtonToColorKey(buttonLoc)];
  } else {
    iniData.Socials[pageButtonToColorKey(buttonLoc)] = socialData.color;
  }
  for (let lineNum = 1; lineNum <= 5; lineNum++) {
    if (socialData.lines[lineNum - 1] === "") {
      delete iniData.Socials[pageButtonToLineKey(buttonLoc, lineNum)];
    } else {
      iniData.Socials[pageButtonToLineKey(buttonLoc, lineNum)] =
        socialData.lines[lineNum - 1];
    }
  }
};

export { loadSocialButtonData, storeSocialButtonData };
