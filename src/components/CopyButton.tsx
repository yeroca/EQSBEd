import React, { useState, useRef } from "react";
import { Button, Overlay, Tooltip } from "react-bootstrap";
import clipboardCopy from "clipboard-copy";

interface CopyButtonProps {
  jsonString: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ jsonString }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const buttonRef = useRef(null);

  const handleCopy = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    clipboardCopy(jsonString);
    setShowTooltip(true);

    // Hide the tooltip after 1 second
    setTimeout(() => {
      setShowTooltip(false);
    }, 1000);
  };

  return (
    <>
      <Button ref={buttonRef} variant="primary" onClick={handleCopy}>
        Copy button
      </Button>
      <Overlay
        target={buttonRef.current || document.body}
        show={showTooltip}
        placement="bottom"
      >
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            Copied button to clipboard!
          </Tooltip>
        )}
      </Overlay>
    </>
  );
};

export default CopyButton;
