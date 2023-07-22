// import ImportDialog from './components/ImportDialog'
// ParentComponent.js
import { useState } from "react";
import FileUploader from "./components/FileUploader";
import SocialButtonPage from "./components/SocialButtonPage";
import {
  pageButtonToHotButtonIndex,
  pageButtonToKeyPrefix,
} from "./utils/pageButtonUtils";
import IniData from "./IniData";
import { SocialButtonLoc, HotButtonLoc } from "./buttonTypes";
import {
  loadSocialKeyData,
  storeSocialKeyData,
} from "./utils/socialKeyDataUtils";
import dumpHash from "./utils/dumpHash";

const App = () => {
  const [iniData, setIniData] = useState<IniData>({});
  const [renderCounter, setRenderCounter] = useState<number>(0);

  // Function to update the parent's state with processed INI data
  const updateIniData = (data: IniData) => {
    setIniData(data);
    console.log(dumpHash("updateIniData hash: ", data));
  };

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

  const onLinkedHotButtons = (
    button: SocialButtonLoc,
    operation: (hotButton: HotButtonLoc) => void
  ) => {
    const ePrefix =
      "E" +
      pageButtonToHotButtonIndex({
        pageNum: button.pageNum,
        buttonNum: button.buttonNum,
      });

    for (let hotButtonsBank = 1; hotButtonsBank <= 11; hotButtonsBank++) {
      for (let hotButtonsPage = 1; hotButtonsPage <= 10; hotButtonsPage++) {
        for (
          let hotButtonsButton = 1;
          hotButtonsButton <= 12;
          hotButtonsButton++
        ) {
          let bankKey =
            "HotButtons" + (hotButtonsBank === 1 ? "" : hotButtonsBank);
          if (bankKey in iniData) {
            const buttonKey = pageButtonToKeyPrefix({
              pageNum: hotButtonsPage,
              buttonNum: hotButtonsButton,
            });
            if (buttonKey in iniData[bankKey]) {
              const value = iniData[bankKey][buttonKey];
              //console.log("prefix = " + ePrefix + " value = " + value);
              if (value.startsWith(ePrefix + ",") || value === ePrefix) {
                operation({
                  bankNum: hotButtonsBank,
                  pageNum: hotButtonsPage,
                  buttonNum: hotButtonsButton,
                });
              }
            }
          }
        }
      }
    }
  };

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
    onLinkedHotButtons(srcButton, (button: HotButtonLoc) => {
      linkedSrcHotButtons.push(button);
    });
    onLinkedHotButtons(dstButton, (button: HotButtonLoc) => {
      linkedDstHotButtons.push(button);
    });

    // swap
    const srcButtonData = loadSocialKeyData(srcButton, iniData);
    const dstButtonData = loadSocialKeyData(dstButton, iniData);

    //console.log("src: " + JSON.stringify(linkedSrcHotButtons));
    //console.log("dst: " + JSON.stringify(linkedDstHotButtons));
    console.log("src befor = " + JSON.stringify(srcButtonData));
    console.log("dst befor = " + JSON.stringify(dstButtonData));

    dumpHash("before: ", iniData);

    storeSocialKeyData(srcButton, dstButtonData, iniData);
    storeSocialKeyData(dstButton, srcButtonData, iniData);
    setIniData(iniData);
    //setRenderCounter(renderCounter + 1);

    const srcButtonDataAfter = loadSocialKeyData(srcButton, iniData);
    const dstButtonDataAfter = loadSocialKeyData(dstButton, iniData);

    console.log("src after = " + JSON.stringify(srcButtonDataAfter));
    console.log("dst after = " + JSON.stringify(dstButtonDataAfter));
    dumpHash("after: ", iniData);
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

  const pageNums = Array.from(Array(10), (_, i) => i + 1);

  console.log("Render app");
  dumpHash("hash in App: ", iniData);

  return (
    <div className="container ms-2">
      <h1>
        <mark>EQ Social Button Editor</mark>
      </h1>
      <FileUploader onIniData={updateIniData} />
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
