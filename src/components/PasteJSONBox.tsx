import React, { useRef, useEffect } from "react";
import { Form } from "react-bootstrap";

interface PasteJSONBoxProps {
  onPaste: (jsonData: string) => void;
}

const PasteJSONBox: React.FC<PasteJSONBoxProps> = ({ onPaste }) => {
  const pasteDivRef = useRef<HTMLTextAreaElement | null>(null);

  const pasteBoxContents = "Use Ctrl-v to paste button here";

  useEffect(() => {
    const pasteDiv = pasteDivRef.current;

    if (pasteDiv) {
      const handleKeyDown = async (event: KeyboardEvent) => {
        if (
          (event.key === "v" || event.key === "V") &&
          (event.ctrlKey || event.metaKey)
        ) {
          event.preventDefault();

          try {
            const pastedData = await navigator.clipboard.readText();

            pasteDiv.textContent = pasteBoxContents; // Reset the content
            onPaste(pastedData);
          } catch (error) {
            console.error("Error reading clipboard:", error);
          }
        }
      };

      pasteDiv.addEventListener("keydown", handleKeyDown);

      return () => {
        pasteDiv.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [onPaste]);

  return (
    <Form.Control
      ref={pasteDivRef}
      as="textarea"
      rows={1}
      placeholder={pasteBoxContents}
    />
  );
};

export default PasteJSONBox;
