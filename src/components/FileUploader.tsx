// FileUploader.tsx

import ini from 'ini';

interface FileUploaderProps {
    onIniData: (data: { [section: string]: { [key: string]: string } }) => void;
  }

const FileUploader: React.FC<FileUploaderProps> = ({ onIniData }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && e.target.result) {
        const content = e.target.result;
        const contentString = typeof content == 'string' ? content : new TextDecoder().decode(content);
        const iniData = ini.decode(contentString);
        onIniData(iniData); // Call the parent's callback with the processed INI data
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default FileUploader;