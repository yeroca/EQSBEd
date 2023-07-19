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
                  pageNum={pageNum.toString()}
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
