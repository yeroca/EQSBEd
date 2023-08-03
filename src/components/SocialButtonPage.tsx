import React from "react";
import SocialButton from "./SocialButton";
import IniData from "../IniData";
import { SocialButtonLoc } from "../ButtonTypes";
import { WindowSize } from "../WindowSize";

const thStyle: React.CSSProperties = {
  textAlign: "center",
};

const tableStyle: React.CSSProperties = {
  borderCollapse: "collapse", // Optional, to ensure borders collapse together
  border: "2px solid #333", // Set the border width and color
};

const rowNums = Array.from(Array(6), (_, i) => i + 1);

interface SocialButtonPageProps {
  iniData: IniData;
  pageNum: number;
  onDrop: (buttonLoc: SocialButtonLoc) => void;
  onDragEnd: (buttonLoc: SocialButtonLoc) => void;
  onDoubleClick: (buttonLoc: SocialButtonLoc) => void;
  windowSize: WindowSize;
}

const SocialButtonPage: React.FC<SocialButtonPageProps> = ({
  iniData,
  pageNum,
  onDrop,
  onDragEnd,
  onDoubleClick,
  windowSize,
}) => {
  //console.log("Render SocialButtonPage " + pageNum);
  //if (iniData) {
  //  console.log(dumpHash(" in SocialKey hash: ", iniData));
  //}
  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={thStyle} colSpan={2} scope="colgroup">
            {pageNum}
          </th>
        </tr>
      </thead>
      <tbody>
        {rowNums.map((rowNum) => (
          <tr key={rowNum}>
            <td key={rowNum}>
              <SocialButton
                iniData={iniData}
                buttonLoc={{ pageNum: pageNum, buttonNum: rowNum }}
                onDrop={onDrop}
                onDragEnd={onDragEnd}
                onDoubleClick={onDoubleClick}
                windowSize={windowSize}
              ></SocialButton>
            </td>
            <td key={rowNum + 6}>
              <SocialButton
                iniData={iniData}
                buttonLoc={{ pageNum: pageNum, buttonNum: rowNum + 6 }}
                onDrop={onDrop}
                onDragEnd={onDragEnd}
                onDoubleClick={onDoubleClick}
                windowSize={windowSize}
              ></SocialButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SocialButtonPage;
