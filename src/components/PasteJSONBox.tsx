import React, { useRef, useEffect } from "react";

const PasteJSONBox: React.FC<{ onPaste: (jsonData: string) => void }> = ({
  onPaste,
}) => {
  const pasteDivRef = useRef<HTMLDivElement | null>(null);

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

            pasteDiv.textContent = "(ignore this box for now)"; // Reset the content
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
    <div
      ref={pasteDivRef}
      tabIndex={0} // Ensure the div can receive focus
      style={{ border: "1px solid #ccc", minHeight: "50px", padding: "5px" }}
    >
      (ignore this box for now)
    </div>
  );
};

export default PasteJSONBox;
