// import ImportDialog from './components/ImportDialog'
// ParentComponent.js
import { useState } from 'react';
import FileUploader from './components/FileUploader';
import SocialKey from './components/SocialKey';

interface IniData {
    [section: string]: { [key: string]: string };
  }

const App = () => {
  const [iniData, setIniData] = useState<IniData>({});

  // Function to update the parent's state with processed INI data
  const updateIniData = (data: IniData) => {
    setIniData(data);
  };

  const keyNums = Array.from(Array(120), (_, i) => i+1);
  
  return (
    <div className="container">
      <h1>SKEd <small><mark>the Social Key Editor</mark></small></h1>
      <FileUploader onIniData={updateIniData} />
      {keyNums.map(keyNum => <SocialKey iniData={iniData} keyNum={keyNum.toString()}></SocialKey>)}
    </div>
  );
};

export default App;
