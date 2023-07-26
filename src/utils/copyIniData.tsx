import IniData from "../IniData";

const copyIniData = (iniData: IniData): IniData => {
  return JSON.parse(JSON.stringify(iniData));
};

export default copyIniData;
