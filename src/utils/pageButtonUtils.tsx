const pageButtonToKeyPrefix = (pageNum: number, buttonNum: number) => {
  return "Page" + (pageNum + 1) + "Button" + (buttonNum + 1);
};

const pageButtonToNameKey = (pageNum: number, buttonNum: number) => {
  return pageButtonToKeyPrefix(pageNum, buttonNum) + "Name";
};

const pageButtonToColorKey = (pageNum: number, buttonNum: number) => {
  return pageButtonToKeyPrefix(pageNum, buttonNum) + "Color";
};

const pageButtonToLineKey = (
  pageNum: number,
  buttonNum: number,
  lineNum: number
) => {
  return pageButtonToKeyPrefix(pageNum, buttonNum) + "Line" + (lineNum + 1);
};

export { pageButtonToNameKey, pageButtonToColorKey, pageButtonToLineKey };
