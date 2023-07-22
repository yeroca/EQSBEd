import React from "react";
import {
  pageButtonToNameKey,
  pageButtonToColorKey,
} from "../utils/pageButtonUtils";
import IniData from "../IniData";
import { SocialButtonLoc } from "../buttonTypes";
//import dumpHash from "../utils/dumpHash";

interface SocialButtonProps {
  iniData: IniData;
  buttonLoc: SocialButtonLoc;
  onDrop: (buttonLoc: SocialButtonLoc) => void;
  onDragEnd: (buttonLoc: SocialButtonLoc) => void;
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

const SocialButton: React.FC<SocialButtonProps> = ({
  iniData,
  buttonLoc,
  onDrop,
  onDragEnd,
}) => {
  //console.log("Render Social Button");

  const nameKey: string = pageButtonToNameKey(buttonLoc);

  const name: string =
    "Socials" in iniData && nameKey in iniData["Socials"]
      ? iniData["Socials"][nameKey]
      : "-empty-";

  const colorKey: string = pageButtonToColorKey(buttonLoc);

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
    onDrop(buttonLoc);
  };

  const myHandleDragEnd = () => {
    onDragEnd(buttonLoc);
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

export default SocialButton;
