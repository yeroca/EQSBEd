const pageButtonToKeyPrefix = (pageNum: number, buttonNum: number) => {
  return "Page" + pageNum + "Button" + buttonNum;
};

const pageButtonToNameKey = (pageNum: number, buttonNum: number) => {
  return pageButtonToKeyPrefix(pageNum, buttonNum) + "Name";
};

const pageButtonToColorKey = (pageNum: number, buttonNum: number) => {
  return pageButtonToKeyPrefix(pageNum, buttonNum) + "Color";
};

// calculate the "E"nn, code used in hot key banks.
const pageButtonToHotButtonIndex = (pageNum: number, button: number) => {
  return (pageNum - 1) * 12 + button - 1;
};

const pageButtonToLineKey = (
  pageNum: number,
  buttonNum: number,
  lineNum: number
) => {
  return pageButtonToKeyPrefix(pageNum, buttonNum) + "Line" + lineNum;
};

export {
  pageButtonToKeyPrefix,
  pageButtonToNameKey,
  pageButtonToColorKey,
  pageButtonToLineKey,
  pageButtonToHotButtonIndex,
};
