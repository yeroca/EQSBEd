import React from "react";
import { Button } from "react-bootstrap";
import clipboardCopy from "clipboard-copy";

interface CopyButtonProps {
  jsonString: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ jsonString }) => {
  const handleCopy = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    clipboardCopy(jsonString);
    alert('"' + jsonString + '" copied to clipboard!');
  };

  return (
    <Button variant="primary" onClick={handleCopy}>
      Copy button
    </Button>
  );
};

export default CopyButton;
