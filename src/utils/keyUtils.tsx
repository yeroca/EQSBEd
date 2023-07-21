const pageButtonToKeyPrefix = (pageNum: number, buttonNum: number) => {
  return (
    "Page" + (pageNum + 1).toString() + "Button" + (buttonNum + 1).toString()
  );
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
  line: number
) => {
  return (
    pageButtonToKeyPrefix(pageNum, buttonNum) + "Line" + (line + 1).toString()
  );
};

export { pageButtonToNameKey, pageButtonToColorKey, pageButtonToLineKey };
