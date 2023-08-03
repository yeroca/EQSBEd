import React from "react";
import {
  pageButtonToNameKey,
  pageButtonToColorKey,
} from "../utils/pageButtonUtils";
import IniData from "../IniData";
import { SocialButtonLoc } from "../ButtonTypes";
import { colors } from "../utils/colors";
import { WindowSize } from "../WindowSize";
//import dumpHash from "../utils/dumpHash";

interface SocialButtonProps {
  iniData: IniData;
  buttonLoc: SocialButtonLoc;
  onDrop: (buttonLoc: SocialButtonLoc) => void;
  onDragEnd: (buttonLoc: SocialButtonLoc) => void;
  onDoubleClick: (buttonLoc: SocialButtonLoc) => void;
  windowSize: WindowSize;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  iniData,
  buttonLoc,
  onDrop,
  onDragEnd,
  onDoubleClick,
  windowSize,
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
      ? colors[parseInt(iniData["Socials"][colorKey])]
      : colors[0];

  const outerHorizMargin: number = 20;
  const innerHorizMargin: number = 5;
  const numButtonColumns: number = 20;
  const tileSize: number =
    Math.floor((windowSize.width - outerHorizMargin) / numButtonColumns) -
    innerHorizMargin;

  const customStyle: React.CSSProperties = {
    width: tileSize + "px",
    height: tileSize + "px",
    backgroundColor: "#211d21",
    color: color,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    cursor: "grab", // Show a grabbing cursor during drag
  };

  const myHandleDrop = () => {
    onDrop(buttonLoc);
  };

  const myHandleDragEnd = () => {
    onDragEnd(buttonLoc);
  };

  const myHandleDoubleClick = () => {
    onDoubleClick(buttonLoc);
  };

  return (
    <div
      draggable="true"
      style={customStyle}
      onDragOver={(event) => event.preventDefault()}
      onDrop={myHandleDrop}
      onDragEnd={myHandleDragEnd}
      onDoubleClick={myHandleDoubleClick}
    >
      {name}
    </div>
  );
};

export default SocialButton;
