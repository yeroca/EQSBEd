import { HotButtonLoc, SocialButtonLoc } from "../ButtonTypes";

const pageButtonToKeyPrefix = (buttonLoc: SocialButtonLoc | HotButtonLoc) => {
  return "Page" + buttonLoc.pageNum + "Button" + buttonLoc.buttonNum;
};

const pageButtonToNameKey = (buttonLoc: SocialButtonLoc) => {
  return pageButtonToKeyPrefix(buttonLoc) + "Name";
};

const pageButtonToColorKey = (buttonLoc: SocialButtonLoc) => {
  return pageButtonToKeyPrefix(buttonLoc) + "Color";
};

// calculate the "E"nn code used in hot key banks.
const pageButtonToHotButtonIndex = (buttonLoc: SocialButtonLoc) => {
  return (buttonLoc.pageNum - 1) * 12 + buttonLoc.buttonNum - 1;
};

const pageButtonToLineKey = (buttonLoc: SocialButtonLoc, lineNum: number) => {
  return pageButtonToKeyPrefix(buttonLoc) + "Line" + lineNum;
};

export {
  pageButtonToKeyPrefix,
  pageButtonToNameKey,
  pageButtonToColorKey,
  pageButtonToLineKey,
  pageButtonToHotButtonIndex,
};
