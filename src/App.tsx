// import ImportDialog from './components/ImportDialog'
// ParentComponent.js
import { useState } from "react";
import FileUploader from "./components/FileUploader";
import SocialButtonPage from "./components/SocialButtonPage";
import IniData from "./IniData";
import { SocialButtonLoc, HotButtonLoc } from "./buttonTypes";
import {
  loadSocialButtonData,
  storeSocialButtonData,
} from "./utils/socialButtonDataUtils";
import {
  linkHotButtonToSocialButton,
  onLinkedHotButtons,
} from "./utils/hotButtonDataUtils";
import FileDownloader from "./components/FileDownloader";

//import dumpHash from "./utils/dumpHash";

const pageNums = Array.from(Array(10), (_, i) => i + 1);

const App = () => {
  const [iniData, setIniData] = useState<IniData>({});
  const [fileName, setFileName] = useState<string>("");

  const [srcSocialButtonLoc, setSrcSocialButtonLoc] = useState<SocialButtonLoc>(
    {
      pageNum: -1,
      buttonNum: -1,
    }
  );

  const [dstSocialButtonLoc, setDstSocialButtonLoc] = useState<SocialButtonLoc>(
    {
      pageNum: -1,
      buttonNum: -1,
    }
  );

  const performAction = (
    srcButton: SocialButtonLoc,
    dstButton: SocialButtonLoc
  ) => {
    let linkedSrcHotButtons: HotButtonLoc[] = [];
    let linkedDstHotButtons: HotButtonLoc[] = [];

    console.log(
      "Action src: " +
        JSON.stringify(srcButton) +
        "  dst: " +
        JSON.stringify(dstButton)
    );
    onLinkedHotButtons(
      srcButton,
      (button: HotButtonLoc) => {
        linkedSrcHotButtons.push(button);
      },
      iniData
    );
    onLinkedHotButtons(
      dstButton,
      (button: HotButtonLoc) => {
        linkedDstHotButtons.push(button);
      },
      iniData
    );

    // swap the social key data

    const newIniData = JSON.parse(JSON.stringify(iniData));

    const srcButtonData = loadSocialButtonData(srcButton, newIniData);
    console.log("src: " + JSON.stringify(srcButtonData));
    const dstButtonData = loadSocialButtonData(dstButton, newIniData);

    storeSocialButtonData(srcButton, dstButtonData, newIniData);
    storeSocialButtonData(dstButton, srcButtonData, newIniData);

    for (let linkedSrcHotButton of linkedSrcHotButtons) {
      console.log(
        "linking " +
          JSON.stringify(linkedSrcHotButton) +
          " to " +
          JSON.stringify(dstButton)
      );
      linkHotButtonToSocialButton(linkedSrcHotButton, dstButton, newIniData);
    }
    for (let linkedDstHotButton of linkedDstHotButtons) {
      console.log(
        "linking " +
          JSON.stringify(linkedDstHotButton) +
          " to " +
          JSON.stringify(srcButton)
      );
      linkHotButtonToSocialButton(linkedDstHotButton, srcButton, newIniData);
    }

    setIniData(newIniData);
  };

  // Drop onto = Destination
  const handleDrop = (buttonLoc: SocialButtonLoc) => {
    setDstSocialButtonLoc(() => {
      if (srcSocialButtonLoc.pageNum !== -1) {
        // This is the second event, so we know that both the source and destination are set
        performAction(srcSocialButtonLoc, buttonLoc);
        setDstSocialButtonLoc({ pageNum: -1, buttonNum: -1 });
      }
      return buttonLoc;
    });
  };

  // Dropped = Source
  const handleDragEnd = (buttonLoc: SocialButtonLoc) => {
    setSrcSocialButtonLoc(() => {
      if (dstSocialButtonLoc.pageNum !== -1) {
        // This is the second event, so we know that both the source and destination are set
        performAction(buttonLoc, dstSocialButtonLoc);
        setSrcSocialButtonLoc({ pageNum: -1, buttonNum: -1 });
      }
      return buttonLoc;
    });
  };

  //console.log("Render app");
  //dumpHash("hash in App: ", iniData);

  const fileNameHandler = (name: string) => {
    console.log("FNH name: " + name);

    // force new object to be created
    const newName: string = (" " + name).slice(1);
    setFileName(newName);
  };

  return (
    <div className="container ms-2">
      <h1>
        <mark>EQ Social Button Editor</mark>
      </h1>
      <FileUploader onIniData={setIniData} onFileName={fileNameHandler} />
      <FileDownloader iniData={iniData} fileName={fileName} />
      <table>
        <tbody>
          <tr>
            {pageNums.map((pageNum) => (
              <td>
                <SocialButtonPage
                  iniData={iniData}
                  pageNum={pageNum}
                  onDrop={handleDrop}
                  onDragEnd={handleDragEnd}
                ></SocialButtonPage>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default App;
