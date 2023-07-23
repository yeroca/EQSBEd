import { SocialButtonLoc, HotButtonLoc } from "../ButtonTypes";

import {
  pageButtonToHotButtonIndex,
  pageButtonToNameKey,
  pageButtonToKeyPrefix,
} from "./pageButtonUtils";

import IniData from "../IniData";

const hotBarToKey = (hotBarNum: number): string => {
  return "HotButtons" + (hotBarNum === 1 ? "" : hotBarNum);
};

const onLinkedHotButtons = (
  socialButton: SocialButtonLoc,
  operation: (hotButton: HotButtonLoc) => void,
  iniData: IniData
): void => {
  const ePrefix = "E" + pageButtonToHotButtonIndex(socialButton);
  for (let hotButtonsBar = 1; hotButtonsBar <= 11; hotButtonsBar++) {
    for (let hotButtonsPage = 1; hotButtonsPage <= 10; hotButtonsPage++) {
      for (
        let hotButtonsButton = 1;
        hotButtonsButton <= 12;
        hotButtonsButton++
      ) {
        let barKey = hotBarToKey(hotButtonsBar);
        if (barKey in iniData) {
          const buttonKey = pageButtonToKeyPrefix({
            pageNum: hotButtonsPage,
            buttonNum: hotButtonsButton,
          });
          if (buttonKey in iniData[barKey]) {
            const value = iniData[barKey][buttonKey];

            if (value.startsWith(ePrefix + ",") || value === ePrefix) {
              operation({
                barNum: hotButtonsBar,
                pageNum: hotButtonsPage,
                buttonNum: hotButtonsButton,
              });
            }
          }
        }
      }
    }
  }
};

const genEcodeValue = (
  socialButton: SocialButtonLoc,
  iniData: IniData
): string => {
  const nameKey = pageButtonToNameKey(socialButton);
  const name =
    "Socials" in iniData && nameKey in iniData.Socials
      ? iniData.Socials[nameKey]
      : "";
  return (
    "E" +
    pageButtonToHotButtonIndex(socialButton) +
    "@-1,0000000000000000,0," +
    name +
    ","
  );
};

const linkHotButtonToSocialButton = (
  hotButton: HotButtonLoc,
  socialButton: SocialButtonLoc,
  iniData: IniData
): void => {
  let barKey = hotBarToKey(hotButton.barNum);
  iniData[barKey][pageButtonToKeyPrefix(hotButton)] = genEcodeValue(
    socialButton,
    iniData
  );
};

export { onLinkedHotButtons, linkHotButtonToSocialButton };
