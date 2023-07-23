import React from "react";
import ini from "ini";
import IniData from "../IniData";

interface FileDownloaderProps {
  iniData: IniData;
  fileName: string;
}

const FileDownloader: React.FC<FileDownloaderProps> = ({
  iniData,
  fileName,
}) => {
  const handleDownload = () => {
    const content = ini.encode(iniData);
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

  return <button onClick={handleDownload}>Download</button>;
};

export default FileDownloader;
