// import ImportDialog from './components/ImportDialog'
// ParentComponent.js
import { useState } from "react";
import FileUploader from "./components/FileUploader";
import SocialKeyPage from "./components/SocialKeyPage";

interface IniData {
  [section: string]: { [key: string]: string };
}

const App = () => {
  const [iniData, setIniData] = useState<IniData>({});

  // Function to update the parent's state with processed INI data
  const updateIniData = (data: IniData) => {
    setIniData(data);
  };

  type ButtonLoc = {
    pageNum: number;
    buttonNum: number;
  };

  const [srcButtonLoc, setSrcButtonLoc] = useState<ButtonLoc>({
    pageNum: -1,
    buttonNum: -1,
  });

  const [dstButtonLoc, setDstButtonLoc] = useState<ButtonLoc>({
    pageNum: -1,
    buttonNum: -1,
  });

  const performAction = (srcButton: ButtonLoc, dstButton: ButtonLoc) => {
    console.log(
      "Action src: " +
        JSON.stringify(srcButton) +
        "  dst: " +
        JSON.stringify(dstButton)
    );
  };

  // Drop onto = Destination
  const handleDrop = (pageNum: number, buttonNum: number) => {
    setDstButtonLoc(() => {
      if (srcButtonLoc.pageNum !== -1) {
        // This is the second event, so we know that both the source and destination are set
        performAction(
          { pageNum: srcButtonLoc.pageNum, buttonNum: srcButtonLoc.buttonNum },
          { pageNum: pageNum, buttonNum: buttonNum }
        );
        setDstButtonLoc({ pageNum: -1, buttonNum: -1 });
      }
      return { pageNum, buttonNum };
    });
  };

  // Dropped = Source
  const handleDragEnd = (pageNum: number, buttonNum: number) => {
    setSrcButtonLoc(() => {
      if (dstButtonLoc.pageNum !== -1) {
        // This is the second event, so we know that both the source and destination are set
        performAction(
          { pageNum: pageNum, buttonNum: buttonNum },
          { pageNum: dstButtonLoc.pageNum, buttonNum: dstButtonLoc.buttonNum }
        );
        setSrcButtonLoc({ pageNum: -1, buttonNum: -1 });
      }
      return { pageNum, buttonNum };
    });
  };

  const pageNums = Array.from(Array(10), (_, i) => i + 1);

  return (
    <div className="container ms-2">
      <h1>
        SKEd{" "}
        <small>
          <mark>the Social Key Editor</mark>
        </small>
      </h1>
      <FileUploader onIniData={updateIniData} />
      <table>
        <tbody>
          <tr>
            {pageNums.map((pageNum) => (
              <td>
                <SocialKeyPage
                  iniData={iniData}
                  pageNum={pageNum}
                  onDrop={handleDrop}
                  onDragEnd={handleDragEnd}
                ></SocialKeyPage>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default App;
