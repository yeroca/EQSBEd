import React, { ChangeEvent } from "react";
import Form from "react-bootstrap/Form";

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
        maxLength={maxLength}
        style={{
          backgroundColor: value.split("\n").length > 5 ? "#ffbbbb" : "",
        }}
      />
      <Form.Text>{`${
        maxLength - value.length
      } characters remaining`}</Form.Text>
    </Form.Group>
  );
};

export default LimitedTextarea;
