import React from 'react';

interface IniData {
  [section: string]: { [key: string]: string };
}

interface SocialKeyProps {
  iniData: IniData;
  keyNum: string;
}


const customStyle = {
  width: '90px',
  height: '80px',
  backgroundColor: '#222',
  color: 'white'
};

const SocialKey: React.FC<SocialKeyProps> = ({ iniData, keyNum }) => {
    console.log('keyNum = ' + keyNum);
    const pageNum:number = Math.floor((parseInt(keyNum, 10) - 1) / 12) + 1;
    const buttonNum:number = (parseInt(keyNum, 10) - 1) % 12 + 1;
    const key:string = 'Page'+pageNum.toString()+'Button'+buttonNum.toString()+'Name';

    return (
        <button type="button" draggable="true" style={customStyle}>
          {'Socials' in iniData && key in iniData['Socials']? iniData['Socials'][key] : "-empty-"}
        </button>
    );
}

export default SocialKey;