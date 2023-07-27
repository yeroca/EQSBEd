import React from "react";
import Button from "react-bootstrap/Button";
import IniData from "../IniData";

import { encode } from "../utils/customIni";

interface FileDownloaderProps {
  iniData: IniData;
  fileName: string;
}

const FileDownloader: React.FC<FileDownloaderProps> = ({
  iniData,
  fileName,
}) => {
  const handleDownload = () => {
    const content = encode(iniData);
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const clickEvent = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.dispatchEvent(clickEvent);
    URL.revokeObjectURL(url);
  };

  return <Button onClick={handleDownload}>Download</Button>;
};

export default FileDownloader;
