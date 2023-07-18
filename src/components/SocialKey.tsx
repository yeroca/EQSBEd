import React from 'react';

interface IniData {
  [section: string]: { [key: string]: string };
}

interface SocialKeyProps {
  iniData: IniData;
  keyNum: string;
}

const SocialKey: React.FC<SocialKeyProps> = ({ iniData, keyNum }) => {
    console.log('keyNum = ' + keyNum);
    const pageNum:number = Math.floor((parseInt(keyNum, 10) - 1) / 12) + 1;
    const buttonNum:number = (parseInt(keyNum, 10) - 1) % 12 + 1;
    const key:string = 'Page'+pageNum.toString()+'Button'+buttonNum.toString()+'Name';
    console.log('pageNum = ' + pageNum.toString());
    console.log('buttonNum = ' + buttonNum.toString());
    console.log('key = ' + key);
    return (
        <button type="button" className="btn" draggable="true">
          {'Socials' in iniData ? iniData['Socials'][key] : ""}
        </button>
    );
}

export default SocialKey;