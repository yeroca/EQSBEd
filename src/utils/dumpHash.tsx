import IniData from "../IniData";
import sha1 from "crypto-js/sha1";

const dumpHash = (label: string, iniData: IniData): void => {
  const jsonStr = JSON.stringify(iniData);
  console.log(label + " " + sha1(jsonStr));
};

export default dumpHash;
