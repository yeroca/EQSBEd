import React from 'react';
import SocialKey from "./SocialKey";

interface IniData {
  [section: string]: { [key: string]: string };
}

interface SocialKeyPageProps {
  iniData: IniData;
  pageNum: string;
}

const rows = Array.from(Array(6), (_, i) => i+1);

const SocialKeyPage: React.FC<SocialKeyPageProps> = ({ iniData, pageNum }) => {
    console.log('pageNum = ' + pageNum);
    const pageOffset = (parseInt(pageNum, 10) - 1) * 12;
    return (
        <table className="table table-bordered">
          { rows.map(row => <tr><td><SocialKey iniData={iniData} keyNum={(pageOffset + row - 1).toString()}></SocialKey></td><td><SocialKey iniData={iniData} keyNum={(pageOffset + row - 1 + 6).toString()}></SocialKey></td></tr> )}
        </table>
    );
}

export default SocialKeyPage;