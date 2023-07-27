// import ImportDialog from './components/ImportDialog'
// ParentComponent.js
import { useState } from "react";

import FileUploader from "./components/FileUploader";
import SocialButtonPage from "./components/SocialButtonPage";
import IniData from "./IniData";
import FileDownloader from "./components/FileDownloader";
import HotButtonData from "./HotButtonData";
import Alert from "./components/Alert";
import SocialButtonEditor from "./components/SocialButtonEditor";

import { SocialButtonLoc, HotButtonLoc } from "./ButtonTypes";
import {
  loadSocialButtonData,
  storeSocialButtonData,
} from "./utils/socialButtonDataUtils";
import {
  linkHotButtonToSocialButton,
  onLinkedHotButtons,
} from "./utils/hotButtonDataUtils";
import copyString from "./utils/copyString";
import copyIniData from "./utils/copyIniData";
//import dumpHash from "./utils/dumpHash";

const pageNums = Array.from(Array(10), (_, i) => i + 1);

const App = () => {
  const [iniData, setIniData] = useState<IniData>({});
  const [fileName, setFileName] = useState<string>("");
  const [editSocialButtonLoc, setEditSocialButtonLoc] =
    useState<SocialButtonLoc>({ pageNum: 0, buttonNum: 0 });
  const [showSocialButtonEditorModal, setShowSocialButtonEditorModal] =
    useState<boolean>(false);

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
    let linkedSrcHotButtons: HotButtonData[] = [];
    let linkedDstHotButtons: HotButtonData[] = [];

    console.log(
      "Action src: " +
        JSON.stringify(srcButton) +
        "  dst: " +
        JSON.stringify(dstButton)
    );
    onLinkedHotButtons(
      srcButton,
      (button: HotButtonLoc, suffix: string) => {
        linkedSrcHotButtons.push({ hotButtonLoc: button, suffix: suffix });
      },
      iniData
    );
    onLinkedHotButtons(
      dstButton,
      (button: HotButtonLoc, suffix: string) => {
        linkedDstHotButtons.push({ hotButtonLoc: button, suffix: suffix });
      },
      iniData
    );

    // swap the social key data

    const newIniData = copyIniData(iniData);

    const srcButtonData = loadSocialButtonData(srcButton, newIniData);
    //console.log("src: " + JSON.stringify(srcButtonData));
    const dstButtonData = loadSocialButtonData(dstButton, newIniData);

    storeSocialButtonData(srcButton, dstButtonData, newIniData);
    storeSocialButtonData(dstButton, srcButtonData, newIniData);

    // Fix the hot buttons
    //console.log("linkedSrctHotButtons: " + JSON.stringify(linkedSrcHotButtons));
    for (let linkedSrcHotButton of linkedSrcHotButtons) {
      /*
      console.log(
        "linking " +
          JSON.stringify(linkedSrcHotButton) +
          " to " +
          JSON.stringify(dstButton)
      );
      */
      linkHotButtonToSocialButton(linkedSrcHotButton, dstButton, newIniData);
    }
    //console.log("linkedDstHotButtons: " + JSON.stringify(linkedDstHotButtons));
    for (let linkedDstHotButton of linkedDstHotButtons) {
      /*
      console.log(
        "linking " +
          JSON.stringify(linkedDstHotButton) +
          " to " +
          JSON.stringify(srcButton)
      );
      */
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

  //
  const handleDoubleClick = (buttonLoc: SocialButtonLoc) => {
    setEditSocialButtonLoc(buttonLoc);
    setShowSocialButtonEditorModal(true);
  };

  const fileNameHandler = (name: string) => {
    const newName: string = copyString(name);
    setFileName(newName);
  };

  return (
    <div className="container ms-2">
      <h1 style={{ marginBottom: "20px" }}>
        <mark>Sock Drawer</mark>
        <small> an EQ Social Button Editor - Alpha 0.5</small>
      </h1>
      <p>
        <strong>Directions: </strong>After choosing your .ini file below, you
        can click and drag a button from one location to another to swap those
        two buttons, or you can double click on a button to view its contents.
        When you are finished, click the Download button below.
      </p>
      <FileUploader onIniData={setIniData} onFileName={fileNameHandler} />
      <table>
        <tbody>
          <tr key={1}>
            {pageNums.map((pageNum) => (
              <td key={pageNum}>
                <SocialButtonPage
                  iniData={iniData}
                  pageNum={pageNum}
                  onDrop={handleDrop}
                  onDragEnd={handleDragEnd}
                  onDoubleClick={handleDoubleClick}
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <Alert message="Make a backup copy of your original .ini file before using the one created here" />
      <FileDownloader iniData={iniData} fileName={fileName} />
      <SocialButtonEditor
        iniData={iniData}
        buttonLoc={editSocialButtonLoc}
        showModal={showSocialButtonEditorModal}
        onHide={() => setShowSocialButtonEditorModal(false)}
      />
    </div>
  );
};

export default App;
