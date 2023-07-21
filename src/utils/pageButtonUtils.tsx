const pageButtonToKeyPrefix = (pageNum: number, buttonNum: number) => {
  return "Page" + pageNum + "Button" + buttonNum;
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
  return pageButtonToKeyPrefix(pageNum, buttonNum) + "Line" + lineNum;
};

export { pageButtonToNameKey, pageButtonToColorKey, pageButtonToLineKey };
