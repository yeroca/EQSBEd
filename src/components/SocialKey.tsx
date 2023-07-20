import React from "react";

interface IniData {
  [section: string]: { [nameKey: string]: string };
}

interface SocialKeyProps {
  iniData: IniData;
  keyNum: string;
  onDrop: (keyNum: string) => void;
  onDragEnd: (keyNum: string) => void;
}

interface ColorsType {
  [key: string]: string;
}

const colors: ColorsType = {
  "0": "#F0F0F0",
  "1": "#F0B400",
  "2": "#008000",
  "3": "#B46400",
  "4": "#000080",
  "5": "#F000F0",
  "6": "#808080",
  "7": "#C8C8C8",
  "8": "#828200",
  "9": "#C06060",
  "10": "#090909",
  "11": "#8C0000",
  "12": "#A0A0A0",
  "13": "#F00000",
  "14": "#00F000",
  "15": "#F0F000",
  "16": "#0B0CBD",
  "17": "#0064F0",
  "18": "#00F0F0",
  "19": "#800080",
};

const SocialKey: React.FC<SocialKeyProps> = ({
  iniData,
  keyNum,
  onDrop,
  onDragEnd,
}) => {
  console.log(typeof onDrop);
  const pageNum: number = Math.floor((parseInt(keyNum, 10) - 1) / 12) + 1;

  const buttonNum: number = ((parseInt(keyNum, 10) - 1) % 12) + 1;

  const nameKey: string =
    "Page" + pageNum.toString() + "Button" + buttonNum.toString() + "Name";

  const name: string =
    "Socials" in iniData && nameKey in iniData["Socials"]
      ? iniData["Socials"][nameKey]
      : "-empty-";

  const colorKey: string =
    "Page" + pageNum.toString() + "Button" + buttonNum.toString() + "Color";

  const color: string =
    "Socials" in iniData && colorKey in iniData["Socials"]
      ? colors[iniData["Socials"][colorKey]]
      : colors["0"];

  const customStyle = {
    width: "90px",
    height: "80px",
    backgroundColor: "#211d21",
    color: color,
  };

  const myHandleDrop = () => {
    onDrop(keyNum);
  };

  const myHandleDragEnd = () => {
    onDragEnd(keyNum);
  };

  return (
    <button
      type="button"
      draggable="true"
      style={customStyle}
      onDragOver={(event) => event.preventDefault()}
      onDrop={myHandleDrop}
      onDragEnd={myHandleDragEnd}
    >
      {name}
    </button>
  );
};

export default SocialKey;
