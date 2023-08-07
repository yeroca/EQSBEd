import React, { ChangeEvent } from "react";
import Form from "react-bootstrap/Form";
import { lengthExceedsLimit } from "../utils/socialButtonDataUtils";

interface LimitedTextareaProps {
  maxLength: number;
  value: string;
  onChange: (newValue: string) => void;
}

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
          backgroundColor: lengthExceedsLimit(value.split("\n"))
            ? "#ee2222"
            : "",
        }}
      />
      <Form.Text>
        <>
          {lengthExceedsLimit(value.split("\n")) &&
            "A social button cannot have more than five lines of commands (blank lines between commands count)"}
        </>
      </Form.Text>
    </Form.Group>
  );
};

export default LimitedTextarea;
