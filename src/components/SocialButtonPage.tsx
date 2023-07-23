import React from "react";
import SocialButton from "./SocialButton";
import IniData from "../IniData";
import { SocialButtonLoc } from "../ButtonTypes";
//import dumpHash from "../utils/dumpHash";

interface SocialButtonPageProps {
  iniData: IniData;
  pageNum: number;
  onDrop: (buttonLoc: SocialButtonLoc) => void;
  onDragEnd: (buttonLoc: SocialButtonLoc) => void;
}

const thStyle: React.CSSProperties = {
  textAlign: "center",
};

const tableStyle: React.CSSProperties = {
  borderCollapse: "collapse", // Optional, to ensure borders collapse together
  border: "2px solid #333", // Set the border width and color
};

const rowNums = Array.from(Array(6), (_, i) => i + 1);

const SocialButtonPage: React.FC<SocialButtonPageProps> = ({
  iniData,
  pageNum,
  onDrop,
  onDragEnd,
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
          <tr>
            <td>
              <SocialButton
                iniData={iniData}
                buttonLoc={{ pageNum: pageNum, buttonNum: rowNum }}
                onDrop={onDrop}
                onDragEnd={onDragEnd}
              ></SocialButton>
            </td>
            <td>
              <SocialButton
                iniData={iniData}
                buttonLoc={{ pageNum: pageNum, buttonNum: rowNum + 6 }}
                onDrop={onDrop}
                onDragEnd={onDragEnd}
              ></SocialButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SocialButtonPage;
