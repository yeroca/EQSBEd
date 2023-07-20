import React from "react";
import SocialKey from "./SocialKey";

interface IniData {
  [section: string]: { [key: string]: string };
}

interface SocialKeyPageProps {
  iniData: IniData;
  pageNum: string;
  onDrop: (keyNum: string) => void;
  onDragEnd: (keyNum: string) => void;
}

const thStyle: React.CSSProperties = {
  textAlign: "center",
};

const tableStyle: React.CSSProperties = {
  borderCollapse: "collapse", // Optional, to ensure borders collapse together
  border: "2px solid #333", // Set the border width and color
};

const rowNums = Array.from(Array(6), (_, i) => i + 1);

const SocialKeyPage: React.FC<SocialKeyPageProps> = ({
  iniData,
  pageNum,
  onDrop,
  onDragEnd,
}) => {
  console.log("pageNum = " + pageNum);
  const pageOffset = (parseInt(pageNum, 10) - 1) * 12;

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
              <SocialKey
                iniData={iniData}
                keyNum={(pageOffset + rowNum).toString()}
                onDrop={onDrop}
                onDragEnd={onDragEnd}
              ></SocialKey>
            </td>

            <td>
              <SocialKey
                iniData={iniData}
                keyNum={(pageOffset + rowNum + 6).toString()}
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
