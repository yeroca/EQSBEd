import React, { useRef, useEffect } from "react";
import { Form } from "react-bootstrap";

interface PasteJSONBoxProps {
  onPaste: (jsonData: string) => void;
}

const PasteJSONBox: React.FC<PasteJSONBoxProps> = ({ onPaste }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const inputElement = inputRef.current;

    if (inputElement) {
      const handlePaste = (event: ClipboardEvent) => {
        event.preventDefault();
        const pastedData = event.clipboardData?.getData("text/plain");

        // Process the pasted data internally
        onPaste(pastedData || "");

        // Clear the input value for future paste operations
        inputElement.value = "";
      };

      inputElement.addEventListener("paste", handlePaste);

      return () => {
        inputElement.removeEventListener("paste", handlePaste);
      };
    }
  }, [onPaste]);

  return (
    <Form.Control
      ref={inputRef}
      as="input"
      type="text"
      placeholder="Paste button here"
      style={{
        border: "1px solid #ced4da",
        padding: "10px",
      }}
    />
  );
};

export default PasteJSONBox;
