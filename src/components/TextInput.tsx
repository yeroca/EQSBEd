import React, { ChangeEvent } from "react";
import Form from "react-bootstrap/Form";

interface TextInputProps {
  value: string;
  onUpdate: (updatedValue: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ value, onUpdate }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onUpdate(newValue);
  };

  return (
    <Form.Group className="=mb=3">
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" value={value} onChange={handleChange} />
    </Form.Group>
  );
};

export default TextInput;
