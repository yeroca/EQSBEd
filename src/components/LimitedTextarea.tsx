import React, { ChangeEvent } from "react";
import Form from "react-bootstrap/Form";

interface LimitedTextareaProps {
  maxLength: number;
  value: string;
  onChange: (newValue: string) => void;
}

const lengthExceedsLimit = (s: string): boolean => {
  // Ignore trailing blank lines, which are likely to occur during normal editing by mistake
  const arr = s.split("\n");
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] !== "") return i + 1 > 5;
  }
  return false;
};

const LimitedTextarea: React.FC<LimitedTextareaProps> = ({
  maxLength,
  value,
  onChange,
}) => {
  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>Commands</Form.Label>
      <Form.Control
        as="textarea"
        value={value}
        onChange={handleTextAreaChange}
        rows={5}
        cols={80}
        maxLength={maxLength}
        style={{
          backgroundColor: lengthExceedsLimit(value) ? "#ffbbbb" : "",
        }}
      />
      <Form.Text>
        <>
          {lengthExceedsLimit(value) &&
            "A social button cannot have more than five lines of commands (blank lines between commands count)"}
        </>
      </Form.Text>
    </Form.Group>
  );
};

export default LimitedTextarea;
