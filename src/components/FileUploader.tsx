// FileUploader.tsx

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
        const iniData = parseIniFile(contentString); // Function to parse the INI content into an associative array
        onIniData(iniData); // Call the parent's callback with the processed INI data
      }
    };
    reader.readAsText(file);
  };

  // Function to parse the INI content into an associative array
  const parseIniFile = (content: string) => {
    const lines = content.split('\n');
    const iniData: { [section: string]: { [key: string]: string } } = {};
    let currentSection = '';

    lines.forEach((line) => {
      line = line.trim();
      if (line === '' || line.startsWith(';')) {
        // Ignore empty lines or comments (lines starting with ';')
        return;
      } else if (line.startsWith('[') && line.endsWith(']')) {
        // Section header
        currentSection = line.slice(1, -1).trim();
        iniData[currentSection] = {};
      } else {
        // Key-value pair within the current section
        const [key, value] = line.split('=');
        if (currentSection) {
          iniData[currentSection][key.trim()] = value.trim();
        }
      }
    });

    return iniData;
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default FileUploader;