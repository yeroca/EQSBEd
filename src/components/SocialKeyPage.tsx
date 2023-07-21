import React from "react";
import SocialKey from "./SocialKey";

interface IniData {
  [section: string]: { [key: string]: string };
}

interface SocialKeyPageProps {
  iniData: IniData;
  pageNum: number;
  onDrop: (keyNum: number) => void;
  onDragEnd: (keyNum: number) => void;
}

const thStyle: React.CSSProperties = {
  textAlign: "center",
};

const tableStyle: React.CSSProperties = {
  borderCollapse: "collapse", // Optional, to ensure borders collapse together
  border: "2px solid #333", // Set the border width and color
};

const rowNums = Array.from(Array(6), (_, i) => i);

const SocialKeyPage: React.FC<SocialKeyPageProps> = ({
  iniData,
  pageNum,
  onDrop,
  onDragEnd,
}) => {
  console.log("pageNum = " + pageNum);

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={thStyle} colSpan={2} scope="colgroup">
            {pageNum + 1}
          </th>
        </tr>
      </thead>
      <tbody>
        {rowNums.map((rowNum) => (
          <tr>
            <td>
              <SocialKey
                iniData={iniData}
                pageNum={pageNum}
                buttonNum={rowNum}
                onDrop={onDrop}
                onDragEnd={onDragEnd}
              ></SocialKey>
            </td>
            <td>
              <SocialKey
                iniData={iniData}
                pageNum={pageNum}
                buttonNum={rowNum + 6}
                onDrop={onDrop}
                onDragEnd={onDragEnd}
              ></SocialKey>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SocialKeyPage;
